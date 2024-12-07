<template>
  <Button
    v-if="!loading"
    @click="onClick"
    type="button"
    :class="cn('w-full', className)"
    :disabled="!enableOn"
  >
    {{ buttonText }}
  </Button>
  <Button v-else disabled class="w-full">
    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
    {{ loadingText }}
  </Button>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const {
  loading = false,
  enableOn = true,
  buttonText = 'Create an account',
  loadingText = 'Signing you in...',
  onClick,
  class: className,
} = defineProps<{
  loading?: boolean;
  enableOn?: boolean;
  buttonText?: string;
  loadingText?: string;
  onClick: () => void;
  class?: HTMLAttributes['class'];
}>();
</script>
