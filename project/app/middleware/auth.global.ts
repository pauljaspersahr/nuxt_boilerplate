// from:  https://github.com/atinux/nuxthub-better-auth

import { defu } from 'defu';

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
  console.log('🔒 Auth middleware running for path:', to.path);

  // If auth is disabled, skip middleware
  if (to.meta?.auth === false) {
    console.log('🔓 Auth disabled for this route, skipping middleware');
    return;
  }

  const { loggedIn, options, fetchSession } = useAuth();
  const { only, redirectUserTo, redirectGuestTo } = defu(
    to.meta?.auth,
    options,
  );

  console.log('👤 Auth state:', {
    loggedIn: loggedIn.value,
    only,
    redirectUserTo,
    redirectGuestTo,
  });

  // If guest mode, redirect if authenticated
  if (only === 'guest' && loggedIn.value) {
    // Avoid infinite redirect
    console.log('🚫 Guest-only route accessed while authenticated');

    if (to.path === redirectUserTo) {
      console.log('↩️ Avoiding infinite redirect');
      return;
    }
    console.log('➡️ Redirecting authenticated user to:', redirectUserTo);
    return navigateTo(redirectUserTo);
  }

  // If client-side, fetch session between each navigation
  if (import.meta.client) {
    console.log('🔄 Fetching session on client-side navigation');
    await fetchSession();
  }

  const { publicRoutes } = useRuntimeConfig().public;
  // Allow public routes for unauthenticated users
  if (!loggedIn.value && publicRoutes.includes(to.path)) {
    console.log('✅ Allowing access to public route');
    return;
  }

  // If not authenticated, redirect to home
  if (!loggedIn.value) {
    console.log('🚫 Unauthenticated user attempting to access protected route');
    // Avoid infinite redirect
    if (to.path === redirectGuestTo) {
      console.log('↩️ Avoiding infinite redirect');
      return;
    }
    console.log('➡️ Redirecting guest to:', redirectGuestTo);
    return navigateTo(redirectGuestTo);
  }

  console.log('✅ Auth check passed, continuing to route');
});
