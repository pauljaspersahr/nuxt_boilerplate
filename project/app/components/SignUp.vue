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
import { authClient } from '~/lib/auth.client';

const { toast } = useToast();

// Form validation
const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const { formData, formErrors, validateField, isValid } =
  useFormValidation(signUpSchema);

const loading = ref(false);

const handleSignUp = async () => {
  if (loading.value) return;

  await authClient.signUp.email(
    {
      email: formData.value.email,
      password: formData.value.password,
      name: formData.value.name,
    },
    {
      onSuccess: () => {
        toast({
          title: `Welcome, ${formData.value.name}!`,
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
        <div class="grid gap-2">
          <Label for="password">Password</Label>
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
          buttonText="Create Account"
          loadingText="Signing you up..."
          :onClick="handleSignUp"
        />
        <!-- <Button variant="outline" class="w-full">Sign up with Google</Button> -->
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/signin" class="underline">Sign in</a>
      </div>
    </CardContent>
  </Card>
</template>
