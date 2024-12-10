<script lang="ts" setup>
import PricingPlan from '@/components/shared/PricingPlan.vue';

const checkoutStore = useCheckoutStore();
const { selectedPlan } = storeToRefs(checkoutStore);
</script>

<template>
  <PricingPlan
    v-if="selectedPlan"
    :plan="selectedPlan"
    :showButton="false"
    class="m-0 w-full max-w-sm"
  />
</template>
