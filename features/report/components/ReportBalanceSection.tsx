"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { SalesOverview, type SalesOverviewDatum } from "@/shared/components/sales-overview";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";

type BalanceReportRow = {
  id: string;
  date: string;
  income: string;
  outcome: string;
  balance: string;
};

export default function ReportBalanceSection({ className }: { className?: string }) {
  const series = useMemo<SalesOverviewDatum[]>(
    () => [
      { label: "Sun", income: 2400, outcome: 1200 },
      { label: "Mon", income: 1900, outcome: 900 },
      { label: "Tue", income: 2200, outcome: 1100 },
      { label: "Wed", income: 2600, outcome: 950 },
      { label: "Thu", income: 2100, outcome: 1000 },
      { label: "Fri", income: 3200, outcome: 1300 },
      { label: "Sat", income: 3800, outcome: 1450 },
    ],
    []
  );

  const rows = useMemo<BalanceReportRow[]>(
    () => [
      { id: "b-1", date: "2026-03-18", income: "Rp. 10.700.000", outcome: "Rp. 2.000.000", balance: "Rp. 8.700.000" },
      { id: "b-2", date: "2026-03-17", income: "Rp. 12.050.000", outcome: "Rp. 4.400.000", balance: "Rp. 7.650.000" },
      { id: "b-3", date: "2026-03-16", income: "Rp. 8.200.000", outcome: "Rp. 1.600.000", balance: "Rp. 6.600.000" },
      { id: "b-4", date: "2026-03-15", income: "Rp. 9.300.000", outcome: "Rp. 2.450.000", balance: "Rp. 6.850.000" },
      { id: "b-5", date: "2026-03-14", income: "Rp. 7.900.000", outcome: "Rp. 1.900.000", balance: "Rp. 6.000.000" },
    ],
    []
  );

  const totalIncome = series.reduce((acc, d) => acc + d.income, 0);
  const totalOutcome = series.reduce((acc, d) => acc + d.outcome, 0);
  const totalBalance = totalIncome - totalOutcome;
  const totalValue = `Rp. ${totalBalance.toLocaleString()}`;

  const columns: DataTableColumn<BalanceReportRow>[] = [
    { id: "date", header: "Date", cell: (r) => r.date, headerClassName: "w-[140px]" },
    { id: "income", header: "Income", cell: (r) => r.income, headerClassName: "w-[160px] text-right", cellClassName: "text-right" },
    { id: "outcome", header: "Outcome", cell: (r) => r.outcome, headerClassName: "w-[160px] text-right", cellClassName: "text-right" },
    { id: "balance", header: "Balance", cell: (r) => r.balance, headerClassName: "w-[160px] text-right", cellClassName: "text-right font-semibold" },
  ];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SalesOverview title="Balance Overview" totalLabel="Total balance this period" totalValue={totalValue} data={series} />
      <DataTable title="Balance Report" columns={columns} rows={rows} getRowKey={(r) => r.id} />
    </div>
  );
}
