<template>
  <div>
    <Button
      v-if="!loading"
      @click="onClick"
      type="button"
      class="w-full"
      :disabled="!enableOn"
    >
      {{ buttonText }}
    </Button>
    <Button v-else disabled class="w-full">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" />
      {{ loadingText }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  enableOn: {
    type: Boolean,
    default: true,
  },
  buttonText: {
    type: String,
    default: 'Create an account',
  },
  loadingText: {
    type: String,
    default: 'Signing you in...',
  },
  onClick: {
    type: Function,
    required: true,
  },
});
</script>
