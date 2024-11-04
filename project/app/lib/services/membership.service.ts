import prisma_client from "~/prisma/prisma.client";
import {
  basicMembership,
  type BasicMembership,
  membership,
  type Membership,
  basicPlan,
  type BasicPlan,
  plan,
  type Plan,
} from "./service.types";

export namespace MembershipService {
  export async function getBasicMembershipById(
    membership_id: string
  ): Promise<BasicMembership> {
    return prisma_client.membership.findFirstOrThrow({
      where: { id: membership_id },
      ...basicMembership,
    });
  }

  export async function getMembershipById(
    membership_id: string
  ): Promise<Membership> {
    return prisma_client.membership.findFirstOrThrow({
      where: { id: membership_id },
      ...membership,
    });
  }

  export async function getMembershipByUserId(
    user_id: string
  ): Promise<Membership> {
    return prisma_client.membership.findFirstOrThrow({
      where: { user_id: user_id },
      ...membership,
    });
  }
  export async function getBasicPlanById(plan_id: string): Promise<BasicPlan> {
    return prisma_client.plan.findFirstOrThrow({
      where: { id: plan_id },
      ...basicPlan,
    });
  }

  export async function getPlanById(plan_id: string): Promise<Plan> {
    return prisma_client.plan.findFirstOrThrow({
      where: { id: plan_id },
      ...plan,
    });
  }

  export async function getBasicPlans(): Promise<BasicPlan[]> {
    return prisma_client.plan.findMany();
  }
}
