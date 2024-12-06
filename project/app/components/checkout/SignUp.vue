<script setup lang="ts">
import { PRICING_PLANS } from '~/config/pricing';
import PricingPlan from '@/components/shared/PricingPlan.vue';
import { Separator } from '@/components/ui/separator';

const store = useCheckoutStore();
const { incrementStep } = store;

const { selectedPlan } = storeToRefs(store);

console.log(selectedPlan.value);
const plan =
  PRICING_PLANS.find((item) => item.name === selectedPlan.value) ||
  PRICING_PLANS[1];
</script>

<template>
  <div
    class="flex flex-col sm:flex-row items-center w-full align-middle justify-center"
  >
    <PricingPlan
      :name="plan.name"
      :description="plan?.description"
      :oldPrice="`${plan.old_price}€`"
      :newPrice="`${plan.price}€`"
      :paymentUrl="plan?.stripe_payment_url"
      :features="plan.features"
      :notFeatures="plan.not_features"
      :featured="plan.featured"
      :subtext="plan.subtext"
      :showButton="false"
      class="sm:mr-8 m-0 w-full max-w-sm"
    />

    <Separator orientation="vertical" class="hidden sm:block" />
    <SignUpOTP
      :onSuccess="incrementStep"
      class="sm:ml-8 m-0 p-0 w-full border-none"
    />
  </div>
</template>
