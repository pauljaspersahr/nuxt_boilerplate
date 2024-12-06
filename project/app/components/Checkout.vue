<script setup lang="ts">
import { VisuallyHidden } from 'radix-vue';
import BreadcumbSteps from '~/components/shared/BreadcrumbSteps.vue';

const store = useCheckoutStore();

const props = defineProps<{ planName: string }>();

const { nStep, steps, step, selectedPlan } = storeToRefs(store);
const { goToStep, incrementStep } = store;

selectedPlan.value = props.planName;

import SignUpOTP from '~/components/SignUpOTP.vue';
import StripeEmbed from '~/components/StripeEmbed.vue';

const component = computed(() => {
  if ('signup' === step.value.name) {
    return {
      component: markRaw(SignUpOTP),
      props: { onSuccess: () => incrementStep() },
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
      <Button variant="default"> Share </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-4xl sm:h-[700px] h-full">
      <DialogHeader class="flex items-center">
        <VisuallyHidden>
          <DialogTitle> Enter Your Information</DialogTitle>
          <DialogDescription> Signup and Checkout Form</DialogDescription>
        </VisuallyHidden>
        <BreadcumbSteps
          :steps="steps.map((step) => step.description)"
          :currentIndex="nStep"
          @step-click="goToStep"
        />
      </DialogHeader>

      <component
        :is="component.component"
        v-bind="component.props"
        class="w-full"
      />

      <DialogFooter>
        <Button
          v-if="nStep > 0"
          @click="goToStep(nStep - 1)"
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          v-if="nStep < steps.length - 1"
          @click="goToStep(nStep + 1)"
          variant="default"
        >
          Next
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
