import { defineEventHandler, parseCookies, setCookie, getCookie } from 'h3';
import { UserService } from '~/lib/services/user.service';
import type { BasicUser } from '~/lib/services/service.types';
import type { User as AuthUser } from '~/server/auth/auth.types';
import { serverAuth } from '../auth/serverAuth';

// Explicitly type our context by 'Merging' our custom types with the H3EventContext (https://stackoverflow.com/a/76349232/95242)
declare module 'h3' {
  interface H3EventContext {
    authUser?: AuthUser;
    user?: BasicUser;
  }
}

export default defineEventHandler(async (event) => {
  if (
    // !(event.path.startsWith('/api/trpc') || event.path.startsWith('/api/my/outher/route'))
    !event.path.startsWith('/api/trpc')
  ) {
    return; // only apply middleware to working routes
  }
  const cookies = parseCookies(event);
  if (cookies) {
    const auth = serverAuth();
    const session = await auth.api.getSession({ headers: event.headers });

    const authUser = session?.user;

    if (authUser) {
      event.context.authUser = authUser;

      let user;
      try {
        user = await UserService.getBasicUserByAuthId(authUser.id);
      } catch (error) {
        console.error('Error retrieving user:', error);
        user = null; // Set user to null if an error occurs
      }

      if (!user) {
        user = await UserService.createBasicUser(
          authUser.id,
          authUser.name || 'no name supplied',
          authUser.email || 'no@email.supplied',
        );
        console.log(`\n Created DB User \n ${JSON.stringify(user)}\n`);
      }
      event.context.user = user;
    }
  }
});
