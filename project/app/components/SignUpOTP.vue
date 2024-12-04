<script setup lang="ts">
import LoadingButton from '~/components/shared/LoadingButton.vue';
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
import { z } from 'zod';

const props = defineProps<{ onSuccess?: () => void }>();

const loading = ref(false);
const otpArray = ref<string[]>([]);
const otp = computed(() => otpArray.value.join(''));
const otpSent = ref(false);

const { toast } = useToast();

// Form validation
const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

const { formData, formErrors, validateField, isValid } =
  useFormValidation(signUpSchema);

const handleSendVerificationOtp = async () => {
  if (loading.value) return;

  await authClient.emailOtp.sendVerificationOtp(
    {
      email: formData.value.email,
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
};

const handleVerifyOtp = async () => {
  if (loading.value) return;

  await authClient.signIn.emailOtp(
    {
      email: formData.value.email,
      otp: otp.value,
    },
    {
      onSuccess: async () => {
        await authClient.updateUser(
          {
            name: formData.value.name,
          },
          {
            onSuccess: () => {
              toast({
                title: `Welcome, ${formData.value.name}!`,
              });
              props.onSuccess ? props.onSuccess() : {};
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
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="first-name">What's your name?</Label>
          <Input
            id="first-name"
            v-model="formData.name"
            placeholder="Max"
            @blur="validateField('name')"
            required
          />
          <p v-if="formErrors.name" class="text-red-500 text-xs">
            {{ formErrors.name }}
          </p>
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            v-model="formData.email"
            placeholder="m@example.com"
            @blur="validateField('email')"
            required
          />
          <p v-if="formErrors.email" class="text-red-500 text-xs">
            {{ formErrors.email }}
          </p>
        </div>
        <LoadingButton
          :loading="loading"
          :enableOn="isValid"
          buttonText="Create Account"
          loadingText="Sending verification code..."
          :onClick="handleSendVerificationOtp"
        />
        <div v-if="otpSent" class="grid gap-2 text-center">
          <Label for="pin-input">Enter the code</Label>
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

        <!-- <Button variant="outline" class="w-full">Sign up with Google</Button> -->
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/signin" class="underline">Sign in</a>
      </div>
    </CardContent>
  </Card>
</template>
