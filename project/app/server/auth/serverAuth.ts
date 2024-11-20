import { auth } from '~/lib/auth.config';

export function serverAuth() {
  return {
    api: auth.api,
  };
}
