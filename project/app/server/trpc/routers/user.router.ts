import { UserService } from "~~/lib/services/user.service";

import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  getUser: publicProcedure.query(({ ctx }) => {
    return { user: ctx.user };
  }),
});
