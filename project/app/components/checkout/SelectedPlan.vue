<script lang="ts" setup>
import PricingPlan from '@/components/shared/PricingPlan.vue';
import { type BasicPlanNoId } from '@/lib/services/service.types';

const checkoutStore = useCheckoutStore();
const { selectedPlan } = storeToRefs(checkoutStore);
const setFeaturedFalse = (plan: BasicPlanNoId) =>
  plan ? { ...plan, featured: false } : plan;
</script>

<template>
  <PricingPlan
    v-if="selectedPlan"
    :plan="setFeaturedFalse(selectedPlan)"
    :showButton="false"
    class="m-0 w-full max-w-sm"
  />
</template>
