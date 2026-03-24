import type { SalesOverviewDatum } from "@/shared/components/sales-overview";
import type { OrderReportRow } from "@/features/report/types";

export const orderReportSeries: SalesOverviewDatum[] = [
  { label: "Sun", income: 320, outcome: 24 },
  { label: "Mon", income: 410, outcome: 30 },
  { label: "Tue", income: 360, outcome: 28 },
  { label: "Wed", income: 390, outcome: 20 },
  { label: "Thu", income: 430, outcome: 26 },
  { label: "Fri", income: 520, outcome: 34 },
  { label: "Sat", income: 610, outcome: 40 },
];

export const orderReportRows: OrderReportRow[] = [
  { id: "r-1", date: "2026-03-18", orderNumber: "#A1021", customer: "Annisa", items: 5, total: "Rp. 240.000", status: "completed" },
  { id: "r-2", date: "2026-03-18", orderNumber: "#A1022", customer: "Bima", items: 3, total: "Rp. 120.000", status: "completed" },
  { id: "r-3", date: "2026-03-18", orderNumber: "#A1023", customer: "Cindy", items: 2, total: "Rp. 80.000", status: "processing" },
  { id: "r-4", date: "2026-03-17", orderNumber: "#A1011", customer: "Dewi", items: 6, total: "Rp. 300.000", status: "completed" },
  { id: "r-5", date: "2026-03-17", orderNumber: "#A1012", customer: "Eka", items: 1, total: "Rp. 45.000", status: "cancelled" },
];
