"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { CalendarDays, Search } from "lucide-react";
import type { OrderFilterKey } from "@/features/order/types";

type FilterCounts = Partial<Record<OrderFilterKey, number>>;

type Props = {
  value: OrderFilterKey;
  counts: FilterCounts;
  onChange: (next: OrderFilterKey) => void;
  onSearchClick?: () => void;
  dateLabel?: string;
  onDateClick?: () => void;
  className?: string;
};

const filters: Array<{ key: OrderFilterKey; label: string }> = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "cooking", label: "Cooking" },
  { key: "ready", label: "Ready" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function OrderFilterBar({
  value,
  counts,
  onChange,
  onSearchClick,
  dateLabel = "Today",
  onDateClick,
  className,
}: Props) {
  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1">
        {filters.map((f) => {
          const active = f.key === value;
          const count = counts[f.key] ?? 0;
          return (
            <Button
              key={f.key}
              type="button"
              variant="outline"
              className={cn(
                "h-11 shrink-0 rounded-2xl! border-border px-4 text-sm font-semibold",
                active
                  ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
                  : "bg-background hover:bg-muted"
              )}
              onClick={() => onChange(f.key)}
            >
              <span>{f.label}</span>
              <span
                className={cn(
                  "ml-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-semibold",
                  active ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                )}
              >
                {count}
              </span>
            </Button>
          );
        })}
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-11 w-11 rounded-2xl!"
          onClick={onSearchClick}
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-2xl! px-4 font-semibold"
          onClick={onDateClick}
        >
          <CalendarDays className="mr-2 h-5 w-5 text-emerald-600" />
          {dateLabel}
        </Button>
      </div>
    </div>
  );
}

