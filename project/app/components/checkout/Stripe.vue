<script setup lang="ts">
import {
  type Stripe,
  type StripeElements,
  loadStripe,
} from '@stripe/stripe-js';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { vAutoAnimate } from '@formkit/auto-animate/vue';

const router = useRouter();

const config = useRuntimeConfig();

let stripe: Stripe | null;
let loading = ref(true);
let elements: StripeElements;

const checkoutStore = useCheckoutStore();
const { formValues } = storeToRefs(checkoutStore);
const { handleSubmit, values, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z.string().email(),
    }),
  ),
  initialValues: { email: formValues.value.email },
});

onMounted(async () => {
  console.log('loading stripe');
  console.log('config', config.public.stripeKey);
  stripe = await loadStripe(config.public.stripeKey as string);
  // elements
  console.log('stripe', stripe);

  elements = stripe!.elements({
    mode: 'payment',
    amount: 1999,
    currency: 'usd',
  });
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');

  loading.value = false;
});

const onSubmit = handleSubmit(async (values) => {
  if (loading.value) return;
  if (!stripe || !elements) {
    // Stripe.js hasn't yet loaded.
    return;
  }
  loading.value = true;

  // Create payment intents first and grab secret
  try {
    const { data: response } = await useFetch('/stripePurchase', {
      method: 'POST',
      body: { productID: 'prod_JfGkdfBBEv5KCi' },
    });
    console.log('response', response);
    const { secret: clientSecret } = response.value;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.log('error submit');
      loading.value = false;
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        receipt_email: values.email,
        shipping: {
          address: {
            city: 'Reno',
            line1: '1234 Sycamore Street',
            state: 'Nevada',
            postal_code: '89523',
            country: 'US',
          },
          name: 'John Doe',
        },
        return_url: 'https://main.d2wvufylq5bmja.amplifyapp.com/success',
      },
      // Uncomment below if you only want redirect for redirect-based payments
      // redirect: "if_required",
    });

    loading.value = false;
    if (error.type === 'card_error' || error.type === 'validation_error') {
      router.push('/error');
    } else {
      console.log('great');
    }
  } catch (error) {
    console.log('error', error);
    router.push('/error');
    loading.value = false;
  }
});
</script>
<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem v-auto-animate>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="Enter your email"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div id="payment-element" />
    <LoadingButton
      :loading="loading"
      :enableOn="meta.valid"
      :onClick="onSubmit"
      buttonText="Pay now"
      loadingText="Processing payment..."
    />
  </form>
</template>
