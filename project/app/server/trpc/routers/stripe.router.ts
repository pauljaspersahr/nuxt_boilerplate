// app/server/trpc/routers/stripe.router.ts
import { z } from 'zod';
import Stripe from 'stripe';
import log from '~/lib/logger';
import { authedProcedure, router } from '../trpc';

export const stripeRouter = router({
  createPaymentIntent: authedProcedure
    .input(
      z.object({
        product_id: z.string(),
        mail: z.string().email(),
      }),
    )
    .mutation(async ({ input }) => {
      const { product_id, mail } = input;

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2024-11-20.acacia',
      });

      try {
        // Step 1: Fetch product price
        const { data } = await stripe.prices.list({
          product: product_id,
        });

        if (!data?.[0]?.unit_amount) {
          throw new Error('Product price not found.');
        }

        const unitAmount = data[0].unit_amount;
        const currency = data[0].currency;

        log.info({ unitAmount, currency }, 'Product price and currency');

        // Step 2: Retrieve or create customer
        let customer;
        if (mail) {
          const existingCustomers = await stripe.customers.list({
            email: mail,
            limit: 1,
          });

          if (existingCustomers.data.length > 0) {
            customer = existingCustomers.data[0];
          } else {
            customer = await stripe.customers.create({
              email: mail,
            });
          }
        }
        log.info(customer, 'Customer');

        // Step 3: Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: unitAmount,
          currency,
          customer: customer?.id,
          metadata: { product_id },
          automatic_payment_methods: {
            enabled: true,
          },
        });

        return { secret: paymentIntent.client_secret };
      } catch (error) {
        log.error({ error }, 'Error handling payment:');
        throw new Error((error as Error).message);
      }
    }),
});
