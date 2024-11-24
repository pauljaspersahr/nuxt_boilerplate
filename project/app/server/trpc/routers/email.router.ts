import { z } from 'zod';
import { publicProcedure, authedProcedure, router } from '../trpc';
import { EmailService } from '~/lib/services/email.service';

export const emailRouter = router({
  sendOTP: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        otp: z.string(),
        type: z.enum(['sign-in', 'email-verification']),
      }),
    )
    .mutation(async ({ input }) => {
      return EmailService.sendOTP(input.email, input.otp, input.type);
    }),

  send: authedProcedure
    .input(
      z.object({
        to: z.array(z.string().email()),
        subject: z.string(),
        html: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return EmailService.sendEmail(input);
    }),
});
