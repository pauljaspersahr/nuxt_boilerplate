<script setup lang="ts">
import { VisuallyHidden } from 'radix-vue';
import BreadcumbSteps from '~/components/shared/BreadcrumbSteps.vue';
import Stepper from '~/components/shared/Stepper.vue';

const store = useCheckoutStore();

const { currentStep, stepperSteps, component } = storeToRefs(store);
const { goToStep } = store;
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="default"> Share </Button>
    </DialogTrigger>
    <DialogContent class="sm:w-2xl sm:h-[700px]">
      <DialogHeader class="flex items-center">
        <VisuallyHidden>
          <DialogTitle> Enter Your Information</DialogTitle>
          <DialogDescription> Signup and Checkout Form</DialogDescription>
        </VisuallyHidden>
        <Stepper
          :steps="stepperSteps"
          :current-step="currentStep"
          :onStepChange="goToStep"
        />
        <!-- <BreadcumbSteps
          :steps="steps.map((step) => step.breadcrumb)"
          :currentIndex="index"
          @step-click="goToStep"
        /> -->
      </DialogHeader>

      <component
        :is="component.component"
        v-bind="component.props"
        class="w-full"
      />

      <DialogFooter>
        <Button
          v-if="currentStep > 1"
          @click="goToStep(currentStep - 1)"
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          v-if="currentStep < stepperSteps.length"
          @click="goToStep(currentStep + 1)"
          variant="default"
        >
          Next
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
