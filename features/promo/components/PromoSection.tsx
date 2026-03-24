"use client";

import { cn } from "@/lib/utils";
import { PromoListCard, PromoQuantityCard } from "./PromoCard";
import { promoExpiredItems, promoProgressItems, promoQuantityItems } from "@/features/promo/services/data";

export default function PromoSection({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 lg:grid-cols-3", className)}>
      <PromoListCard title="Promo Progress" items={promoProgressItems} />
      <PromoListCard title="Promo Expired" items={promoExpiredItems} />
      <PromoQuantityCard title="Quantity Promo" items={promoQuantityItems} />
    </div>
  );
}
