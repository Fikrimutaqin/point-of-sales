'use client';

export type NavUserProfile = {
  name: string;
  email: string;
  avatar: string;
};

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem("token");
  } catch {
    return null;
  }
}

export function getStoredRawUser(): any | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getNavUserFromStorage(): NavUserProfile | null {
  const rawUser = getStoredRawUser();
  if (!rawUser) return null;
  const name: string =
    rawUser.user?.name ?? rawUser.name ?? "User";
  const email: string =
    rawUser.email ?? rawUser.user?.email ?? "user@example.com";
  // const seed = encodeURIComponent(name || email);
  const avatar =
    rawUser.avatar ??
    '';
  return { name, email, avatar };
}
