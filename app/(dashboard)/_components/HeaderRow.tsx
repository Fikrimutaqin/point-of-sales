'use client';
import type { ReactNode } from "react";
import { useSidebar } from "@/shared/components/ui/sidebar";
import { cn } from "@/lib/utils";

// HeaderRow is a component that renders a row of elements with a margin left based on the sidebar state.
export function HeaderRow({ children }: { children: ReactNode }) {
  // HeaderRow is a component that renders a row of elements with a margin left based on the sidebar state.
  const { state } = useSidebar();
  const mx = state === "expanded" ? "ml-52" : "ml-24";
  return <div className={cn("flex items-center gap-2 px-4 w-full", mx)}>{children}</div>;
}
