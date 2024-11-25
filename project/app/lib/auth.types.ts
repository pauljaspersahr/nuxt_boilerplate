import { authClient } from './auth.client';

export type Session = typeof authClient.$Infer.Session.session;
export type User = typeof authClient.$Infer.Session.user;
export type EmailOTPType = 'sign-in' | 'email-verification' | 'forget-password';
