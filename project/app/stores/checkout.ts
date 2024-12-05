import type { DefineComponent } from 'vue';
import SignUpOTP from '~/components/SignUpOTP.vue';
import StripeEmbed from '~/components/StripeEmbed.vue';
import { z } from 'zod';

type Step = {
  breadcrumb: string;
  comp: DefineComponent<any, any, any>;
  props?: Record<string, any>;
};

export const useCheckoutStore = defineStore('checkout', () => {
  const steps: Ref<Step[]> = ref([
    {
      breadcrumb: 'Your details',
      comp: markRaw(SignUpOTP),
      props: { onSuccess: () => incrementStep() },
    },
    { breadcrumb: 'Checkout', comp: markRaw(StripeEmbed) },
  ]);

  const index_ = ref(0);
  const completed = ref(false);

  const signUpSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
  });

  const { formData, formErrors, validateField, isValid } =
    useFormValidation(signUpSchema);

  const component = computed(() => {
    const step = steps.value[index_.value];
    return {
      component: step.comp,
      props: step.props || {},
    };
  });
  function incrementStep() {
    if (index_.value < steps.value.length - 1) {
      index_.value++;
    }
  }

  function goToStep(index: number) {
    if (index >= 0 && index < steps.value.length) {
      index_.value = index;
    }
  }

  return {
    steps,
    index: index_,
    component,
    completed,
    incrementStep,
    goToStep,
    userData: formData,
    userDataErrors: formErrors,
    validateField,
    isValid,
  };
});
