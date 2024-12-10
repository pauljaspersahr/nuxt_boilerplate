<script lang="ts" setup>
import PricingPlan from '@/components/shared/PricingPlan.vue';
import { PRICING_PLANS } from '~/config/pricing';

const checkoutStore = useCheckoutStore();
const { selectedPlan } = storeToRefs(checkoutStore);
const plan =
  PRICING_PLANS.find((item) => item.name === selectedPlan.value) ||
  PRICING_PLANS[1];
</script>

<template>
  <PricingPlan
    :name="plan.name"
    :description="plan?.description"
    :oldPrice="`${plan.old_price}€`"
    :newPrice="`${plan.price}€`"
    :paymentUrl="plan?.stripe_payment_url"
    :features="plan.features"
    :notFeatures="plan.not_features"
    :featured="false"
    :subtext="plan.subtext"
    :showButton="false"
    class="m-0 w-full max-w-sm"
  />
</template>
