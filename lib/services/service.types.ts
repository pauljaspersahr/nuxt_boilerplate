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

export const membership = Prisma.validator<Prisma.MembershipDefaultArgs>()({
  include: {
    plan: true,
  },
});
export type Memebership = Prisma.MembershipGetPayload<typeof membership>;

export const basicPlan = Prisma.validator<Prisma.PlanDefaultArgs>()({
  select: {
    id: true,
    name: true,
    features: true,
    stripe_product_id: true,
  },
});
export type BasicPlan = Prisma.PlanGetPayload<typeof basicPlan>;

export const plan = Prisma.validator<Prisma.PlanDefaultArgs>()({
  include: {
    memberships: true,
  },
});
export type Plan = Prisma.PlanGetPayload<typeof plan>;
