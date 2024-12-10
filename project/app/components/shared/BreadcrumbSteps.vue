<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem v-for="(step, index) in steps" :key="index">
        <BreadcrumbSeparator v-if="index > 0" />
        <BreadcrumbPage v-if="index === currentStep">
          {{ step }}
        </BreadcrumbPage>
        <BreadcrumbLink v-else-if="index > maxClickableStep">
          {{ step }}
        </BreadcrumbLink>
        <BreadcrumbLink
          v-else
          @click.prevent="$emit('step-click', index)"
          class="cursor-pointer"
        >
          {{ step }}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const props = defineProps<{
  steps: Array<string>;
  currentStep: number;
  maxClickableStep: number;
}>();

const emits = defineEmits(['step-click']);
</script>
