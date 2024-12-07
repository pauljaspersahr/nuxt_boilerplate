<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-vue-next';
import SignOutButton from '@/components/shared/SignOutButton.vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const checkoutStore = useCheckoutStore();
const { incrementStep } = checkoutStore;
</script>

<template>
  <Card class="w-[350px] border-none">
    <CardHeader>
      <div class="grid items-center justify-center w-full gap-4">
        <CardTitle>Hi, {{ user?.display_name }}</CardTitle>
        <CardDescription>
          Your're Logged in with the following details</CardDescription
        >
      </div>
    </CardHeader>
    <CardContent>
      <Separator class="mb-8" />

      <div class="grid items-center justify-center w-full gap-4">
        <p class="text-lg text-center">{{ user?.email }}</p>
        <CheckCircle2 :size="74" color="green" />
      </div>

      <Separator class="mt-8" />
    </CardContent>
    <CardFooter class="flex flex-col justify-between gap-4 px-6 pb-6">
      <Button variant="default" class="w-full" @click.prevent="incrementStep"
        >Proceed</Button
      >
      <SignOutButton variant="secondary" redirect="/" />
    </CardFooter>
  </Card>
</template>
