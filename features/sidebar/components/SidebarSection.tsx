"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Settings,
  Shell,
} from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/shared/components/ui/sidebar";
import { dataMenu } from "../services/data/menu";
import { Item } from "../types";
import { cn } from "@/lib/utils";
import { isActiveRoute } from "../utils";

// SidebarSection component
const items: Item[] = dataMenu;
// Settings item
const settings: Item = { label: "Settings", href: "/settings", icon: Settings };

export default function SidebarSection(props: React.ComponentProps<typeof Sidebar>) {
  // Get current pathname
  const pathname = usePathname() || "/";

  return (
    // Sidebar component
    <Sidebar collapsible="icon" className="bg-background" {...props}>
      <SidebarHeader className="px-3 py-4">
        <div className="flex justify-center">
          <Link
            href="/home"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-500 text-emerald-600"
          >
            <Shell className="h-7 w-7" />
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <nav className="flex flex-col items-center gap-3 py-2">
          {items.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex w-full max-w-[96px] flex-col items-center gap-1 rounded-2xl px-3 py-3 text-sm font-medium",
                  "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  active && "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white"
                )}
              >
                <Icon className={cn("h-6 w-6", active ? "text-white" : "text-muted-foreground")} />
                <span className={cn("text-xs", active ? "text-white" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-6">
        <div className="my-4 h-px w-full bg-border" />
        <div className="flex justify-center">
          {(() => {
            const Icon = settings.icon;
            const active = isActiveRoute(pathname, settings.href);
            return (
              <Link
                href={settings.href}
                className={cn(
                  "flex w-full max-w-[96px] flex-col items-center gap-1 rounded-2xl px-3 py-3 text-sm font-medium",
                  "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  active && "bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white"
                )}
              >
                <Icon className={cn("h-6 w-6", active ? "text-white" : "text-muted-foreground")} />
                <span className={cn("text-xs", active ? "text-white" : "text-muted-foreground")}>
                  {settings.label}
                </span>
              </Link>
            );
          })()}
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
