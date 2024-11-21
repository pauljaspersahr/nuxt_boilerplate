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

import { z } from 'zod';
const auth = useAuth();
const { toast } = useToast();

// Form validation
const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const { formData, formErrors, validateField, isValid } =
  useFormValidation(signInSchema);

const loading = ref(false);

const handleSignIn = async () => {
  if (loading.value) return;

  await auth.client.signIn.email(
    {
      email: formData.value.email,
      password: formData.value.password,
    },
    {
      onSuccess: () => {
        toast({
          title: `Logged in!`,
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
      <CardTitle class="text-2xl"> Login </CardTitle>
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
            @blur="validateField('email')"
            placeholder="m@example.com"
            required
          />
          <p v-if="formErrors.email" class="text-red-500 text-xs">
            {{ formErrors.email }}
          </p>
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="#" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            v-model="formData.password"
            @blur="validateField('password')"
            required
          />

          <p v-if="formErrors.password" class="text-red-500 text-xs">
            {{ formErrors.password }}
          </p>
        </div>
        <LoadingButton
          :loading="loading"
          :enableOn="isValid"
          buttonText="Login"
          loadingText="Signing you in..."
          :onClick="handleSignIn"
        />
        <!-- <Button variant="outline" class="w-full"> Login with Google </Button> -->
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="/signup" class="underline"> Sign up </a>
      </div>
    </CardContent>
  </Card>
</template>
