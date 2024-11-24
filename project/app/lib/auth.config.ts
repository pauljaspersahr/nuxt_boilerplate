import { betterAuth } from 'better-auth';
// import { emailOTP } from 'better-auth/plugins';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma-auth/client';
import { getRequestURL } from 'h3';
// import { EmailService } from '~/lib/services/email.service';

const prisma_auth_client = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma_auth_client, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  // plugins: [
  //   emailOTP({
  //     async sendVerificationOTP({ email, otp, type }) {
  //       await EmailService.sendOTP(email, otp, type);
  //       // console.log('Sending OTP to', email, 'with OTP', otp, 'and type', type);
  //     },
  //     otpLength: 5,
  //     expiresIn: 5 * 60,
  //   }),
  // ],
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
