import { UserService } from '~/lib/services/user.service';

import { authedProcedure, publicProcedure, router } from '../trpc';
import { z } from 'zod';

export const userRouter = router({
  getBasicUser: publicProcedure.query(({ ctx }) => {
    return { user: ctx.user };
  }),
  getUser: authedProcedure.query(async ({ ctx }) => {
    return await UserService.getUserById(ctx.user?.id);
  }),
  getBasicUserByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      return await UserService.getBasicUserByEmail(input.email);
    }),
  isUserByEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      try {
        await UserService.getBasicUserByEmail(input.email);
        return true;
      } catch (err) {
        return false;
      }
    }),
});
