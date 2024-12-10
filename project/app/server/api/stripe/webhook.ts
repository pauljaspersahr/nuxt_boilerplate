import Stripe from 'stripe';
//https://github.com/vercel/next.js/blob/canary/examples/with-stripe-typescript/pages/api/webhooks/index.ts
import log from '~/lib/logger';

export default defineEventHandler(async (event) => {
  log.info('stripe webhook');
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    // https://github.com/stripe/stripe-node#configuration
    // apiVersion: "2022-11-15"
  });
  const headers = event.node.req.headers;

  const body = await readRawBody(event);
  const sig = headers['stripe-signature'];
  let hookEvent: Stripe.Event;

  try {
    hookEvent = stripe.webhooks.constructEvent(
      body as string,
      sig as string,
      process.env.ENDPOINT_SECRET as string,
    );
  } catch (err) {
    throw createError({ statusCode: 400, message: (err as Error).message });
  }

  switch (hookEvent.type) {
    case 'payment_intent.created':
      log.info('payment_intent.created');
      break;
    case 'payment_intent.succeeded':
      const intentSucceeded = hookEvent.data.object;
      log.info('payment_intent.succeeded', intentSucceeded);
      break;
    case 'charge.succeeded':
      const chargeSucceeded = hookEvent.data.object;
      log.info('charge was successful!', chargeSucceeded);
      break;
    //   // ... handle other event types
    default:
      log.trace(`Unhandled event type ${hookEvent.type}`);
  }
});
