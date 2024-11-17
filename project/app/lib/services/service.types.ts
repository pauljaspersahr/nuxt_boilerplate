import { Prisma } from '@prisma-app/client';

export const basicUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    auth_id: true,
    email: true,
    email_confirmed: true,
    display_name: true,
    created_at: true,
    status: true,
  },
});
export type BasicUser = Prisma.UserGetPayload<typeof basicUser>;

export const user = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    membership: {
      include: {
        plan: true,
      },
    },
  },
});
export type User = Prisma.UserGetPayload<typeof user>;

export const basicMembership = Prisma.validator<Prisma.MembershipDefaultArgs>()(
  {
    select: {
      id: true,
      user_id: true,
      current_period_ends: true,
      stripe_subscription_id: true,
    },
  },
);
export type BasicMembership = Prisma.MembershipGetPayload<
  typeof basicMembership
>;

export const membership = Prisma.validator<Prisma.MembershipDefaultArgs>()({
  include: {
    plan: true,
  },
});
export type Membership = Prisma.MembershipGetPayload<typeof membership>;

export const basicPlan = Prisma.validator<Prisma.PlanDefaultArgs>()({
  select: {
    id: true,
    name: true,
    description: true,
    duration_days: true,
    price: true,
    old_price: true,
    features: true,
    not_features: true,
    featured: true,
    stripe_product_id: true,
    tier: true,
    subtext: true,
  },
});
export type BasicPlan = Prisma.PlanGetPayload<typeof basicPlan>;

export const basicPlanNoId = Prisma.validator<Prisma.PlanDefaultArgs>()({
  select: {
    name: true,
    description: true,
    duration_days: true,
    price: true,
    old_price: true,
    features: true,
    not_features: true,
    featured: true,
    stripe_product_id: true,
    tier: true,
    subtext: true,
  },
});
export type BasicPlanNoId = Prisma.PlanGetPayload<typeof basicPlanNoId>;

export const plan = Prisma.validator<Prisma.PlanDefaultArgs>()({
  include: {
    memberships: true,
  },
});
export type Plan = Prisma.PlanGetPayload<typeof plan>;
