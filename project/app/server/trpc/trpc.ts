/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import { USER_STATUS, PLAN_TIER } from '~/prisma/Enums';
import superjson from 'superjson';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  // errorFormatter: (opts) => {
  //   const { shape, error } = opts;
  //   if (!(error.cause instanceof AccountLimitError)) {
  //     return shape;
  //   }
  //   return {
  //     ...shape,
  //     data: {
  //       ...shape.data,
  //       httpStatus: 401,
  //       code: "UNAUTHORIZED",
  //     },
  //   };
  // },
});

/**
 * Base Procedures with Inline Middleware
 */
export const publicProcedure = t.procedure;

// Authenticated users only
export const authedProcedure = publicProcedure.use(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  // Pass down ctx with user defined
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

// Active members only
export const memberProcedure = authedProcedure.use(({ next, ctx }) => {
  if (USER_STATUS.ACTIVE !== ctx.user.status) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: `User status: ${ctx.user.status}`,
    });
  }
  return next({ ctx });
});

export const router = t.router;
export const middleware = t.middleware;
