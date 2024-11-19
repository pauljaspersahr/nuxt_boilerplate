import { createAuthClient } from 'better-auth/vue';

const url = useRequestURL();
const headers = import.meta.server ? useRequestHeaders() : undefined;

export const authClient = createAuthClient({
  baseURL: url.origin,
  fetchOptions: {
    headers,
  },
});
