import type { ReactNode } from "react";
import { SidebarSection } from "@/features/sidebar/components";
import { SidebarProvider, SidebarInset } from "@/shared/components/ui/sidebar";
import { AuthGuard } from "./_guard/AuthGuard";
import { DashboardHeader } from "./_components/DashboardHeader";
import DashboardFooter from "./_components/DashboardFooter";

export default function DashboardLayout(
  // Props: children (ReactNode)
  { children }: { children: ReactNode }
) {
  return (
    <SidebarProvider>
      <SidebarSection />
      <SidebarInset>
        <AuthGuard>
          <DashboardHeader />
          {/* <div className="pl-4 lg:pl-28 py-2">
            <BreadcrumbAuto/>
          </div> */}
          <div className="flex flex-1 flex-col gap-4 p-4 lg:pl-28 pt-5 mt-24">
            {children}
          </div>
          <DashboardFooter />
        </AuthGuard>
      </SidebarInset>
    </SidebarProvider>
  );
}
