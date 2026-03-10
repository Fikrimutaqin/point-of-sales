'use client';
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  CookingPot,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

export type OrderStatusVariant = "new" | "cooking" | "ready" | "default";

export type OrderCardProps = {
  customerName: string;
  orderNumber: string;
  itemsCount: number;
  locationLabel: string;
  locationIcon?: "table" | "takeaway" | "custom";
  status: {
    label: string;
    variant?: OrderStatusVariant;
    href?: string;
  };
  className?: string;
};

const statusClass: Record<OrderStatusVariant, string> = {
  new: "border border-purple-200 bg-purple-50 text-purple-700",
  cooking: "bg-orange-50 text-orange-700",
  ready: "bg-sky-50 text-sky-700",
  default: "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]",
};

function StatusIcon({ variant }: { variant: OrderStatusVariant }) {
  switch (variant) {
    case "new":
      return <Sparkles className="h-4 w-4" />;
    case "cooking":
      return <CookingPot className="h-4 w-4" />;
    case "ready":
      return <UtensilsCrossed className="h-4 w-4" />;
    default:
      return <ClipboardList className="h-4 w-4" />;
  }
}

export function OrderCard({
  customerName,
  orderNumber,
  itemsCount,
  locationLabel,
  status,
  className,
}: OrderCardProps) {
  const variant: OrderStatusVariant = status.variant ?? "default";
  const pill = (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
        statusClass[variant]
      )}
    >
      <StatusIcon variant={variant} />
      {status.label}
    </span>
  );

  return (
    <div
      className={cn(
        "w-full max-w-[320px] rounded-2xl border border-border bg-background p-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-base font-semibold">{customerName}</div>
        </div>
        <div className="shrink-0 text-sm font-medium text-muted-foreground">{orderNumber}</div>
      </div>

      <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <ClipboardList className="h-4 w-4" />
          {itemsCount} {itemsCount === 1 ? "Item" : "Items"}
        </span>
        <span className="text-muted-foreground/40">•</span>
        <span className="inline-flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4" />
          {locationLabel}
        </span>
      </div>

      <div className="mt-4">
        {status.href ? (
          <Link href={status.href} className="inline-flex">
            {pill}
          </Link>
        ) : (
          pill
        )}
      </div>
    </div>
  );
}
