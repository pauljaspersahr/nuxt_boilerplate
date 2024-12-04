<script setup lang="ts">
import BreadcumbSteps from '~/components/shared/BreadcrumbSteps.vue';

const store = useCheckoutStore();

const { index, steps, component } = storeToRefs(store);
const { goToStep } = store;
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="default"> Share </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md sm:h-[600px] h-full">
      <DialogHeader class="flex items-center">
        <BreadcumbSteps
          :steps="steps.map((step) => step.breadcrumb)"
          :currentIndex="index"
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
          v-if="index > 0"
          @click="goToStep(index - 1)"
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          v-if="index < steps.length - 1"
          @click="goToStep(index + 1)"
          variant="default"
        >
          Next
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
