import prisma_client from "~/prisma/prisma.client";
import {
  basicUser,
  type BasicUser,
  user,
  type User,
  basicMembership,
  type BasicMembership,
  membership,
  type Memebership,
  basicPlan,
  type BasicPlan,
  plan,
  type Plan,
} from "./service.types";

const config = useRuntimeConfig();

export namespace UserService {
  export async function getBasicUserById(user_id: string): Promise<BasicUser> {
    return prisma_client.user.findFirstOrThrow({
      where: { id: user_id },
      ...basicUser,
    });
  }

  export async function getUserById(user_id: string): Promise<User> {
    return prisma_client.user.findFirstOrThrow({
      where: { id: user_id },
      ...user,
    });
  }

  export async function getUserByAuthId(auth_id: string): Promise<User> {
    return prisma_client.user.findFirstOrThrow({
      where: { auth_id: auth_id },
      ...user,
    });
  }

  export async function createUser(
    auth_id: string,
    display_name: string,
    email: string
  ): Promise<User | null> {
    const trialPlan = await prisma_client.plan.findFirstOrThrow({
      where: { name: config.initialPlanName },
    });

    return prisma_client.user.create({
      data: {
        auth_id: auth_id,
        display_name: display_name,
        email: email,
      },
    });
  }
}
