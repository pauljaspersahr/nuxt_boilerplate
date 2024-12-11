import Stripe from 'stripe';
import log from '~/lib/logger';
import { MembershipService } from '~/lib/services/membership.service';
import { UserService } from '~/lib/services/user.service';
import type { BasicPlan, BasicMembership } from '~/lib/services/service.types';

export default defineEventHandler(async (event) => {
  log.info('stripe webhook hit');
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-11-20.acacia',
  });
  const headers = event.node.req.headers;

  const body = await readRawBody(event);
  const sig = headers['stripe-signature'];
  let hookEvent: Stripe.Event;

  try {
    hookEvent = stripe.webhooks.constructEvent(
      body as string,
      sig as string,
      process.env.STRIPE_ENDPOINT_SECRET as string,
    );
  } catch (err) {
    log.error('Webhook signature verification failed.', err);
    throw createError({ statusCode: 400, message: 'Webhook Error' });
  }

  switch (hookEvent.type) {
    case 'payment_intent.succeeded':
      try {
        const paymentIntent = hookEvent.data.object as Stripe.PaymentIntent;
        log.info('One-time payment successful:', paymentIntent);
        // Fulfill the one-time payment (e.g., deliver product)

        const customerId = paymentIntent.customer;
        if (!customerId) {
          throw new Error('payment_intent.succeeded without constomer id');
        }
        const customer = await stripe.customers.retrieve(customerId.toString());
        const customerEmail = (customer as Stripe.Customer).email;
        if (!customerEmail) {
          throw new Error('Customer does not have an email address');
        }
        log.info(customerEmail, 'customer email:');

        const productId = paymentIntent.metadata.product_id;
        if (!productId) {
          throw new Error(
            'Payment Intent does not have a product_id in metadata',
          );
        }
        log.info(productId, 'product_id:');
        const plan: BasicPlan =
          await MembershipService.getBasicPlanByProductId(productId);

        log.info(plan, 'plan:');

        const user = await UserService.getUserByEmail(customerEmail);
        log.info(user, 'user:');

        if (!user.membership) {
          const membership = await MembershipService.createMembership(
            user.id,
            customerId.toString(),
            plan.id,
          );
          log.info(membership, 'Created user Membership to');
        } else {
          const membership = await MembershipService.updateMembership(
            user.id,
            plan.id,
          );
          log.info(membership, 'Updated user Membership to');
        }
      } catch (err) {
        log.error(err);
      } finally {
        break;
      }

    case 'invoice.payment_succeeded':
      const invoice = hookEvent.data.object as Stripe.Invoice;
      log.info(invoice, 'Subscription invoice payment succeeded:');
      // Handle successful subscription payment (e.g., extend subscription)
      break;

    case 'customer.subscription.created':
      const subscriptionCreated = hookEvent.data.object as Stripe.Subscription;
      log.info(subscriptionCreated, 'Subscription created:');
      // Enable access to subscription-based features
      break;

    case 'customer.subscription.updated':
      const subscriptionUpdated = hookEvent.data.object as Stripe.Subscription;
      log.info(subscriptionUpdated, 'Subscription updated:');
      // Handle subscription updates (e.g., plan changes)
      break;

    case 'customer.subscription.deleted':
      const subscriptionDeleted = hookEvent.data.object as Stripe.Subscription;
      log.info(subscriptionDeleted, 'Subscription canceled:');
      // Revoke access to subscription-based features
      break;

    default:
      log.trace(hookEvent.type, 'Unhandled event type:');
  }
});
