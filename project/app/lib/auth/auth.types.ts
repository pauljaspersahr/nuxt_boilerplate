import { Prisma } from "@prisma-auth/client";

export const authUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    email: true,
    emailVerified: true,
    image: true,
    createdAt: true,
    updatedAt: true,
    Session: true,
    Account: true,
  },
});
export type AuthUser = Prisma.UserGetPayload<typeof authUser>;

export const basicAuthUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    email: true,
    emailVerified: true,
    createdAt: true,
    updatedAt: true,
    image: true,
  },
});

// hack to covert image to optional and not null to match return type of authClient.signUp.email
export type BasicAuthUser = ConvertNullToUndefined<
  Omit<Prisma.UserGetPayload<typeof basicAuthUser>, "image"> & {
    image?: string;
  }
>;

type NullToUndefined<T> = T extends null ? undefined : T;
type ConvertNullToUndefined<T> = {
  [K in keyof T]: T[K] extends string | null ? NullToUndefined<T[K]> : T[K];
};
