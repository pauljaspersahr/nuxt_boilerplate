import { Prisma } from '@prisma-app/client';
export { PrismaClientKnownRequestError } from '@prisma-app/client/runtime/library';

export const basicUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    auth_id: true,
    email: true,
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
    projects: true,
  },
});
export type User = Prisma.UserGetPayload<typeof user>;

export const basicMembership = Prisma.validator<Prisma.MembershipDefaultArgs>()(
  {
    select: {
      id: true,
      user_id: true,
      current_period_ends: true,
      max_project_token: true,
      project_tokens: true,
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
    price: true,
    old_price: true,
    features: true,
    not_features: true,
    featured: true,
    subtext: true,
    money_saved: true,

    stripe_product_id: true,
    project_token: true,
    gen_token: true,
    tier: true,
  },
});
export type BasicPlan = Prisma.PlanGetPayload<typeof basicPlan>;

export const basicPlanNoId = Prisma.validator<Prisma.PlanDefaultArgs>()({
  select: {
    name: true,
    description: true,
    price: true,
    old_price: true,
    features: true,
    not_features: true,
    featured: true,
    subtext: true,
    money_saved: true,

    stripe_product_id: true,
    project_token: true,
    gen_token: true,
    tier: true,
  },
});
export type BasicPlanNoId = Prisma.PlanGetPayload<typeof basicPlanNoId>;

export const plan = Prisma.validator<Prisma.PlanDefaultArgs>()({
  include: {
    memberships: true,
  },
});
export type Plan = Prisma.PlanGetPayload<typeof plan>;

export const basicProject = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  select: {
    id: true,
    max_gen_token: true,
    gen_token: true,
    user_id: true,
  },
});
export type BasicProject = Prisma.ProjectGetPayload<typeof basicProject>;

// Project with User
export const project = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: {
    user: true,
  },
});
export type Project = Prisma.ProjectGetPayload<typeof project>;
