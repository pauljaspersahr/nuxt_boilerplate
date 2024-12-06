<script setup lang="ts">
import { VisuallyHidden } from 'radix-vue';
import BreadcumbSteps from '~/components/shared/BreadcrumbSteps.vue';
import StripeEmbed from '~/components/checkout/StripeEmbed.vue';
import SignUp from '~/components/checkout/SignUp.vue';

const props = defineProps<{ planName: string; featured?: boolean }>();

const store = useCheckoutStore();
const { nStep, steps, step, selectedPlan } = storeToRefs(store);
const { goToStep, incrementStep } = store;

const onSelect = () => {
  selectedPlan.value = props.planName;
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
        :variant="props.featured ? 'default' : 'secondary'"
        size="lg"
      >
        Share
      </Button>
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
      <div class="grid py-4 overflow-y-auto px-6">
        <component :is="component.component" class="w-full" />
      </div>

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
