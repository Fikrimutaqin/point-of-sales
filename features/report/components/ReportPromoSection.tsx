"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { MetricCard } from "@/shared/components/metric-card";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";
import type { ManagePromo } from "@/features/promo/types";
import { managePromos as defaultPromos } from "@/features/promo/services/data";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Globe, Lock, TicketPercent, XCircle } from "lucide-react";

type Props = {
  promos?: ManagePromo[];
  className?: string;
};

type VoucherUsage = {
  code: string;
  used: number;
  limit: number;
};

type PromoUsageSummary = {
  id: string;
  title: string;
  status: ManagePromo["status"];
  used: number;
  limit: number;
};

const voucherUsageByPromoId: Record<string, VoucherUsage[]> = {
  "m-1": [
    { code: "B2G1-APR", used: 120, limit: 300 },
    { code: "B2G1-WEEKEND", used: 48, limit: 120 },
  ],
  "m-2": [
    { code: "CC15-VIP", used: 32, limit: 80 },
    { code: "CC15-STAFF", used: 9, limit: 20 },
  ],
  "m-3": [{ code: "DISC20-WOMEN", used: 76, limit: 200 }],
  "m-4": [{ code: "DISC40-KIDS", used: 40, limit: 40 }],
};

export default function ReportPromoSection({ promos = defaultPromos, className }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedPromoId, setSelectedPromoId] = useState<string | null>(null);

  const setQueryAndResetPage = (value: string) => {
    setPage(1);
    setQuery(value);
  };

  const stats = useMemo(() => {
    const total = promos.length;
    const active = promos.filter((p) => p.status === "active").length;
    const expired = promos.filter((p) => p.status === "expired").length;
    const publicCount = promos.filter((p) => p.visibility === "public" && p.status !== "expired").length;
    const privateCount = promos.filter((p) => p.visibility === "private" && p.status !== "expired").length;
    return { total, active, expired, publicCount, privateCount };
  }, [promos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return promos;
    return promos.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchChannel = p.channel.label.toLowerCase().includes(q);
      return matchTitle || matchChannel;
    });
  }, [promos, query]);

  const selectedPromo = useMemo(() => promos.find((p) => p.id === selectedPromoId) ?? null, [promos, selectedPromoId]);
  const selectedVouchers = useMemo(() => (selectedPromo ? voucherUsageByPromoId[selectedPromo.id] ?? [] : []), [selectedPromo]);

  const promoUsage = useMemo<PromoUsageSummary[]>(() => {
    return promos.map((p) => {
      const vouchers = voucherUsageByPromoId[p.id] ?? [];
      const used = vouchers.reduce((acc, v) => acc + v.used, 0);
      const limit = vouchers.reduce((acc, v) => acc + v.limit, 0);
      return { id: p.id, title: p.title, status: p.status, used, limit };
    });
  }, [promos]);

  const maxLimit = useMemo(() => promoUsage.reduce((acc, p) => Math.max(acc, p.limit), 0), [promoUsage]);

  const columns = useMemo<DataTableColumn<ManagePromo>[]>(
    () => [
      { id: "title", header: "Promo", cell: (p) => <div className="font-semibold">{p.title}</div> },
      { id: "channel", header: "Channel", cell: (p) => <div className="text-muted-foreground">{p.channel.label}</div> },
      { id: "valid", header: "Valid Until", cell: (p) => p.validUntilLabel, headerClassName: "w-[200px]" },
      {
        id: "visibility",
        header: "Visibility",
        cell: (p) => (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
              p.visibility === "public" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-800"
            )}
          >
            {p.visibility}
          </span>
        ),
        headerClassName: "w-[140px]",
      },
      {
        id: "status",
        header: "Status",
        cell: (p) => (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
              p.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            )}
          >
            {p.status}
          </span>
        ),
        headerClassName: "w-[140px]",
      },
      {
        id: "voucher-used",
        header: "Voucher Used",
        cell: (p) => {
          const vouchers = voucherUsageByPromoId[p.id] ?? [];
          const used = vouchers.reduce((acc, v) => acc + v.used, 0);
          const limit = vouchers.reduce((acc, v) => acc + v.limit, 0);
          return (
            <div className="text-sm font-semibold text-foreground">
              {limit > 0 ? `${used}/${limit}` : "—"}
            </div>
          );
        },
        headerClassName: "w-[140px]",
      },
      {
        id: "detail",
        header: "Detail",
        cell: (p) => {
          const active = selectedPromoId === p.id;
          return (
            <Button
              type="button"
              variant="outline"
              className={cn("h-9 rounded-full px-3 text-xs font-semibold", active ? "border-emerald-600 text-emerald-700" : "")}
              onClick={() => setSelectedPromoId((cur) => (cur === p.id ? null : p.id))}
            >
              {active ? "Hide" : "View"}
            </Button>
          );
        },
        headerClassName: "w-[120px]",
      },
    ],
    [selectedPromoId]
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          label="Total Promo"
          value={String(stats.total)}
          tone="neutral"
          icon={<TicketPercent className="h-6 w-6 text-emerald-600" />}
        />
        <MetricCard
          label="Active Promo"
          value={String(stats.active)}
          tone="income"
          icon={<TicketPercent className="h-6 w-6 text-emerald-600" />}
        />
        <MetricCard
          label="Expired Promo"
          value={String(stats.expired)}
          tone="outcome"
          icon={<XCircle className="h-6 w-6 text-red-600" />}
        />
        <MetricCard
          label="Public Promo"
          value={String(stats.publicCount)}
          tone="income"
          icon={<Globe className="h-6 w-6 text-emerald-600" />}
        />
        <MetricCard
          label="Private Promo"
          value={String(stats.privateCount)}
          tone="neutral"
          icon={<Lock className="h-6 w-6 text-slate-700" />}
        />
      </div>

      <Card className="rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-lg font-semibold">Voucher Usage Chart</div>
            <div className="mt-1 text-sm text-muted-foreground">Used voucher compared to total quota per promo</div>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
              Used
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-muted" />
              Remaining
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {promoUsage
            .slice()
            .sort((a, b) => {
              const ap = a.limit > 0 ? a.used / a.limit : 0;
              const bp = b.limit > 0 ? b.used / b.limit : 0;
              return bp - ap;
            })
            .map((p) => {
              const usedPct = p.limit > 0 ? Math.min(100, Math.max(0, Math.round((p.used / p.limit) * 100))) : 0;
              const barW = maxLimit > 0 ? Math.max(20, Math.round((p.limit / maxLimit) * 100)) : 100;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-[220px] min-w-0">
                    <div className="truncate text-sm font-semibold">{p.title}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {p.limit > 0 ? `${p.used}/${p.limit} used • ${usedPct}%` : "No quota"}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full", p.status === "expired" ? "bg-red-600" : "bg-emerald-600")}
                        style={{ width: `${(barW * usedPct) / 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-[70px] shrink-0 text-right text-sm font-semibold">{usedPct}%</div>
                </div>
              );
            })}
        </div>
      </Card>

      <DataTable
        title="Promo Report"
        search={{ value: query, onChange: setQueryAndResetPage, placeholder: "Search promo..." }}
        columns={columns}
        rows={filtered}
        getRowKey={(p) => p.id}
        pagination={{ page, onChange: setPage, pageSize: 10 }}
      />

      {selectedPromo ? (
        <Card className="rounded-2xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-lg font-semibold">Voucher Usage</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {selectedPromo.title} • {selectedPromo.channel.label}
              </div>
            </div>
            <Button type="button" variant="outline" className="h-9 rounded-full px-4 font-semibold" onClick={() => setSelectedPromoId(null)}>
              Close
            </Button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <div className="mb-4">
              <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-emerald-600"
                  style={{
                    width: `${(() => {
                      const used = selectedVouchers.reduce((acc, v) => acc + v.used, 0);
                      const limit = selectedVouchers.reduce((acc, v) => acc + v.limit, 0);
                      if (!limit) return 0;
                      return Math.min(100, Math.max(0, Math.round((used / limit) * 100)));
                    })()}%`,
                  }}
                />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {(() => {
                  const used = selectedVouchers.reduce((acc, v) => acc + v.used, 0);
                  const limit = selectedVouchers.reduce((acc, v) => acc + v.limit, 0);
                  return limit > 0 ? `${used}/${limit} voucher used` : "No quota";
                })()}
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Voucher</th>
                  <th className="py-2 pr-4 font-medium">Used</th>
                  <th className="py-2 pr-4 font-medium">Limit</th>
                  <th className="py-2 pr-0 font-medium">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {selectedVouchers.length > 0 ? (
                  selectedVouchers.map((v) => (
                    <tr key={v.code} className="border-b border-border last:border-b-0">
                      <td className="py-3 pr-4 font-semibold">{v.code}</td>
                      <td className="py-3 pr-4">{v.used}</td>
                      <td className="py-3 pr-4">{v.limit}</td>
                      <td className="py-3 pr-0">{Math.max(0, v.limit - v.used)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-muted-foreground">
                      No voucher detail available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
