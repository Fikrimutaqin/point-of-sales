'use client';
import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { getInitials } from "@/lib/name";
import type { BestSellerPeriod } from "@/features/product-best-seller/types/BestSellerPeriod";
import type { BestSellerItem } from "@/features/product-best-seller/types/BestSellerItem";
import formatIDR from "@/features/product-best-seller/utils/FormatIDR";
import type { Props } from "@/features/product-best-seller/types/Props";
import { defaultItems as defaultItemsData } from "@/features/product-best-seller/services/data/BestSellerItem";

export default function  ProductBestSellerSection({
  title = "Product Best Seller",
  period,
  onPeriodChange,
  items,
  className,
}: Props) {
  const [internalPeriod, setInternalPeriod] = useState<BestSellerPeriod>("weekly");
  const currentPeriod = period ?? internalPeriod;

  const defaultItems = useMemo<BestSellerItem[]>(
    () => [
      ...defaultItemsData,
    ],
    []
  );

  const list = items ?? defaultItems;

  const setPeriod = (p: BestSellerPeriod) => {
    if (period === undefined) setInternalPeriod(p);
    onPeriodChange?.(p);
  };

  return (
    <Card className={cn("rounded-2xl p-5", className)}>
      <div className="flex items-center gap-3">
        <div className="text-base font-semibold">{title}</div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full">
                {currentPeriod[0].toUpperCase() + currentPeriod.slice(1)}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setPeriod("daily")}>Daily</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("weekly")}>Weekly</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("monthly")}>Monthly</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[52px_1fr_84px_120px] items-center gap-2 text-sm text-muted-foreground">
        <div>No</div>
        <div>Product</div>
        <div className="text-center">Sold</div>
        <div className="text-center">Revenue</div>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {list.map((p, idx) => {
          const top = idx === 0;
          return (
            <div
              key={p.id}
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-border p-3",
                top ? "bg-emerald-600 text-white border-transparent" : "bg-background"
              )}
            >
              <div className="w-[52px] flex items-center justify-center">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                    top ? "bg-accent text-secondary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {idx + 1}
                </div>
              </div>

              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className={cn("relative h-12 w-12 overflow-hidden rounded-xl bg-muted shrink-0", top && "bg-white/20")}>
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.name}
                      fill
                      unoptimized
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : null}
                  <div className={cn("absolute inset-0 flex items-center justify-center text-sm font-semibold", top ? "text-white" : "text-emerald-700")}>
                    {getInitials(p.name)}
                  </div>
                </div>

                <div className="min-w-0">
                  <div className={cn("truncate text-base font-semibold", top ? "text-white" : "text-foreground")}>
                    {p.name}
                  </div>
                  <div className={cn("truncate text-sm", top ? "text-white/85" : "text-muted-foreground")}>
                    {p.subtitle}
                  </div>
                </div>
              </div>

              <div className={cn("w-[84px] text-right lg:pr-3 text-sm font-medium", top ? "text-white/90" : "text-muted-foreground")}>
                {p.sold}
              </div>

              <div className="w-[120px] text-right">
                {top ? (
                  <div className="ml-auto inline-flex flex-col items-end rounded-2xl bg-accent px-3 py-2 text-secondary-foreground">
                    <div className="text-sm font-semibold">{formatIDR(p.revenue)}</div>
                    <div className="text-xs">{p.sold} Sold Out</div>
                  </div>
                ) : (
                  <div className="text-sm font-semibold text-foreground">{formatIDR(p.revenue)}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
