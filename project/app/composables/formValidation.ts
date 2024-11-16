import type { z } from 'zod';

export const useFormValidation = <T extends z.ZodType>(schema: T) => {
  type FormData = z.infer<typeof schema>;

  const formData = ref({} as FormData);
  const formErrors = ref({} as Record<keyof FormData, string>);
  const touched = ref({} as Record<keyof FormData, boolean>);
  const isValid = ref(false);

  watch(
    () => formData.value,
    () => {
      const result = schema.safeParse(formData.value);
      isValid.value = result.success;
    },
    { deep: true },
  );

  const validateField = (field: keyof FormData) => {
    touched.value[field] = true;
    const result = schema.safeParse(formData.value);
    formErrors.value[field] = result.success
      ? ''
      : result.error.formErrors.fieldErrors[field]?.[0] || '';
  };

  return {
    formData,
    formErrors,
    touched,
    validateField,
    isValid,
  };
};
