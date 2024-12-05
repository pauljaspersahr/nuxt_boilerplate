import type { DefineComponent, FunctionalComponent } from 'vue';
import SignUpOTP from '~/components/SignUpOTP.vue';
import StripeEmbed from '~/components/StripeEmbed.vue';
import { z } from 'zod';
import { BookUser, Check, CreditCard, Truck } from 'lucide-vue-next';

type Step = {
  step: number;
  title: string;
  description: string;
  icon: FunctionalComponent<any, any, any>;
  comp: DefineComponent<any, any, any>;
  props?: Record<string, any>;
};

export const useCheckoutStore = defineStore('checkout', () => {
  const steps: Ref<Step[]> = ref([
    {
      step: 1,
      title: 'Your details',
      description: 'Add your details here',
      icon: markRaw(BookUser),
      comp: markRaw(SignUpOTP),
      props: { onSuccess: () => incrementStep() },
    },
    {
      step: 2,
      title: 'Pick Plan',
      description: 'Choose your plan',
      icon: markRaw(Truck),
      comp: markRaw(StripeEmbed),
    },
    {
      step: 3,
      title: 'Checkout',
      description: 'Confirm your order',
      icon: markRaw(Check),
      comp: markRaw(StripeEmbed),
    },
  ]);

  const currentStep = ref(1);
  const completed = ref(false);

  const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
  });

  const { formData, formErrors, validateField, isValid } =
    useFormValidation(signUpSchema);

  const component = computed(() => {
    const step = steps.value[currentStep.value];
    return {
      component: step.comp,
      props: step.props || {},
    };
  });

  const stepperSteps = computed(() =>
    steps.value.map((step) => ({
      step: step.step,
      title: step.title,
      description: step.description,
      icon: step.icon,
    })),
  );

  function incrementStep() {
    if (currentStep.value < steps.value.length) {
      currentStep.value++;
    }
  }

  function goToStep(step: number | undefined) {
    if (step && step >= 1 && step <= steps.value.length) {
      currentStep.value = step;
    }
  }

  return {
    steps,
    currentStep,
    component,
    completed,
    incrementStep,
    goToStep,
    stepperSteps,
    userData: formData,
    userDataErrors: formErrors,
    validateField,
    isValid,
  };
});
