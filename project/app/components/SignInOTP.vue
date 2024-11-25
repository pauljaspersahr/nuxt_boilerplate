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

const loading = ref(false);
const otpArray = ref<string[]>([]);
const otp = computed(() => otpArray.value.join(''));
const otpSent = ref(false);

const { toast } = useToast();

// Form validation
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const { formData, formErrors, validateField, isValid } =
  useFormValidation(signInSchema);

const handleSendVerificationOtp = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const { $client } = useNuxtApp();
    await $client.user.getBasicUserByEmail.query({
      email: formData.value.email,
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
    },
  );
  loading.value = false;
};

const handleVerifyOtp = async () => {
  if (loading.value) return;

  await authClient.signIn.emailOtp(
    {
      email: formData.value.email,
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
      <div class="grid gap-4">
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
        Don't have an account?
        <a href="/signup" class="underline">Sign up</a>
      </div>
    </CardContent>
  </Card>
</template>
