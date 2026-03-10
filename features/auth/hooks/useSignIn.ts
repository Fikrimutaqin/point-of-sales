'use client';
import { useCallback, useEffect, useState } from "react";
import { signIn } from "@/features/auth/services/usecases";
import type { SignInInput, SignInSuccess } from "@/features/auth/types";

// Custom hook for Sign In
type Options = {
  onSuccess?: (result: SignInSuccess) => void;
};

export function useSignIn(options?: Options) {
  // State for loading and error
  const [loading, setLoading] = useState(false);
  // State for error message
  const [error, setError] = useState<string | null>(null);

  // Effect to clear error after 10 seconds
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 10000);
    return () => clearTimeout(t);
  }, [error]);

  // Callback for form submission
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      // Prevent default form submission
      e.preventDefault();
      // Create FormData from the form element
      const fd = new FormData(e.currentTarget);
      /// Validate email and password
      const payload: SignInInput = {
        email: String(fd.get("email") || ""),
        password: String(fd.get("password") || ""),
      };
      // Set loading to true and clear any previous errors
      setLoading(true);
      // Clear any previous errors
      setError(null);
      // Call signIn with the payload
      const res = await signIn(payload);
      // Set loading to false
      setLoading(false);
      
      // Handle success or error response
      if (res.ok) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        options?.onSuccess?.(res);
      } else {
        setError(res.message);
      }
    },
    // Dependencies: options
    [options]
  );
  // Return onSubmit, loading, error, and setError for external use
  return { onSubmit, loading, error, setError };
}
