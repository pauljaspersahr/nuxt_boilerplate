<script setup lang="ts">
import LoadingButton from '~/components/shared/LoadingButton.vue';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@/components/ui/pin-input';
import { authClient } from '~/lib/auth.client';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import * as z from 'zod';

const { toast } = useToast();

const loading = ref(false);
const otpArray = ref<string[]>([]);
const otp = computed(() => otpArray.value.join(''));
const otpSent = ref(false);

const { handleSubmit, values, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email('Invalid email address'),
    }),
  ),
});

const onSubmit = handleSubmit(async (values) => {
  if (loading.value) return;

  try {
    loading.value = true;
    const { $client } = useNuxtApp();
    await $client.user.getBasicUserByEmail.query({
      email: values.email,
    });
  } catch (error) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'Email not found',
      variant: 'destructive',
    });
    loading.value = false;
    return;
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

  await authClient.signIn.emailOtp(
    {
      email: values.email,
      otp: otp.value,
    },
    {
      onSuccess: () => {
        toast({
          title: `Welcome!`,
        });
        navigateTo('/dashboard');
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
      <CardTitle class="text-xl">Sign In</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit" class="space-y-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="m@example.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <LoadingButton
          :loading="loading"
          :enableOn="meta.valid"
          :onClick="onSubmit"
          :buttonText="otpSent ? 'Send code again' : 'Send Login Code'"
          loadingText="Sending login code..."
        />
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
        Don't have an account?
        <a href="/#pricing" class="underline">Sign up</a>
      </div>
    </CardContent>
  </Card>
</template>
