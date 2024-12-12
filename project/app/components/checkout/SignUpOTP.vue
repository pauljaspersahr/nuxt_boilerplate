<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@/components/ui/pin-input';
import { authClient } from '~/lib/auth.client';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import log from '~/lib/logger';
import { Loader2 } from 'lucide-vue-next';

const { toast } = useToast();

const checkoutStore = useCheckoutStore();
const { formValues } = storeToRefs(checkoutStore);
const { setFormValues } = checkoutStore;

const userStore = useUserStore();
const { init } = userStore;

const { handleSubmit, values, meta, setFieldError } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
    }),
  ),
  initialValues: formValues.value,
});

const loading = ref(false);
const otpArray = ref<string[]>([]);
const otp = computed(() => otpArray.value.join(''));
const otpSent = ref(false);

watch(
  values,
  (newValues) => {
    setFormValues(newValues);
  },
  { deep: true },
);

const onSubmit = handleSubmit(async (values) => {
  if (loading.value) return;

  const { $client } = useNuxtApp();

  try {
    loading.value = true;
    const isUser = await $client.user.isUserByEmail.query({
      email: values.email,
    });
    if (isUser) {
      const msg = 'Email already exists.';
      setFieldError('email', msg);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: msg,
        variant: 'destructive',
      });
      loading.value = false;
      return;
    }
  } catch (err) {
    loading.value = false;
  }

  await authClient.emailOtp.sendVerificationOtp(
    {
      email: values.email,
      type: 'sign-in',
    },
    {
      onSuccess: () => {
        otpSent.value = true;
        toast({
          title: 'Verification code sent to your email',
        });
      },
      onError: (ctx) => {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: ctx.error.message,
          variant: 'destructive',
        });
      },
      onRequest: () => {
        loading.value = true;
      },
      onResponse: () => {
        loading.value = false;
      },
    },
  );
});

const handleVerifyOtp = async () => {
  if (loading.value) return;
  console.log('otp', otp.value);
  console.log('values', formValues.value);

  await authClient.signIn.emailOtp(
    {
      email: formValues.value.email,
      otp: otp.value,
    },
    {
      onSuccess: async () => {
        await authClient.updateUser(
          {
            name: formValues.value.name,
          },
          {
            onSuccess: () => {
              toast({
                title: `Welcome, ${formValues.value.name}!`,
              });
              init();
            },
            onError: (ctx) => {
              toast({
                title: 'Uh oh! Something went wrong.',
                description: ctx.error.message,
                variant: 'destructive',
              });
            },
            onRequest: () => {
              loading.value = true;
            },
            onResponse: () => {
              loading.value = false;
            },
          },
        );
      },
      onError: (ctx) => {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: ctx.error.message,
          variant: 'destructive',
        });
      },
      onRequest: () => {
        loading.value = true;
      },
      onResponse: () => {
        loading.value = false;
      },
    },
  );
};
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-xl">Sign Up</CardTitle>
      <CardDescription>
        Enter your information to create an account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter your name"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button
          v-if="!loading"
          @click="onSubmit"
          type="button"
          class="w-full"
          :disabled="!meta.valid"
        >
          {{ otpSent ? 'Send code again' : 'Send Verification Code' }}
        </Button>
        <Button v-else disabled class="w-full">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />
          Sending verification code...
        </Button>
      </form>

      <div v-if="otpSent" class="grid gap-2 mt-4 text-center">
        <Label for="pin-input">Code sent to your email</Label>
        <div class="flex justify-center">
          <PinInput
            id="pin-input"
            v-model="otpArray"
            placeholder="○"
            @complete="handleVerifyOtp"
            class="text-black"
          >
            <PinInputGroup>
              <PinInputInput
                v-for="(id, index) in 5"
                :key="id"
                :index="index"
              />
            </PinInputGroup>
          </PinInput>
        </div>
      </div>

      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/signin" class="underline">Sign in</a>
      </div>
    </CardContent>
  </Card>
</template>
