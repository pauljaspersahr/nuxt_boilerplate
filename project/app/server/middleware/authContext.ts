import { defineEventHandler, parseCookies } from 'h3';
import { UserService } from '~/lib/services/user.service';
import {
  type BasicUser,
  PrismaClientKnownRequestError,
} from '~/lib/services/service.types';
import type { User as AuthUser } from '~/server/auth/auth.types';
import log from '~/lib/logger';
import { serverAuth } from '~/server/auth/serverAuth';

// Explicitly type our context by 'Merging' our custom types with the H3EventContext (https://stackoverflow.com/a/76349232/95242)
declare module 'h3' {
  interface H3EventContext {
    authUser?: AuthUser;
    user?: BasicUser;
  }
}

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith('/api/trpc')) {
    return; // Only apply middleware to relevant routes
  }

  const cookies = parseCookies(event);
  if (cookies) {
    const auth = serverAuth();

    let session;
    try {
      session = await auth.api.getSession({ headers: event.headers });
    } catch (sessionError) {
      log.error('Failed to retrieve session:', sessionError);
      return;
    }

    const authUser = session?.user;

    if (authUser) {
      let user: BasicUser | null = null;

      try {
        user = await UserService.getBasicUserByAuthId(authUser.id);
      } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
          try {
            user = await UserService.createBasicUser(
              authUser.id,
              authUser.name,
              authUser.email,
            );
            log.info(`Created new user in DB: ${JSON.stringify(user)}`);
          } catch (createError) {
            log.error('Failed to create a new user:', createError);
            return;
          }
        } else {
          log.error(
            'An unexpected error occurred while fetching the user:',
            err,
          );
          return;
        }
      }

      if (user) {
        event.context.authUser = authUser;
        event.context.user = user;
      }
    }
  }
});
