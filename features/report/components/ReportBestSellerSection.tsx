"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/shared/components/ui/card";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";
import { defaultItems as defaultItemsData } from "@/features/product-best-seller/services/data/BestSellerItem";
import type { BestSellerItem } from "@/features/product-best-seller/types";
import formatIDR from "@/features/product-best-seller/utils/FormatIDR";

type BestSellerRow = {
  id: string;
  rank: number;
  product: string;
  category: string;
  sold: number;
  revenue: string;
};

export default function ReportBestSellerSection({ className }: { className?: string }) {
  const items = useMemo<BestSellerItem[]>(() => [...defaultItemsData].sort((a, b) => b.sold - a.sold), []);
  const maxSold = useMemo(() => items.reduce((acc, it) => Math.max(acc, it.sold), 0), [items]);

  const rows = useMemo<BestSellerRow[]>(
    () =>
      items.map((it, idx) => ({
        id: it.id,
        rank: idx + 1,
        product: it.name,
        category: it.subtitle,
        sold: it.sold,
        revenue: formatIDR(it.revenue),
      })),
    [items]
  );

  const top = rows[0];

  const columns: DataTableColumn<BestSellerRow>[] = [
    { id: "rank", header: "#", cell: (r) => r.rank, headerClassName: "w-[60px]" },
    { id: "product", header: "Product", cell: (r) => r.product },
    { id: "category", header: "Category", cell: (r) => r.category, headerClassName: "w-[180px]" },
    { id: "sold", header: "Sold", cell: (r) => r.sold, headerClassName: "w-[120px]" },
    { id: "revenue", header: "Revenue", cell: (r) => r.revenue, headerClassName: "w-[160px] text-right", cellClassName: "text-right" },
  ];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <Card className="rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm text-muted-foreground">Best Seller Overview</div>
            <div className="mt-2 text-2xl font-semibold">{top ? top.product : "—"}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {top ? `${top.sold.toLocaleString()} sold • ${top.revenue}` : "No data"}
            </div>
          </div>
          <div className="shrink-0 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Top Product
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {items.slice(0, 6).map((it) => {
            const pct = maxSold ? Math.max(3, Math.round((it.sold / maxSold) * 100)) : 0;
            return (
              <div key={it.id} className="flex items-center gap-3">
                <div className="w-[180px] min-w-0">
                  <div className="truncate text-sm font-semibold">{it.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{it.subtitle}</div>
                </div>
                <div className="flex-1">
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="w-[90px] shrink-0 text-right text-sm font-semibold">{it.sold.toLocaleString()}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <DataTable title="Best Seller Report" columns={columns} rows={rows} getRowKey={(r) => r.id} />
    </div>
  );
}

