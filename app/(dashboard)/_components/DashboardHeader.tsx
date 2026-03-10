'use client';

import { useEffect, useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { getInitials } from "@/lib/name";
import { getStoredRawUser } from "@/lib/auth-storage";
import { formatHeaderDate } from "@/lib/date-format";
import type { HeaderUser } from "@/features/sidebar/types";

export function DashboardHeader() {
  // State for user information
  const [user, setUser] = useState<HeaderUser>({
    name: "Guest",
    email: "guest@example.com",
    avatar: "",
    role: "UNKNOWN",
  });

  useEffect(() => {
    // Get user from storage
    const raw = getStoredRawUser();
    // If no user found, return
    if (!raw) return;
    // Set user state
    setUser({
      name: raw.user?.name ?? raw.name ?? "User",
      email: raw.email ?? raw.user?.email ?? "user@example.com",
      avatar: raw.avatar ?? "",
      role: raw.role === "ADMIN" || raw.role === "USER" ? raw.role : "UNKNOWN",
    });
  }, []);


  // Get today's date
  const today = useMemo(() => new Date(), []);
  const dateText = useMemo(() => formatHeaderDate(today, "en-US"), [today]);

  // Get role label
  const roleLabel = user.role === "ADMIN" ? "Admin" : "Cashier";
  const notificationCount = 2;

  return (
    <header className="flex w-full items-center gap-4 border-b border-border bg-background px-4 lg:pl-28 py-4">
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold">
          Hi, {user.name}, here's today's orders!
        </p>
        <p className="text-sm text-muted-foreground">{dateText}</p>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
              {notificationCount}
            </span>
          ) : null}
        </button>

        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 rounded-full">
            <AvatarImage src={user.avatar || undefined} alt={user.name} />
            <AvatarFallback className="rounded-full">
              {getInitials(user.name || user.email)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="truncate text-xs text-muted-foreground">Hi, I'm a {roleLabel}</span>
            <span className="truncate text-sm font-semibold">{user.name}</span>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
