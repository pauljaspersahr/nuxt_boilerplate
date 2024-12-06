<template>
  <Card
    :class="[
      featured ? 'scale-[1.0] border-black dark:border-white' : '',
      'rounded-xl',
    ]"
  >
    <CardHeader>
      <CardTitle>{{ name }}</CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex text-left font-semibold leading-6 items-end mb-6">
        <span class="mr-2 text-muted-foreground/80 line-through text-xl">{{
          oldPrice
        }}</span>
        <span class="text-4xl">{{ newPrice }}</span>
      </div>
      <div class="flex flex-col gap-3">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="flex text-muted-foreground text-sm"
        >
          <Icon icon="radix-icons:check" class="size-5 text-primary mr-2" />
          <span class="truncate">{{ feature }}</span>
        </div>
        <div
          v-for="(feature, index) in notFeatures"
          :key="index"
          class="flex text-muted-foreground text-sm"
        >
          <Icon
            icon="radix-icons:cross-2"
            class="size-5 text-muted-foreground mr-2"
          />
          <span class="truncate">{{ feature }}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex flex-col justify-between px-6 pb-6 gap-2">
      <Checkout
        v-if="props.showButton"
        :planName="props.name"
        :featured="props.featured"
      />
      <p class="text-sm text-center text-muted-foreground">
        {{ subtext }}
      </p>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@iconify/vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: String,
    required: true,
  },
  newPrice: {
    type: String,
    required: true,
  },
  paymentUrl: {
    type: String,
    required: true,
  },
  features: {
    type: Array,
    required: true,
  },
  notFeatures: {
    type: Array,
    required: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  subtext: {
    type: String,
    required: true,
  },
  showButton: {
    type: Boolean,
    default: true,
  },
});
</script>
