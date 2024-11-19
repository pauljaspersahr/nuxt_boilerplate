import { auth } from './auth.config';

export function serverAuth() {
  return {
    api: auth.api,
  };
}
