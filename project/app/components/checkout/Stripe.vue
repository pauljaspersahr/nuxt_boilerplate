<script setup lang="ts">
import {
  type Stripe,
  type StripeElements,
  loadStripe,
} from '@stripe/stripe-js';

const router = useRouter();

const config = useRuntimeConfig();

let stripe: Stripe | null;
let loading = ref(true);
let elements: StripeElements;

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

const handleSubmit = async (e: Event) => {
  if (loading.value) return;
  if (!stripe || !elements) {
    // Stripe.js hasn't yet loaded.
    return;
  }
  loading.value = true;
  const { name, email, address, city, state, zip } = Object.fromEntries(
    new FormData(e.target as HTMLFormElement),
  );

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
        receipt_email: email as string,
        shipping: {
          address: {
            city: city as string,
            line1: address as string,
            state: state as string,
            postal_code: zip as string,
            country: 'US',
          },
          name: name as string,
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
  <form @submit.prevent="handleSubmit">
    <fieldset :class="{ dis: loading }" class="fields">
      <Label for="name_field">Name</Label>
      <Input placeholder="Jane Doe" type="text" name="name" id="name_field" />
      <Label for="email_field">Email</Label>
      <Input
        placeholder="jane.doe@example.com "
        type="email"
        name="email"
        id="email_field"
      />
      <Label for="address_field">Address</Label>
      <Input
        placeholder="1234 Sycamore Street"
        type="text"
        name="address"
        id="address_field"
      />
      <Label for="city_field">City</Label>
      <Input placeholder="Reno" type="text" name="city" id="city_field" />
      <Label for="state_field">State</Label>
      <Input placeholder="Nevada" type="text" name="state" id="state_field" />
      <Label for="zip_field">Zip</Label>
      <Input placeholder="89523" type="text" name="zip" id="zip_field" />
      <Label for="email_field">Credit Card</Label>
      <div id="payment-element" />
    </fieldset>
    <div class="">
      <button type="submit" :class="{ dis: loading }">
        {{ loading ? 'Loading...' : 'Pay $19.99' }}
      </button>
    </div>
  </form>
</template>
