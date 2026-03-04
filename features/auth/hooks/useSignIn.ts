'use client';
import { useCallback, useState } from "react";
import { signIn } from "@/features/auth/services/usecases";
import type { SignInInput, SignInSuccess } from "@/features/auth/types";

type Options = {
  onSuccess?: (result: SignInSuccess) => void;
};

export function useSignIn(options?: Options) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const payload: SignInInput = {
        email: String(fd.get("email") || ""),
        password: String(fd.get("password") || ""),
      };
      console.log("submit payload", payload);
      setLoading(true);
      setError(null);
      const res = await signIn(payload);
      setLoading(false);
      if (res.ok) {
        options?.onSuccess?.(res);
        console.log("submit success", res);
      } else {
        setError(res.message);
      }
    },
    [options]
  );

  return { onSubmit, loading, error, setError };
}
