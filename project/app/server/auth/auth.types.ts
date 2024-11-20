import { auth } from '~/lib/auth.config';

type Session = typeof auth.$Infer.Session.session;
type User = typeof auth.$Infer.Session.user;

export type { Session, User };
