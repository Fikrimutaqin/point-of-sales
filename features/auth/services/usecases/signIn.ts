import { isValidEmail } from "@/lib/validation";
// SignInUseCase: Use case for user sign-in
export type SignInInput = { email: string; password: string };
// SignInSuccess: Successful sign-in response
export type AuthUser = { id: string; email: string, user: User, role: Role };
// SignInSuccess: Successful sign-in response
export type SignInSuccess = { ok: true; user: AuthUser; token: string };
// User: User object with password
export type User = {id: string; name: string; address: string };
// Role: User role
export type Role = "USER" | "ADMIN";
// SignInError: Error response for sign-in
export type SignInError = { ok: false; code: "INVALID_INPUT" | "UNAUTHORIZED"; message: string };

// USERS: Mock user database for demonstration purposes
const USERS: Array<AuthUser & { password: string }> = [
  { 
    id: "1", 
    email: "user@example.com", 
    password: "password123",
    user: { 
      id: "1", 
      name: "Demo User", 
      address: "123 Main St" 
    },
    role: "USER",
  },
  { 
    id: "2", 
    email: "admin@example.com", 
    password: "admin123",
    user: { 
      id: "2", 
      name: "Admin", 
      address: "456 Admin St" 
    },
    role: "ADMIN",
  },
];

// makeToken: Generate a base64-encoded token from a payload string
function makeToken(payload: string) {
  const base = `${payload}:${Date.now()}`;
  if (typeof Buffer !== "undefined") return Buffer.from(base).toString("base64");
  return btoa(base);
}
// signIn: Sign-in use case implementation
export async function signIn(input: SignInInput): Promise<SignInSuccess | SignInError> {
  // Validate input
  const email = input.email?.trim().toLowerCase();
  // Validate password
  const password = input.password ?? "";
  // Validate email and password
  if (!email || !password || !isValidEmail(email)) {
    return { ok: false, code: "INVALID_INPUT", message: "Email atau password tidak valid" };
  }
  // Find user by email and password
  const found = USERS.find((u) => u.email.toLowerCase() === email && u.password === password);
  // Check if user exists
  if (!found) {
    return { ok: false, code: "UNAUTHORIZED", message: "Email atau password salah" };
  }
  // Remove password from user object
  const { password: _pw, ...user } = found;
  // Generate token for user
  const token = makeToken(user.email);
  // Return success response
  return { ok: true, user, token };
}
