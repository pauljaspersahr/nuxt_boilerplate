<template>
  <div class="break-inside-avoid">
    <Card class="rounded-xl bg-gray-100/50 shadow dark:bg-gray-800/50">
      <CardContent class="pt-5">
        <q class="text-gray-600 dark:text-gray-300">{{ testimonial.content }}</q>
        <div class="relative mt-6 flex items-center gap-3">
          <span class="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full text-base">
            <NuxtImg class="size-10 rounded-full text-base" :src="testimonial.avatar" :alt="testimonial.name" loading="lazy"/>
          </span>
          <div>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ testimonial.position }}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '~/components/ui/card';
import type {Testimonial} from "~/types";

// Define props
const props = defineProps({
  testimonial: {
    type: Object as PropType<Testimonial>,
    required: true
  }
});
</script>
