'use client';
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { buildBreadcrumbs } from "@/lib/breadcrumbs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/components/ui/breadcrumb";

export function BreadcrumbAuto() {
  // Breadcrumb Auto
  const pathname = usePathname() || "/";
  // Build Breadcrumbs
  const items = buildBreadcrumbs(pathname);
  // If no breadcrumbs, return null
  if (items.length === 0) return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Map through breadcrumbs */}
        {items.map((c, idx) => (
          <Fragment key={c.href}>
            <BreadcrumbItem className={idx === 0 ? "hidden md:block" : undefined}>
              {c.active ? (
                <BreadcrumbPage className="uppercase">{c.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={c.href}>{c.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {idx < items.length - 1 ? (
              <BreadcrumbSeparator className="hidden md:block" />
            ) : null}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
