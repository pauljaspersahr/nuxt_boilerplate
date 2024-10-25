import type { inferAsyncReturnType } from "@trpc/server";
import { H3Event } from "h3";

export async function createContext(event: H3Event) {
  return {
    authUser: event.context.authUser, // user from auth provider
    user: event.context.ser, // the corresponding Database User
    event, // required to enable setCookie in accountRouter
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
