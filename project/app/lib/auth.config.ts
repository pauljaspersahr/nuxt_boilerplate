import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma-auth/client';
import { getRequestURL } from 'h3';

const prisma_auth_client = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma_auth_client, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: getBaseURL(),
});

function getBaseURL() {
  let baseURL = process.env.BETTER_AUTH_URL;
  if (!baseURL) {
    try {
      baseURL = getRequestURL(useEvent()).origin;
    } catch (e) {}
  }
  return baseURL;
}
