import type { ReactNode } from "react";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";
import { SidebarSection } from "@/features/sidebar/components";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/shared/components/ui/breadcrumb";
import { HeaderRow } from "./_components/HeaderRow";

export default function DashboardLayout(
  // Props: children (ReactNode)
  { children }: { children: ReactNode }
) {
  return (
    <SidebarProvider>
      <SidebarSection />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b border-border">
          <HeaderRow>
            <SidebarTrigger/>
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
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
