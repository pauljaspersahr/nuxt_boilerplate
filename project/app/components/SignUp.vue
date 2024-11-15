<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-vue-next";

import { z } from "zod";

const auth = useAuth();

// Form validation
const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const { formData, formErrors, touched, validateField, validateForm } =
  useFormValidation(signUpSchema);

const validForm = ref(false);

watch(
  () => formData.value,
  () => {
    const result = validateForm();
    validForm.value = result.success;
  },
  { deep: true }
);

const loading = ref(false);

const handleSignUp = async () => {
  if (loading.value) return;

  await auth.signUp.email(
    {
      email: formData.value.email,
      password: formData.value.password,
      name: formData.value.name,
    },
    {
      onSuccess: () => {
        navigateTo("/dashboard");
      },
      onError: (ctx) => {
        console.log(ctx.error.message);
      },
      onRequest: () => {
        loading.value = true;
      },
      onResponse: () => {
        loading.value = false;
      },
    }
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
        <Button
          v-if="!loading"
          @click="handleSignUp"
          type="button"
          class="w-full"
          :disabled="!validForm"
          >Create an account</Button
        >
        <Button v-else disabled>
          <Loader2 class="w-4 h-4 mr-2 animate-spin" />
          Signing you up...
        </Button>
        <!-- <Button variant="outline" class="w-full">Sign up with GitHub</Button> -->
      </div>
      <div class="mt-4 text-center text-sm">
        Already have an account?
        <a href="/signin" class="underline">Sign in</a>
      </div>
    </CardContent>
  </Card>
</template>
