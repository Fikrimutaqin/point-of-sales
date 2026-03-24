export type ReportKey =
  | "order"
  | "income"
  | "outcome"
  | "balance"
  | "best-seller"
  | "transaction"
  | "promo";

export type OrderReportRow = {
  id: string;
  date: string;
  orderNumber: string;
  customer: string;
  items: number;
  total: string;
  status: "completed" | "cancelled" | "processing";
};
