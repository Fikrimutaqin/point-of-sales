import type { ReactNode } from "react";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { SidebarSection } from "@/features/sidebar/components";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Separator } from "@/shared/components/ui/separator";
import { BreadcrumbAuto } from "./_components/BreadcrumbAuto";
import { HeaderRow } from "./_components/HeaderRow";

export default function DashboardLayout(
  // Props: children (ReactNode)
  { children }: { children: ReactNode }
) {
  return (
    <SidebarProvider>
      <SidebarSection />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border">
          <HeaderRow>
            <SidebarTrigger />
            <Separator orientation="vertical" className="mx-2 h-14!" />
            <BreadcrumbAuto />
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </HeaderRow>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
