/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC } from "@trpc/server";
import { Context } from "~/server/trpc/context";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  // recreates Data/Map/Set field after API serialization
  // https://trpc.io/docs/server/data-transformers
  transformer: superjson,
});

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;
export const router = t.router;
export const middleware = t.middleware;