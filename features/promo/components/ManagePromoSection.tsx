"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Globe, Lock, MoreVertical, Plus, TicketPercent, XCircle } from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";
import type { ManagePromo, ManagePromoFilterKey } from "@/features/promo/types";
import { managePromos as defaultPromos } from "@/features/promo/services/data";
import ManagePromoCard from "./ManagePromoCard";

type Props = {
  promos?: ManagePromo[];
  className?: string;
};

const filters: Array<{ key: ManagePromoFilterKey; label: string; icon: ComponentType<{ className?: string }> }> = [
  { key: "all", label: "All Promo", icon: TicketPercent },
  { key: "public", label: "Public", icon: Globe },
  { key: "private", label: "Private", icon: Lock },
  { key: "expired", label: "Expired", icon: XCircle },
];

export default function ManagePromoSection({ promos = defaultPromos, className }: Props) {
  const [filter, setFilter] = useState<ManagePromoFilterKey>("all");

  const counts = useMemo(() => {
    const base: Record<ManagePromoFilterKey, number> = { all: promos.length, public: 0, private: 0, expired: 0 };
    for (const p of promos) {
      if (p.status === "expired") base.expired += 1;
      if (p.visibility === "public" && p.status !== "expired") base.public += 1;
      if (p.visibility === "private" && p.status !== "expired") base.private += 1;
    }
    return base;
  }, [promos]);

  const list = useMemo(() => {
    if (filter === "all") return promos;
    if (filter === "expired") return promos.filter((p) => p.status === "expired");
    if (filter === "public") return promos.filter((p) => p.visibility === "public" && p.status !== "expired");
    return promos.filter((p) => p.visibility === "private" && p.status !== "expired");
  }, [filter, promos]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Manage Promo</div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="h-11 rounded-2xl! px-4 font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Add Promo
          </Button>
          <Button type="button" variant="outline" size="icon" className="h-11 w-11 rounded-2xl!">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
        {filters.map((f) => {
          const active = f.key === filter;
          const Icon = f.icon;
          return (
            <Button
              key={f.key}
              type="button"
              variant="secondary"
              className={cn(
                "h-11 shrink-0 rounded-2xl! border-border px-4 font-semibold hover:bg-emerald-600",
                active ? "bg-emerald-600 text-white hover:emerald-600" : "bg-background hover:bg-muted"
              )}
              onClick={() => setFilter(f.key)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {f.label}
              <span
                className={cn(
                  "ml-2 inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-semibold",
                  active ? "bg-background text-secondary-foreground" : "bg-muted text-foreground"
                )}
              >
                {counts[f.key]}
              </span>
            </Button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ManagePromoCard key={p.id} promo={p} />
        ))}
      </div>
    </div>
  );
}
