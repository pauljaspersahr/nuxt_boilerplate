<template>
  <Card
    :class="[
      plan.featured ? 'scale-[1.1] border-black dark:border-white' : '',
      'rounded-xl',
      'relative',
    ]"
  >
    <CardHeader>
      <CardTitle>{{ plan.name }}</CardTitle>
      <CardDescription>{{ plan.description }}</CardDescription>
      <span
        v-if="plan.money_saved"
        class="absolute top-0 -translate-y-1/2 rounded-full bg-accent border-border border px-3 py-0.5 text-sm font-sans font-semibold tracking-wide text-secondary-foreground shadow-md"
      >
        Save {{ plan.money_saved }}€
      </span>
    </CardHeader>
    <CardContent>
      <div class="flex text-left font-semibold leading-6 items-end mb-6">
        <span
          v-if="!!plan.old_price"
          class="mr-2 text-muted-foreground/80 line-through text-xl"
          >{{ `${plan.old_price}€` }}</span
        >
        <span class="text-4xl">{{ `${plan.price}€` }}</span>
      </div>
      <div class="flex flex-col gap-3">
        <div
          v-for="(feature, index) in plan.features"
          :key="index"
          class="flex text-muted-foreground text-sm"
        >
          <Icon icon="radix-icons:check" class="size-5 text-secondary mr-2" />
          <span class="truncate">{{ feature }}</span>
        </div>
        <div
          v-for="(feature, index) in plan.not_features"
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
      <Checkout v-if="showButton" :plan="plan" />
      <p class="text-sm text-center text-muted-foreground">
        {{ plan.subtext }}
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
import { type BasicPlanNoId } from '~/lib/services/service.types';

const { plan, showButton = true } = defineProps<{
  plan: BasicPlanNoId;
  showButton?: Boolean;
}>();
</script>
