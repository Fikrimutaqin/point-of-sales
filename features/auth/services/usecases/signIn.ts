import { isValidEmail } from "@/lib/validation";
export type SignInInput = { email: string; password: string };
export type AuthUser = { id: string; name: string; email: string };
export type SignInSuccess = { ok: true; user: AuthUser; token: string };
export type SignInError = { ok: false; code: "INVALID_INPUT" | "UNAUTHORIZED"; message: string };

const USERS: Array<AuthUser & { password: string }> = [
  { id: "1", name: "Demo User", email: "user@example.com", password: "password123" },
  { id: "2", name: "Admin", email: "admin@example.com", password: "admin123" },
];

function makeToken(payload: string) {
  const base = `${payload}:${Date.now()}`;
  if (typeof Buffer !== "undefined") return Buffer.from(base).toString("base64");
  return btoa(base);
}

export async function signIn(input: SignInInput): Promise<SignInSuccess | SignInError> {
  const email = input.email?.trim().toLowerCase();
  const password = input.password ?? "";
  if (!email || !password || !isValidEmail(email)) {
    return { ok: false, code: "INVALID_INPUT", message: "Email atau password tidak valid" };
  }
  const found = USERS.find((u) => u.email.toLowerCase() === email && u.password === password);
  if (!found) {
    return { ok: false, code: "UNAUTHORIZED", message: "Email atau password salah" };
  }
  const { password: _pw, ...user } = found;
  const token = makeToken(user.email);
  return { ok: true, user, token };
}
