import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma-auth/client";

const prisma_auth_client = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma_auth_client, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});
