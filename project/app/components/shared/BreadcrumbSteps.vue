<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem v-for="(step, index) in steps" :key="index">
        <BreadcrumbSeparator v-if="index > 0" />
        <BreadcrumbPage v-if="index === currentIndex">
          {{ step }}
        </BreadcrumbPage>
        <BreadcrumbLink
          v-else-if="index < currentIndex"
          @click.prevent="index < currentIndex && $emit('step-click', index)"
          class="cursor-pointer"
        >
          {{ step }}
        </BreadcrumbLink>
        <BreadcrumbLink v-else>
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
  currentIndex: number;
}>();

const emits = defineEmits(['step-click']);
</script>
