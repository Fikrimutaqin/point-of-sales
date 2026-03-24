'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredToken } from "@/lib/auth-storage";

export function AuthIsLoginGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      router.replace("/home");
      return;
    }
    const t = setTimeout(() => setAllowed(true), 0);
    return () => clearTimeout(t);
  }, [router]);

  if (!allowed) return null;
  return <>{children}</>;
}
