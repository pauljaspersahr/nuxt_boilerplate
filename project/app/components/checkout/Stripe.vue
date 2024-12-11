<script setup lang="ts">
import SelectedPlan from '@/components/checkout/SelectedPlan.vue';
import { Separator } from '@/components/ui/separator';
import {
  type Stripe,
  type StripeElements,
  loadStripe,
} from '@stripe/stripe-js';
import LoadingButton from '~/components/shared/LoadingButton.vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import * as z from 'zod';
import { VisuallyHidden } from 'radix-vue';
import log from '~/lib/logger';

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { init } = userStore;

const checkoutStore = useCheckoutStore();
const { selectedPlan } = storeToRefs(checkoutStore);

const config = useRuntimeConfig();

const { toast } = useToast();

let stripe: Stripe | null;
let loading = ref(true);
let elements: StripeElements;

const colorMode = useColorMode();

const { handleSubmit, values, meta, setFieldError } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
    }),
  ),
  initialValues: {
    name: user.value?.display_name || '',
    email: user.value?.email || '',
  },
});

onMounted(async () => {
  init();
  log.info('loading stripe');
  log.info('config', config.public.stripeKey);
  stripe = await loadStripe(config.public.stripeKey as string);
  // elements
  log.info('stripe', stripe);

  elements = stripe!.elements({
    mode: 'payment',
    amount: 1999,
    currency: 'eur',
    appearance: {
      theme: colorMode.value === 'dark' ? 'night' : 'stripe',
    },
  });

  const paymentElement = elements.create('payment', {
    // defaultValues: {
    //   billingDetails: {
    //     email: user.value?.email || '',
    //     name: user.value?.display_name || '',
    //   },
    // },
  });
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
  const { $client } = useNuxtApp();

  // Create payment intents first and grab secret
  try {
    const { secret } = await $client.stripe.createPaymentIntent.mutate({
      product_id: selectedPlan.value?.stripe_product_id,
      mail: user.value?.email,
    });

    const { error: submitError } = await elements.submit();
    if (submitError) {
      log.error('error submit');
      loading.value = false;
      toast({
        title: 'Uh oh! Something went wrong.',
        description: submitError.message,
        variant: 'destructive',
      });
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: secret,
      confirmParams: {
        receipt_email: values.email,
        return_url: `${config.public.siteUrl}/dashboard`,
      },
      // Uncomment below if you only want redirect for redirect-based payments
      // redirect: "if_required",
    });

    loading.value = false;
    if (error.type === 'card_error' || error.type === 'validation_error') {
      router.push('/error');
    } else {
      log.info('great');
    }
  } catch (error) {
    log.error('error', error);
    router.push('/error');
    loading.value = false;
  }
});
</script>
<template>
  <div
    class="flex flex-col sm:grid sm:grid-cols-[1fr_00px_1fr] items-center w-full sm:content-center sm:gap-4"
  >
    <div class="flex flex-col items-center sm:items-end">
      <SelectedPlan class="sm:mr-8 max-w-sm mb-8" />
    </div>
    <Separator
      orientation="vertical"
      class="hidden sm:block h-full self-stretch mx-auto"
    />
    <div class="flex flex-col">
      <Card class="sm:ml-8 max-w-sm">
        <CardHeader>
          <CardTitle class="text-xl">Payment</CardTitle>
          <VisuallyHidden>
            <CardDescription>
              Enter your information to finish checkout
            </CardDescription>
          </VisuallyHidden>
        </CardHeader>
        <CardContent>
          <div class="grid w-full max-w-sm items-center gap-1.5">
            <FormField v-slot="{ componentField }" name="email">
              <FormItem v-auto-animate>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    v-bind="componentField"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <form @submit="onSubmit" class="space-y-4">
              <FormField v-slot="{ componentField }" name="name">
                <FormItem v-auto-animate>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </form>
          </div>

          <div class="mt-4" id="payment-element" />
        </CardContent>
        <CardFooter>
          <LoadingButton
            :loading="loading"
            :enableOn="!loading"
            :onClick="onSubmit"
            buttonText="Pay now"
            loadingText="Processing payment..."
          />
        </CardFooter>
      </Card>
    </div>
  </div>
</template>
