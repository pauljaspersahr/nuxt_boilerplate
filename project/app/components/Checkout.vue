<script setup lang="ts">
import { VisuallyHidden } from 'radix-vue';
import BreadcumbSteps from '~/components/shared/BreadcrumbSteps.vue';
import StripeEmbed from '~/components/checkout/Stripe.vue';
import SignUp from '~/components/checkout/SignUp.vue';
import type { Step } from '~/stores/checkout';
import type { BasicPlanNoId } from '@/lib/services/service.types';

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
      <Button
        @click="onSelect"
        :variant="props.plan.featured ? 'default' : 'secondary'"
        size="lg"
        class="w-full"
      >
        Get Access
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-6xl sm:h-[700px] h-full">
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
