'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken } from "@/lib/auth-storage";

export function AuthIsLoginGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = getStoredToken();

  useEffect(() => {
    if (token) {
      router.replace("/home");
    }
  }, [router, token]);

  if (token) return null;
  return <>{children}</>;
}
