'use client';
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { applyTheme, resolveInitialTheme, storeTheme, ThemeMode } from "@/lib/theme";

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    // Get stored theme from local storage
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("theme") : null;
    // Get initial theme from document class list 
    const init = resolveInitialTheme();
    // Set initial theme
    setMode(init);
    // Apply initial theme
    applyTheme(init);
    // If no stored theme, apply default theme
    if (!stored && typeof window !== "undefined" && window.matchMedia) {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        const next: ThemeMode = e.matches ? "dark" : "light";
        setMode(next);
        applyTheme(next);
      };
      // Add event listener to media query list
      try {
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
      } catch {
        mql.addListener(handler);
        return () => mql.removeListener(handler);
      }
    }
  }, []);

  // Toggle theme
  const toggle = () => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(next);
    applyTheme(next);
    storeTheme(next);
  };

  // Render theme toggle button
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggle}
    >
      {/* Render icon based on current theme mode */}
      {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
