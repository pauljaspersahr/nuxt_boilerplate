import { authClient } from "~/lib/auth/auth.client";

export async function credentialSignUp(
  email: string,
  password: string,
  name: string
) {
  return authClient.signUp.email({ email, password, name });
}

export async function forgotPassword(email: string, redirectTo: string) {
  return authClient.forgetPassword({ email: email, redirectTo: redirectTo });
}
