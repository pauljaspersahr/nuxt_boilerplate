import { authClient } from "~/lib/auth/auth.client";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession(useFetch);
  const possibleRoutes = ["signin", "signup"];
  if (!session.value) {
    if (possibleRoutes.includes(to.path)) {
      return navigateTo("/");
    }
  }
});
