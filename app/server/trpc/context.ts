import type { inferAsyncReturnType } from "@trpc/server";
import { H3Event } from "h3";
import { UserService } from "~/lib/services/user.service";
import { MembershipService } from "~/lib/services/membership.service";

export async function createContext(event: H3Event) {
  return {
    authUser: event.context.authUser, // user from auth provider
    user: event.context.user, // the corresponding Database User
    userService: UserService,
    membershipService: MembershipService,
    event, // required to enable setCookie in accountRouter
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
