"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { SalesOverview, type SalesOverviewDatum } from "@/shared/components/sales-overview";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";

type OutcomeReportRow = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: string;
  method: string;
};

export default function ReportOutcomeSection({ className }: { className?: string }) {
  const series = useMemo<SalesOverviewDatum[]>(
    () => [
      { label: "Sun", income: 250, outcome: 1200 },
      { label: "Mon", income: 180, outcome: 900 },
      { label: "Tue", income: 220, outcome: 1100 },
      { label: "Wed", income: 200, outcome: 950 },
      { label: "Thu", income: 160, outcome: 1000 },
      { label: "Fri", income: 260, outcome: 1300 },
      { label: "Sat", income: 300, outcome: 1450 },
    ],
    []
  );

  const rows = useMemo<OutcomeReportRow[]>(
    () => [
      {
        id: "o-1",
        date: "2026-03-18",
        category: "Ingredients",
        description: "Daily stock purchase",
        amount: "Rp. 1.250.000",
        method: "Cash",
      },
      {
        id: "o-2",
        date: "2026-03-18",
        category: "Utilities",
        description: "Electricity",
        amount: "Rp. 450.000",
        method: "Transfer",
      },
      {
        id: "o-3",
        date: "2026-03-17",
        category: "Salary",
        description: "Staff payout",
        amount: "Rp. 3.500.000",
        method: "Transfer",
      },
      {
        id: "o-4",
        date: "2026-03-17",
        category: "Packaging",
        description: "Take away packaging",
        amount: "Rp. 300.000",
        method: "Cash",
      },
      {
        id: "o-5",
        date: "2026-03-16",
        category: "Maintenance",
        description: "Equipment service",
        amount: "Rp. 600.000",
        method: "Transfer",
      },
    ],
    []
  );

  const totalOutcome = series.reduce((acc, d) => acc + d.outcome, 0);
  const totalValue = `Rp. ${totalOutcome.toLocaleString()}`;

  const columns: DataTableColumn<OutcomeReportRow>[] = [
    { id: "date", header: "Date", cell: (r) => r.date, headerClassName: "w-[140px]" },
    { id: "category", header: "Category", cell: (r) => r.category, headerClassName: "w-[160px]" },
    { id: "description", header: "Description", cell: (r) => r.description },
    { id: "method", header: "Method", cell: (r) => r.method, headerClassName: "w-[140px]" },
    { id: "amount", header: "Amount", cell: (r) => r.amount, headerClassName: "w-[160px] text-right", cellClassName: "text-right" },
  ];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SalesOverview
        title="Outcome Overview"
        totalLabel="Total outcome this period"
        totalValue={totalValue}
        data={series}
      />
      <DataTable title="Outcome Report" columns={columns} rows={rows} getRowKey={(r) => r.id} />
    </div>
  );
}
