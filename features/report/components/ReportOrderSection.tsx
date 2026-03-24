"use client";

import { cn } from "@/lib/utils";
import { SalesOverview } from "@/shared/components/sales-overview";
import { Card } from "@/shared/components/ui/card";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";
import { orderReportRows, orderReportSeries } from "@/features/report/services/data";
import type { OrderReportRow } from "@/features/report/types";

export default function ReportOrderSection({ className }: { className?: string }) {
  const totalOrders = orderReportSeries.reduce((acc, d) => acc + d.income, 0);
  const totalLabel = "Orders this period";
  const totalValue = `${totalOrders.toLocaleString()} Orders`;

  const columns: DataTableColumn<OrderReportRow>[] = [
    { id: "date", header: "Date", cell: (r) => r.date, headerClassName: "w-[140px]" },
    { id: "order", header: "Order #", cell: (r) => r.orderNumber, headerClassName: "w-[120px]" },
    { id: "customer", header: "Customer", cell: (r) => r.customer },
    { id: "items", header: "Items", cell: (r) => r.items, headerClassName: "w-[100px]" },
    { id: "total", header: "Total", cell: (r) => r.total, headerClassName: "w-[140px] text-right", cellClassName: "text-right" },
    {
      id: "status",
      header: "Status",
      cell: (r) => {
        const tone =
          r.status === "completed"
            ? "bg-emerald-100 text-emerald-700"
            : r.status === "processing"
            ? "bg-amber-100 text-amber-700"
            : "bg-red-100 text-red-700";
        return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", tone)}>{r.status}</span>;
      },
      headerClassName: "w-[140px]",
    },
  ];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SalesOverview title="Order Overview" totalLabel={totalLabel} totalValue={totalValue} data={orderReportSeries} />
      <Card className="p-4 rounded-2xl">
        <DataTable
          title="Order Report"
          columns={columns}
          rows={orderReportRows}
          getRowKey={(r) => r.id}
        />
      </Card>
    </div>
  );
}
