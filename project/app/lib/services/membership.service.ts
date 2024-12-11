import prisma_app_client from '~/prisma/app.client';
import {
  basicMembership,
  type BasicMembership,
  membership,
  type Membership,
  basicPlan,
  type BasicPlan,
  plan,
  type Plan,
} from './service.types';

export namespace MembershipService {
  export async function getBasicMembershipById(
    membership_id: string,
  ): Promise<BasicMembership> {
    return prisma_app_client.membership.findFirstOrThrow({
      where: { id: membership_id },
      ...basicMembership,
    });
  }

  export async function getMembershipById(
    membership_id: string,
  ): Promise<Membership> {
    return prisma_app_client.membership.findFirstOrThrow({
      where: { id: membership_id },
      ...membership,
    });
  }

  export async function getMembershipByUserId(
    user_id: string,
  ): Promise<Membership> {
    return prisma_app_client.membership.findFirstOrThrow({
      where: { user_id: user_id },
      ...membership,
    });
  }
  export async function getBasicPlanById(plan_id: string): Promise<BasicPlan> {
    return prisma_app_client.plan.findFirstOrThrow({
      where: { id: plan_id },
      ...basicPlan,
    });
  }

  export async function getPlanByProductId(product_id: string): Promise<Plan> {
    return prisma_app_client.plan.findFirstOrThrow({
      where: { stripe_product_id: product_id },
      ...plan,
    });
  }
  export async function getBasicPlanByProductId(
    product_id: string,
  ): Promise<BasicPlan> {
    return prisma_app_client.plan.findFirstOrThrow({
      where: { stripe_product_id: product_id },
      ...basicPlan,
    });
  }

  export async function getPlanById(plan_id: string): Promise<Plan> {
    return prisma_app_client.plan.findFirstOrThrow({
      where: { id: plan_id },
      ...plan,
    });
  }
  export async function getBasicPlans(): Promise<BasicPlan[]> {
    return prisma_app_client.plan.findMany();
  }

  export async function createMembership(
    user_id: string,
    stripe_customer_id: string,
    plan_id: string,
  ): Promise<BasicMembership> {
    const plan = await getPlanById(plan_id);

    return await prisma_app_client.membership.create({
      data: {
        user_id: user_id,
        stripe_customer_id: stripe_customer_id,
        plan_id: plan_id,
        max_project_token: plan.project_token,
      },
    });
  }

  export async function updateMembership(
    user_id: string,
    plan_id: string,
  ): Promise<BasicMembership> {
    const membership = await getMembershipByUserId(user_id);
    const plan = await getPlanById(plan_id);

    return await prisma_app_client.membership.update({
      where: { user_id: user_id },
      data: {
        plan_id: plan_id,
        max_project_token: membership.max_project_token + plan.project_token,
      },
    });
  }
}
