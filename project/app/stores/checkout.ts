import type { DefineComponent } from 'vue';
import { defineStore } from 'pinia';
import { markRaw, ref, computed, type Ref } from 'vue';
import { z } from 'zod';

type Step = {
  name: string;
  description: string;
};

export const useCheckoutStore = defineStore('checkout', () => {
  const steps: Ref<Step[]> = ref([
    {
      name: 'signup',
      description: 'Your details',
    },
    {
      name: 'checkout',
      description: 'Checkout',
    },
  ]);

  const nStep = ref(0);
  const completed = ref(false);
  const selectedPlan = ref('');

  const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
  });

  const { formData, formErrors, validateField, isValid } =
    useFormValidation(signUpSchema);

  const step = computed(() => {
    return steps.value[nStep.value];
  });

  function incrementStep() {
    if (nStep.value < steps.value.length - 1) {
      nStep.value++;
    }
  }

  function goToStep(index: number) {
    if (index >= 0 && index < steps.value.length) {
      nStep.value = index;
    }
  }

  return {
    steps,
    nStep,
    step,
    completed,
    incrementStep,
    goToStep,
    userData: formData,
    userDataErrors: formErrors,
    validateField,
    isValid,
    selectedPlan,
  };
});
