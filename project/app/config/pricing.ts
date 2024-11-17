import { PLAN_TIER } from '@prisma-app/client';
import type { BasicPlanNoId } from '@/lib/services/service.types';

export const PRICING_PLANS: Array<BasicPlanNoId> = [
  {
    name: 'Free Trial',
    description: 'Try our basic features free for 3 days',
    duration_days: 3,
    price: 0,
    old_price: 0,
    features: ['Family Calendar', 'Shared Kita Calendar'],
    not_features: ['Lifetime access'],
    featured: false,
    stripe_product_id: 'prod_NQR7vwUulvIeqW',
    tier: PLAN_TIER.BASIC,
    subtext: 'Try all features for 3 days',
  },
  //   {
  //     name: 'Monthly Plan',
  //     description: 'Perfect for getting started with features',
  //     duration_days: 30,
  //     price: 4.99,
  //     old_price: 7.99,
  //     features: ['Family Calendar', 'Shared Kita Calendar'],
  //     not_features: ['Lifetime access'],
  //     featured: true,
  //     stripe_product_id: 'prod_NQR7vwUulvIeqW',
  //     tier: PLAN_TIER.BASIC,
  //   },
  {
    name: 'Lifetime Plan',
    description: 'One-time payment for lifetime access to all features',
    duration_days: -1,
    price: 19.99,
    old_price: 39.99,
    features: ['Family Calendar', 'Shared Kita Calendar', 'Lifetime Access'],
    not_features: [],
    featured: true,
    stripe_product_id: 'prod_NQR7vwUulvIeqW',
    tier: PLAN_TIER.BASIC,
    subtext: 'Pay once, use forever!',
  },
];
