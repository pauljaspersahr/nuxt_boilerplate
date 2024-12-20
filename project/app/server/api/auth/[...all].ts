import { auth } from '~/lib/auth.config';

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
