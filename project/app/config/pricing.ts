import { PLAN_TIER } from '@prisma-app/client';
import type { BasicPlanNoId } from '@/lib/services/service.types';

export const PRICING_PLANS: Array<BasicPlanNoId> = [
  {
    name: 'Starter Kit',
    description: 'Try our basic features free for 3 days',
    price: 9.99,
    old_price: 0.0,
    features: ['Family Calendar', 'Shared Kita Calendar'],
    not_features: ['Lifetime access'],
    featured: false,
    stripe_product_id: 'prod_NQR7vwUulvIeqW',
    tier: PLAN_TIER.OTP,
    subtext: 'Try all features for 3 days',
    project_token: 3,
    gen_token: 200000,
    money_saved: 0.0,
  },
  {
    name: 'Indie Hacker',
    description: 'Perfect for getting started with features',
    price: 14.99,
    old_price: 0.0,
    features: ['Family Calendar', 'Shared Kita Calendar'],
    not_features: ['Lifetime access'],
    featured: true,
    subtext: 'Cancle whenever you want.',
    money_saved: 2.0,

    stripe_product_id: 'prod_RHghUVYIVbhlH3',
    tier: PLAN_TIER.OTP,
    project_token: 5,
    gen_token: 200000,
  },
  {
    name: 'Content Creator',
    description: 'One-time payment for lifetime access to all features',
    price: 39.99,
    old_price: 0.0,
    features: ['Family Calendar', 'Shared Kita Calendar', 'Lifetime Access'],
    not_features: [],
    featured: false,
    subtext: 'Pay once, use forever!',
    money_saved: 10.0,

    stripe_product_id: 'prod_RHgi1edplqgx36',
    tier: PLAN_TIER.OTP,
    project_token: 10,
    gen_token: 200000,
  },
];
