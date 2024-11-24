import { router } from '~/server/trpc/trpc';
import { userRouter } from './user.router';
import { emailRouter } from './email.router';

export const appRouter = router({
  user: userRouter,
  email: emailRouter,
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
