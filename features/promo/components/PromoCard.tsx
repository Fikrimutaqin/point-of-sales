"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown, TrendingUp } from "lucide-react";
import type { PromoBadgeVariant, PromoListItem, PromoQuantityItem } from "@/features/promo/types";

const badgeClass: Record<PromoBadgeVariant, string> = {
  public: "bg-emerald-50 text-emerald-700",
  expired: "bg-red-50 text-red-700",
};

export function PromoListCard({
  title,
  items,
  className,
}: {
  title: string;
  items: PromoListItem[];
  className?: string;
}) {
  return (
    <Card className={cn("rounded-2xl border-border bg-background", className)}>
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-base font-semibold">{title}</div>
      </div>
      <div className="border-t border-border" />
      <div className="px-5 py-4">
        <div className="space-y-4">
          {items.map((it) => (
            <div key={it.id} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">{it.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{it.channelLabel}</div>
                <div className="mt-1 text-xs text-muted-foreground">{it.expiredAtLabel}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-sm font-semibold text-foreground">{it.audience}</div>
                <div
                  className={cn(
                    "ml-auto mt-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                    badgeClass[it.badge.variant]
                  )}
                >
                  {it.badge.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function PromoQuantityCard({
  title,
  updatedLabel = "Updated Today",
  items,
  className,
  onSeeDetails,
}: {
  title: string;
  updatedLabel?: string;
  items: PromoQuantityItem[];
  className?: string;
  onSeeDetails?: () => void;
}) {
  return (
    <Card className={cn("rounded-2xl border-border bg-background", className)}>
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-base font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{updatedLabel}</div>
      </div>
      <div className="border-t border-border" />
      <div className="px-5 py-4">
        <div className="space-y-4">
          {items.map((it) => {
            const sign = it.salesDelta >= 0 ? "+" : "";
            return (
              <div key={it.id} className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{it.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{it.expiredAtLabel}</div>
                </div>
                <div className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <TrendingUp className="h-4 w-4" />
                  <span>
                    {sign}
                    {it.salesDelta} Sales
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-border" />
      <div className="px-5 py-3">
        <Button
          type="button"
          variant="ghost"
          className="w-full justify-center rounded-2xl font-semibold text-muted-foreground hover:text-foreground"
          onClick={onSeeDetails}
        >
          See Details
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

