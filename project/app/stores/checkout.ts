import { defineStore } from 'pinia';
import { ref, computed, type Ref } from 'vue';
import { z } from 'zod';
import { authClient } from '~/lib/auth.client';

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
  const maxStep = ref(0);
  const completed = ref(false);
  const selectedPlan = ref('');

  const { formData, formErrors, validateField, isValid } = useFormValidation(
    z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email address'),
    }),
  );

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

  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  watch(
    user,
    (newValue) => {
      if (newValue !== null) {
        nStep.value = 1;
        maxStep.value = 1;
      } else {
        nStep.value = 0;
        maxStep.value = 0;
      }
    },
    { immediate: true },
  );
  return {
    steps,
    nStep,
    maxStep,
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
