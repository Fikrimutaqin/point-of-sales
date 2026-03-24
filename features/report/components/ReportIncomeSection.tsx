"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { SalesOverview, type SalesOverviewDatum } from "@/shared/components/sales-overview";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";

type IncomeReportRow = {
  id: string;
  date: string;
  channel: string;
  orders: number;
  grossIncome: string;
  netIncome: string;
};

export default function ReportIncomeSection({ className }: { className?: string }) {
  const series = useMemo<SalesOverviewDatum[]>(
    () => [
      { label: "Sun", income: 2400, outcome: 200 },
      { label: "Mon", income: 1900, outcome: 150 },
      { label: "Tue", income: 2200, outcome: 180 },
      { label: "Wed", income: 2600, outcome: 220 },
      { label: "Thu", income: 2100, outcome: 160 },
      { label: "Fri", income: 3200, outcome: 260 },
      { label: "Sat", income: 3800, outcome: 300 },
    ],
    []
  );

  const rows = useMemo<IncomeReportRow[]>(
    () => [
      { id: "i-1", date: "2026-03-18", channel: "Dine In", orders: 54, grossIncome: "Rp. 7.500.000", netIncome: "Rp. 7.240.000" },
      { id: "i-2", date: "2026-03-18", channel: "Take Away", orders: 28, grossIncome: "Rp. 3.200.000", netIncome: "Rp. 3.080.000" },
      { id: "i-3", date: "2026-03-17", channel: "Dine In", orders: 62, grossIncome: "Rp. 8.100.000", netIncome: "Rp. 7.820.000" },
      { id: "i-4", date: "2026-03-17", channel: "Take Away", orders: 33, grossIncome: "Rp. 3.950.000", netIncome: "Rp. 3.770.000" },
      { id: "i-5", date: "2026-03-16", channel: "Online", orders: 21, grossIncome: "Rp. 2.600.000", netIncome: "Rp. 2.480.000" },
    ],
    []
  );

  const totalIncome = series.reduce((acc, d) => acc + d.income, 0);
  const totalValue = `Rp. ${totalIncome.toLocaleString()}`;

  const columns: DataTableColumn<IncomeReportRow>[] = [
    { id: "date", header: "Date", cell: (r) => r.date, headerClassName: "w-[140px]" },
    { id: "channel", header: "Channel", cell: (r) => r.channel },
    { id: "orders", header: "Orders", cell: (r) => r.orders, headerClassName: "w-[100px]" },
    { id: "gross", header: "Gross", cell: (r) => r.grossIncome, headerClassName: "w-[160px] text-right", cellClassName: "text-right" },
    { id: "net", header: "Net", cell: (r) => r.netIncome, headerClassName: "w-[160px] text-right", cellClassName: "text-right" },
  ];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SalesOverview
        title="Income Overview"
        totalLabel="Total income this period"
        totalValue={totalValue}
        data={series}
      />
      <DataTable title="Income Report" columns={columns} rows={rows} getRowKey={(r) => r.id} />
    </div>
  );
}
