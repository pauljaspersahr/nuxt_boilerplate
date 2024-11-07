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

import { credentialSignUp } from "~/lib/auth/credential.handlers";

import { z } from "zod";
import { Loader2 } from "lucide-vue-next";

const loading = ref(false);
const signUpOk = ref(false);

// Form validation
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
const formData = ref({
  name: "",
  email: "",
  password: "",
});
const formErrors = ref({
  name: "",
  email: "",
  password: "",
});
const validateField = (field: keyof typeof formData.value) => {
  const result = signupSchema.safeParse(formData.value);
  formErrors.value[field] = result.success
    ? ""
    : result.error.formErrors.fieldErrors[field]?.[0] || "";
};

const handleSignUp = async () => {
  let toastMessage = "";
  try {
    const result = signupSchema.safeParse(formData.value);
    if (result.success) {
      loading.value = true;
      const { error } = await credentialSignUp(
        formData.value.email,
        formData.value.password,
        formData.value.name
      );
      if (error) throw error;
      signUpOk.value = true;
      toastMessage = `Success! Welcome ${formData.value.name}.`;
    } else {
      throw result.error;
    }
  } catch (err) {
    toastMessage = "An error occured. Please try again later.";
    console.log(err);
  } finally {
    // TODO: add toast for to inform user
    loading.value = false;
  }
};

watchEffect(() => {
  if (signUpOk.value) {
    navigateTo("/", { replace: true });
  }
});
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
