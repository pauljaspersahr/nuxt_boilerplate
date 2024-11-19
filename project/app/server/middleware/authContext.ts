import { defineEventHandler, parseCookies, setCookie, getCookie } from 'h3';
import { UserService } from '~/lib/services/user.service';

import type { BasicUser, User } from '~~/lib/services/service.types';

// TODO: use real auth user file
type AuthUser = {};

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
  if (cookies && cookies['sb-access-token']) {
    // TODO: add real auth user
    // get user from auth service
    // const user = await serverSupabaseUser(event);
    const authUser = {
      id: '1',
      email: 'test@mail.com',
      user_metadata: { full_name: 'Test User' },
    };

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
          authUser.user_metadata.full_name || 'no name supplied',
          authUser.email || 'no@email.supplied',
        );
        console.log(`\n Created DB User \n ${JSON.stringify(user)}\n`);
      }
    }
  }
});
