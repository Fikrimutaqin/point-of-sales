"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/shared/components/ui/card";
import type { ManagePromo } from "@/features/promo/types";

type Props = {
  promo: ManagePromo;
  className?: string;
};

const visibilityChip: Record<ManagePromo["visibility"], string> = {
  public: "bg-black/25 text-white",
  private: "bg-black/25 text-white",
};

function getCardTone(promo: ManagePromo) {
  if (promo.status === "expired") return "bg-red-700";
  if (promo.visibility === "private") return "bg-slate-700";
  return "bg-emerald-600";
}

export default function ManagePromoCard({ promo, className }: Props) {
  return (
    <Card className={cn("rounded-2xl! overflow-hidden shadow-none! border-0!", className)}>
      <div className={cn("p-7 text-white", getCardTone(promo))}>
        <div className="inline-flex items-center rounded-full bg-black/25 px-3 py-1 text-xs font-semibold">
          {promo.channel.label}
        </div>

        <div className="mt-4 text-xl font-semibold">{promo.title}</div>
        <div className="mt-1 text-sm text-white/85">{promo.description}</div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className={cn("bg-background relative h-6 w-5 top-0 left-[-30px] rounded-r-2xl")}></div>
          <div className={cn("bg-background relative h-6 w-5 top-0 right-[-30px] rounded-l-2xl")}></div>
        </div>

        <div className="mt-4 border-t border-white/25" />
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="text-sm font-medium text-white/90">{promo.validUntilLabel}</div>
          <div
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
              visibilityChip[promo.visibility]
            )}
          >
            {promo.status === "expired" ? "Expired" : promo.visibility === "public" ? "Public" : "Private"}
          </div>
        </div>
      </div>
    </Card>
  );
}
