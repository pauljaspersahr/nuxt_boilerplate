import Stripe from 'stripe';
import log from '~/lib/logger';

export default defineEventHandler(async (event) => {
  const { product_id, mail } = await readBody(event);

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2024-11-20.acacia',
  });

  try {
    // Step 1: Fetch product price
    const { data } = await stripe.prices.list({
      product: product_id,
    });

    if (!data?.[0]?.unit_amount) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Product price not found.',
      });
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
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
