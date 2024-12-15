<script lang="ts" setup>
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <div
    class="flex flex-col py-1 m-0 rounded-xl border-2 border-primary/70 bg-primary-foreground"
  >
    <div class="flex items-center gap-2 px-3">
      <div class="size-2 rounded-full bg-accent" />
      <div class="size-2 rounded-full bg-highlight" />
      <div class="size-2 rounded-full bg-highlight2" />
    </div>
    <div class="border-b-2 border-primary/70" />
    <div class="space-y-2">
      <Skeleton class="animate-none h-2 w-[360px]" />
      <Skeleton class="animate-none h-2 w-[340px]" />
      <Skeleton class="animate-none h-2 w-[320px]" />
      <Skeleton class="animate-none h-2 w-[40px]" />
      <Skeleton class="animate-none h-2 w-[280px]" />
      <Skeleton class="animate-none h-2 w-[0px]" />
      <Skeleton class="animate-none h-2 w-[380px]" />
      <Skeleton class="animate-none h-2 w-[340px]" />
      <Skeleton class="animate-none h-2 w-[160px]" />
      <Skeleton class="animate-none h-2 w-[200px]" />
      <Skeleton class="animate-none h-2 w-[0px]" />
      <Skeleton class="animate-none h-2 w-[400px]" />
      <Skeleton class="animate-none h-2 w-[360px]" />
      <Skeleton class="animate-none h-2 w-[260px]" />
      <Skeleton class="animate-none h-2 w-[180px]" />
      <Skeleton class="animate-none h-2 w-[240px]" />
      <Skeleton class="animate-none h-2 w-[0px]" />
      <Skeleton class="animate-none h-2 w-[380px]" />
      <Skeleton class="animate-none h-2 w-[260px]" />
      <Skeleton class="animate-none h-2 w-[190px]" />
      <Skeleton class="animate-none h-2 w-[230px]" />
      <Skeleton class="animate-none h-2 w-[0px]" />
      <Skeleton class="animate-none h-2 w-[420px]" />
      <Skeleton class="animate-none h-2 w-[380px]" />
      <Skeleton class="animate-none h-2 w-[240px]" />
      <Skeleton class="animate-none h-2 w-[200px]" />
      <Skeleton class="animate-none h-2 w-[160px]" />
      <Skeleton class="animate-none h-2 w-[0px]" />
      <Skeleton class="animate-none h-2 w-[340px]" />
      <Skeleton class="animate-none h-2 w-[230px]" />
    </div>
  </div>
</template>
