<script setup lang="ts">
import SelectedPlan from '@/components/checkout/SelectedPlan.vue';
import { Separator } from '@/components/ui/separator';
import {
  type Stripe,
  type StripeElements,
  loadStripe,
} from '@stripe/stripe-js';
import { vAutoAnimate } from '@formkit/auto-animate/vue';

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { init } = userStore;

const config = useRuntimeConfig();

let stripe: Stripe | null;
let loading = ref(true);
let elements: StripeElements;

const colorMode = useColorMode();

onMounted(async () => {
  init();
  console.log('loading stripe');
  console.log('config', config.public.stripeKey);
  stripe = await loadStripe(config.public.stripeKey as string);
  // elements
  console.log('stripe', stripe);

  elements = stripe!.elements({
    mode: 'payment',
    amount: 1999,
    currency: 'usd',
    appearance: {
      theme: colorMode.value === 'dark' ? 'night' : 'stripe',
    },
  });
  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');

  loading.value = false;
});

const handleSubmit = async () => {
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
        receipt_email: user.value?.email,
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
};
</script>
<template>
  <div
    class="flex flex-col sm:flex-row items-center w-full align-middle justify-center"
  >
    <div class="flex flex-col items-center sm:items-end sm:mr-4">
      <SelectedPlan />
    </div>
    <Separator
      orientation="vertical"
      class="hidden sm:block h-full self-stretch mx-8"
    />
    <div class="flex flex-col sm:ml-4">
      <Card class="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle class="text-xl">Payment</CardTitle>
          <CardDescription>
            Enter your information to finish checkout
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="email">Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              :defaultValue="user?.email"
              disabled
            />
          </div>

          <div class="mt-4" id="payment-element" />
          <LoadingButton
            :loading="loading"
            :enableOn="true"
            :onClick="handleSubmit"
            buttonText="Pay now"
            loadingText="Processing payment..."
          />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
