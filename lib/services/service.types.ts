import { Prisma } from "@prisma/client";

export const basicUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    auth_id: true,
    email: true,
    email_confirmed: true,
    display_name: true,
    created_at: true,
    access: true,
  },
});
export type BasicUser = Prisma.UserGetPayload<typeof basicUser>;

export const fullDBUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    membership: {
      include: {
        plan: true,
      },
    },
  },
});
export type FullDBUser = Prisma.UserGetPayload<typeof fullDBUser>;

export const basicMembership = Prisma.validator<Prisma.MembershipDefaultArgs>()(
  {
    select: {
      id: true,
      user_id: true,
      name: true,
      current_period_ends: true,
      features: true,
      stripe_subscription_id: true,
      pending: true,
    },
  }
);
export type BasicMembership = Prisma.MembershipGetPayload<
  typeof basicMembership
>;

export const basicPlan = Prisma.validator<Prisma.PlanDefaultArgs>()({
  select: {
    id: true,
    name: true,
    features: true,
    stripe_product_id: true,
  },
});
export type BasicPlan = Prisma.PlanGetPayload<typeof basicPlan>;

export const fullMembership = Prisma.validator<Prisma.MembershipDefaultArgs>()({
  include: {
    plan: true,
  },
});
export type FullMembership = Prisma.MembershipGetPayload<typeof fullMembership>;

export const fullPlan = Prisma.validator<Prisma.PlanDefaultArgs>()({
  include: {
    memberships: true,
  },
});
export type FullPlan = Prisma.PlanGetPayload<typeof fullPlan>;
