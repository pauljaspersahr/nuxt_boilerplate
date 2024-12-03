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

  // Skip middleware for the home page `/`
  if (to.path === '/') {
    log.info('🏠 Skipping auth middleware for home page');
    return;
  }

  // If auth is disabled, skip middleware
  if (to.meta?.auth === false) {
    log.info('🔓 Auth disabled for this route, skipping middleware');
    return;
  }

  const { data: session } = await authClient.useSession(useFetch);
  const loggedIn = computed(() => !!session.value);

  const { only, redirectUserTo, redirectGuestTo } = defu(to.meta?.auth);

  // If guest mode, redirect if authenticated
  if (only === 'guest' && loggedIn.value) {
    // Avoid infinite redirect
    log.info('🚫 Guest-only route accessed while authenticated');

    if (to.path === redirectUserTo) {
      log.info('↩️ Avoiding infinite redirect');
      return;
    }
    log.info('➡️ Redirecting authenticated user to:', redirectUserTo);
    return navigateTo(redirectUserTo);
  }

  const { publicRoutes } = useRuntimeConfig().public;

  // Allow public routes for unauthenticated users
  if (!loggedIn.value && publicRoutes.includes(to.path)) {
    log.info('✅ Allowing access to public route');
    return;
  }

  // If not authenticated, redirect to home
  if (!loggedIn.value) {
    log.info('🚫 Unauthenticated user attempting to access protected route');
    // Avoid infinite redirect
    if (to.path === redirectGuestTo) {
      log.info('↩️ Avoiding infinite redirect');
      return;
    }
    log.info('➡️ Redirecting guest to:', redirectGuestTo);
    return navigateTo(redirectGuestTo);
  }

  log.info('✅ Auth check passed, continuing to route');
});
