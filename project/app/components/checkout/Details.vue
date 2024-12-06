<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, CheckCircle2 } from 'lucide-vue-next';
</script>

<template>
  <Card class="w-[350px] border-none">
    <CardHeader>
      <div class="grid items-center justify-center w-full gap-4">
        <CardTitle>Hi, $NAME</CardTitle>
        <CardDescription>
          Your Logged in with the following details</CardDescription
        >
      </div>
    </CardHeader>
    <CardContent>
      <Separator class="mb-8" />

      <div class="grid items-center justify-center w-full gap-4">
        <CheckCircle2 :size="74" color="green" />
      </div>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button variant="outline"> Cancel </Button>
      <Button>Deploy</Button>
    </CardFooter>
  </Card>
</template>
