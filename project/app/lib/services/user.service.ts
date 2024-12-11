import prisma_app_client from '~/prisma/app.client';
import { basicUser, type BasicUser, user, type User } from './service.types';

export namespace UserService {
  export async function getBasicUserById(user_id: string): Promise<BasicUser> {
    return prisma_app_client.user.findFirstOrThrow({
      where: { id: user_id },
      ...basicUser,
    });
  }

  export async function getUserById(user_id: string): Promise<User> {
    return prisma_app_client.user.findFirstOrThrow({
      where: { id: user_id },
      ...user,
    });
  }

  export async function getBasicUserByEmail(email: string): Promise<BasicUser> {
    return prisma_app_client.user.findFirstOrThrow({
      where: { email: email },
      ...basicUser,
    });
  }

  export async function getUserByEmail(email: string): Promise<User> {
    return prisma_app_client.user.findFirstOrThrow({
      where: { email: email },
      ...user,
    });
  }
  export async function getBasicUserByAuthId(
    auth_id: string,
  ): Promise<BasicUser> {
    return prisma_app_client.user.findFirstOrThrow({
      where: { auth_id: auth_id },
      ...basicUser,
    });
  }

  export async function getUserByAuthId(auth_id: string): Promise<User> {
    return prisma_app_client.user.findFirstOrThrow({
      where: { auth_id: auth_id },
      ...user,
    });
  }

  export async function updateBasicUser(
    user_id: string,
    data: Partial<BasicUser>,
  ): Promise<BasicUser> {
    return prisma_app_client.user.update({
      where: { id: user_id },
      data: {
        ...data,
      },
      ...user,
    });
  }

  export async function createBasicUser(
    auth_id: string,
    display_name: string,
    email: string,
  ): Promise<BasicUser> {
    return prisma_app_client.user.create({
      data: {
        auth_id: auth_id,
        display_name: display_name,
        email: email,
      },
      ...basicUser,
    });
  }

  export async function deleteUser(user_id: string): Promise<User> {
    return prisma_app_client.user.delete({ where: { id: user_id }, ...user });
  }
  // export async function createUser(
  //   auth_id: string,
  //   display_name: string,
  //   email: string,
  //   plan_id: string,
  // ): Promise<User> {
  //   const plan = await prisma_app_client.plan.findFirstOrThrow({
  //     where: { id: plan_id },
  //   });

  //   return prisma_app_client.user.create({
  //     data: {
  //       auth_id: auth_id,
  //       display_name: display_name,
  //       email: email,
  //       membership: {
  //         create: {
  //           current_period_ends: UtilService.addDays(
  //             new Date(),
  //             plan.duration_days,
  //           ),
  //           plan_id: plan.id,
  //         },
  //       },
  //     },
  //     ...user,
  //   });
  // }
}
