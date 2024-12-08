import { defineStore } from 'pinia';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

export type Step = {
  name: string;
  description: string;
};

export const useCheckoutStore = defineStore('checkout', () => {
  const steps = ref<Step[]>([
    {
      name: 'signup',
      description: 'Your details',
    },
    {
      name: 'checkout',
      description: 'Checkout',
    },
  ]);

  const formValues = ref({
    name: '',
    email: '',
  });
  const nStep = ref(0);
  const maxStep = ref(0);
  const completed = ref(false);
  const selectedPlan = ref('');

  const setFormValues = (values: typeof formValues.value) => {
    console.log(values);
    Object.assign(formValues.value, values);
  };
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
    selectedPlan,
    formValues,
    setFormValues,
  };
});
