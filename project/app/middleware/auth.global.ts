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

const defaultAuthConfig: MiddlewareOptions = {
  only: 'user',
  redirectGuestTo: '/',
  redirectUserTo: '/dashboard',
};

export default defineNuxtRouteMiddleware(async (to) => {
  log.info('🔒 Auth middleware running for path:', to.path);

  // Skip auth check for public routes
  const { publicRoutes } = useRuntimeConfig().public;
  if (publicRoutes.includes(to.path)) {
    log.info('✅ Allowing access to public route');
    return;
  }

  // Explicitly disabled auth
  if (to.meta?.auth === false) {
    log.info('🔓 Auth disabled for this route, skipping middleware');
    return;
  }

  const { data: session } = await authClient.useSession(useFetch);
  const loggedIn = computed(() => !!session.value);

  // Merge route's auth config with defaults
  const authConfig = defu(to.meta?.auth || {}, defaultAuthConfig);
  const { only, redirectUserTo, redirectGuestTo } = authConfig;

  if (only === 'guest' && loggedIn.value) {
    log.info('🚫 Guest-only route accessed while authenticated');

    if (to.path === redirectUserTo) {
      log.info('↩️ Avoiding infinite redirect');
      return;
    }
    log.info('➡️ Redirecting authenticated user to:', redirectUserTo);
    return navigateTo(redirectUserTo);
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
