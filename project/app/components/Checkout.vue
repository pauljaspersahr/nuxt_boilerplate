<script setup lang="ts">
import { VisuallyHidden } from 'radix-vue';
import BreadcumbSteps from '~/components/shared/BreadcrumbSteps.vue';
import StripeEmbed from '~/components/checkout/Stripe.vue';
import SignUp from '~/components/checkout/SignUp.vue';
import type { Step } from '~/stores/checkout';
import type { BasicPlanNoId } from '@/lib/services/service.types';
import Glow from '~/components/shared/Glow.vue';

const props = defineProps<{ plan: BasicPlanNoId }>();

const store = useCheckoutStore();
const { nStep, steps, step, selectedPlan, maxStep } = storeToRefs(store);
const { goToStep } = store;

const onSelect = () => {
  selectedPlan.value = props.plan;
};

const component = computed(() => {
  if ('signup' === step.value.name) {
    return {
      component: markRaw(SignUp),
    };
  }
  if ('checkout' === step.value.name) {
    return { component: markRaw(StripeEmbed) };
  }
  return {};
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Glow>
        <Button
          @click="onSelect"
          :variant="props.plan.featured ? 'default' : 'outline'"
          size="lg"
          class="w-full"
        >
          Get Access
        </Button>
      </Glow>
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-[95%] sm:w-[1000px] sm:max-h-[95hv] sm:h-[min(1000px,95vh)] h-full"
    >
      <DialogHeader class="flex items-center">
        <VisuallyHidden>
          <DialogTitle> Enter Your Information</DialogTitle>
          <DialogDescription> Signup and Checkout Form</DialogDescription>
        </VisuallyHidden>
        <BreadcumbSteps
          :steps="steps.map((step: Step) => step.description)"
          :currentStep="nStep"
          :maxClickableStep="maxStep"
          @step-click="goToStep"
        />
      </DialogHeader>
      <div class="grid py-4 overflow-y-auto px-6">
        <component :is="component.component" class="w-full" />
      </div>

      <DialogFooter> </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
