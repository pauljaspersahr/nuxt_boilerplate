// from:  https://github.com/atinux/nuxthub-better-auth

import { defu } from 'defu';
import { authClient } from '~/lib/auth.client';
import log from '~/lib/logger';

type MiddlewareOptions =
  | false
  | {
      /**
       * Only apply auth middleware to guest or user
       */
      only?: 'guest' | 'user';
      /**
       * Redirect authenticated user to this route
       */
      redirectUserTo?: string;
      /**
       * Redirect guest to this route
       */
      redirectGuestTo?: string;
    };

declare module '#app' {
  interface PageMeta {
    auth?: MiddlewareOptions;
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    auth?: MiddlewareOptions;
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  log.info('🔒 Auth middleware running for path:', to.path);

  if (to.path === '/') {
    log.info('🏠 Skipping auth middleware for home page');
    return;
  }

  if (to.meta?.auth === false) {
    log.info('🔓 Auth disabled for this route, skipping middleware');
    return;
  }

  const { data: session } = await authClient.useSession(useFetch);
  const loggedIn = computed(() => !!session.value);

  const { only, redirectUserTo, redirectGuestTo } = defu(to.meta?.auth);

  if (only === 'guest' && loggedIn.value) {
    log.info('🚫 Guest-only route accessed while authenticated');

    if (to.path === redirectUserTo) {
      log.info('↩️ Avoiding infinite redirect');
      return;
    }
    log.info('➡️ Redirecting authenticated user to:', redirectUserTo);
    return navigateTo(redirectUserTo);
  }

  const { publicRoutes } = useRuntimeConfig().public;

  if (!loggedIn.value && publicRoutes.includes(to.path)) {
    log.info('✅ Allowing access to public route');
    return;
  }

  if (!loggedIn.value) {
    log.info('🚫 Unauthenticated user attempting to access protected route');
    if (to.path === redirectGuestTo) {
      log.info('↩️ Avoiding infinite redirect');
      return;
    }
    log.info('➡️ Redirecting guest to:', redirectGuestTo);
    return navigateTo(redirectGuestTo);
  }

  log.info('✅ Auth check passed, continuing to route');
});
