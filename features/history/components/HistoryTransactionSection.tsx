"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { MetricCard } from "@/shared/components/metric-card";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";
import { Button } from "@/shared/components/ui/button";
import { getInitials } from "@/lib/name";
import type { HistoryPaymentMethod, HistoryTransaction, HistoryTransactionStatus } from "@/features/history/types";
import { historyTransactions as defaultRows } from "@/features/history/services/data";
import { ChevronDown, Receipt, Users, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

type Props = {
  rows?: HistoryTransaction[];
  className?: string;
};

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

const paymentLabel: Record<HistoryPaymentMethod, string> = {
  cash: "Cash",
  card: "Card",
  transfer: "Transfer",
  qris: "QRIS",
};

const statusTone: Record<HistoryTransactionStatus, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  refunded: "bg-amber-100 text-amber-700",
  voided: "bg-red-100 text-red-700",
};

export default function HistoryTransactionSection({ rows = defaultRows, className }: Props) {
  const [query, setQuery] = useState("");
  const [payment, setPayment] = useState<HistoryPaymentMethod | "all">("all");
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const setQueryAndResetPage = (value: string) => {
    setPage(1);
    setQuery(value);
  };

  const setPaymentAndResetPage = (value: HistoryPaymentMethod | "all") => {
    setPage(1);
    setPayment(value);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const matchQuery =
        q.length === 0
          ? true
          : r.customerName.toLowerCase().includes(q) || r.receiptNumber.toLowerCase().includes(q);
      const matchPayment = payment === "all" ? true : r.paymentMethod === payment;
      return matchQuery && matchPayment;
    });
  }, [payment, query, rows]);

  const stats = useMemo(() => {
    const totalTransactions = filtered.length;
    const totalAmount = filtered.reduce((acc, r) => acc + (r.status === "paid" ? r.total : 0), 0);
    const uniqueCustomers = new Set(filtered.map((r) => r.customerName)).size;
    const avg = totalTransactions > 0 ? Math.round(totalAmount / totalTransactions) : 0;
    return { totalTransactions, totalAmount, uniqueCustomers, avg };
  }, [filtered]);

  const selected = useMemo(() => rows.find((r) => r.id === selectedId) ?? null, [rows, selectedId]);

  const columns = useMemo<DataTableColumn<HistoryTransaction>[]>(
    () => [
      {
        id: "customer",
        header: "Customer",
        cell: (r) => (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-xs font-semibold text-emerald-700">
              {getInitials(r.customerName)}
            </div>
            <div className="min-w-0">
              <div className="truncate font-semibold">{r.customerName}</div>
              <div className="truncate text-xs text-muted-foreground">{r.receiptNumber}</div>
            </div>
          </div>
        ),
      },
      { id: "date", header: "Date", cell: (r) => r.createdAtLabel, headerClassName: "w-[170px]" },
      { id: "items", header: "Items", cell: (r) => r.itemsCount, headerClassName: "w-[90px] text-right", cellClassName: "text-right" },
      {
        id: "payment",
        header: "Payment",
        cell: (r) => (
          <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-semibold">
            {paymentLabel[r.paymentMethod]}
          </span>
        ),
        headerClassName: "w-[140px]",
      },
      {
        id: "status",
        header: "Status",
        cell: (r) => (
          <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusTone[r.status])}>
            {r.status}
          </span>
        ),
        headerClassName: "w-[120px]",
      },
      {
        id: "total",
        header: "Total",
        cell: (r) => formatIDR(r.total),
        headerClassName: "w-[160px] text-right",
        cellClassName: "text-right font-semibold",
      },
      {
        id: "detail",
        header: "Detail",
        cell: (r) => {
          const active = selectedId === r.id;
          return (
            <Button
              type="button"
              variant="outline"
              className={cn(
                "h-9 rounded-full px-3 text-xs font-semibold",
                active ? "border-emerald-600 text-emerald-700" : ""
              )}
              onClick={() => setSelectedId((cur) => (cur === r.id ? null : r.id))}
            >
              {active ? "Hide" : "View"}
            </Button>
          );
        },
        headerClassName: "w-[120px]",
      },
    ],
    [selectedId]
  );

  return (
    <div className={cn("w-full flex flex-col gap-4", className)}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Transaction"
          value={String(stats.totalTransactions)}
          tone="neutral"
          icon={<Receipt className="h-6 w-6 text-emerald-600" />}
        />
        <MetricCard
          label="Total Amount"
          value={formatIDR(stats.totalAmount)}
          tone="income"
          icon={<Wallet className="h-6 w-6 text-emerald-600" />}
        />
        <MetricCard
          label="Customers"
          value={String(stats.uniqueCustomers)}
          tone="neutral"
          icon={<Users className="h-6 w-6 text-slate-700" />}
        />
        <MetricCard
          label="Avg Transaction"
          value={formatIDR(stats.avg)}
          tone="balance"
          icon={<Wallet className="h-6 w-6 text-violet-600" />}
        />
      </div>

      <DataTable
        title="History Transaction"
        search={{ value: query, onChange: setQueryAndResetPage, placeholder: "Search name or receipt..." }}
        filtersSlot={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full">
                {payment === "all" ? "All Payment" : paymentLabel[payment]}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setPaymentAndResetPage("all")}>All Payment</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPaymentAndResetPage("cash")}>Cash</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPaymentAndResetPage("card")}>Card</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPaymentAndResetPage("transfer")}>Transfer</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPaymentAndResetPage("qris")}>QRIS</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        columns={columns}
        rows={filtered}
        getRowKey={(r) => r.id}
        pagination={{ page, onChange: setPage, pageSize: 10 }}
      />

      {selected ? (
        <div className="rounded-2xl border border-border bg-background p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-lg font-semibold">Transaction Detail</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {selected.customerName} • {selected.receiptNumber} • {selected.createdAtLabel}
              </div>
            </div>
            <Button type="button" variant="outline" className="h-9 rounded-full px-4 font-semibold" onClick={() => setSelectedId(null)}>
              Close
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-border p-4 lg:col-span-2">
              <div className="text-sm font-semibold">Items</div>
              <div className="mt-3 space-y-2">
                {(selected.items ?? []).length > 0 ? (
                  (selected.items ?? []).map((it) => (
                    <div key={it.name} className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{it.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {it.qty} x {formatIDR(it.price)}
                        </div>
                      </div>
                      <div className="shrink-0 text-sm font-semibold">{formatIDR(it.qty * it.price)}</div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-sm text-muted-foreground">No item detail available.</div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-border p-4">
              <div className="text-sm font-semibold">Summary</div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">Payment</div>
                  <div className="font-semibold">{paymentLabel[selected.paymentMethod]}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">Status</div>
                  <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", statusTone[selected.status])}>
                    {selected.status}
                  </span>
                </div>
                <div className="my-2 border-t border-border" />
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">Total</div>
                  <div className="text-base font-semibold">{formatIDR(selected.total)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
