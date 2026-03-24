'use client';
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  Clock,
  CookingPot,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

export type OrderStatusVariant = "new" | "cooking" | "ready" | "default";

export type OrderCardItem = {
  name: string;
  price: number;
  quantity?: number;
};

export type OrderCardProps = {
  customerName: string;
  orderNumber: string;
  itemsCount: number;
  locationLabel: string;
  locationIcon?: "table" | "takeaway" | "custom";
  createdAtLabel?: string;
  items?: OrderCardItem[];
  total?: number;
  seeMoreHref?: string;
  maxItemsShown?: number;
  formatPrice?: (value: number) => string;
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
  locationIcon = "table",
  createdAtLabel,
  items,
  total,
  seeMoreHref,
  maxItemsShown = 2,
  formatPrice,
  status,
  className,
}: OrderCardProps) {
  const variant: OrderStatusVariant = status.variant ?? "default";
  const safeFormatPrice =
    formatPrice ??
    ((value: number) =>
      new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value));
  const derivedItemsCount = items?.length ?? itemsCount;
  const derivedTotal =
    total ??
    (items
      ? items.reduce((acc, it) => acc + it.price * (it.quantity ?? 1), 0)
      : undefined);
  const shownItems = items ? items.slice(0, maxItemsShown) : [];
  const hasMore = items ? items.length > maxItemsShown : false;
  const pill = (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
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

      <div className="mt-2 flex flex-col gap-2 text-sm text-muted-foreground">
        {createdAtLabel ? (
          <div className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{createdAtLabel}</span>
          </div>
        ) : null}
        <div className="inline-flex items-center gap-2">
          {locationIcon === "takeaway" ? (
            <ShoppingBag className="h-4 w-4" />
          ) : (
            <UtensilsCrossed className="h-4 w-4" />
          )}
          <span>{locationLabel}</span>
        </div>
      </div>

      {items && items.length > 0 ? (
        <>
          <div className="my-3 border-t border-dashed border-border" />
          <div className="flex items-center justify-between text-sm">
            <div className="font-semibold text-foreground">Order ({derivedItemsCount})</div>
            {derivedTotal !== undefined ? (
              <div className="font-semibold text-emerald-600">{safeFormatPrice(derivedTotal)}</div>
            ) : null}
          </div>

          <div className="mt-2 space-y-1.5 text-sm">
            {shownItems.map((it) => (
              <div key={`${it.name}-${it.price}`} className="flex items-center justify-between gap-3">
                <div className="min-w-0 truncate text-muted-foreground">
                  {(it.quantity ?? 1)}x {it.name}
                </div>
                <div className="shrink-0 font-medium text-foreground">
                  {safeFormatPrice(it.price)}
                </div>
              </div>
            ))}
            {seeMoreHref || hasMore ? (
              <div className="pt-1">
                <Link
                  href={seeMoreHref ?? "/pos"}
                  className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
                >
                  See more <span aria-hidden="true">›</span>
                </Link>
              </div>
            ) : null}
          </div>
        </>
      ) : null}

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
