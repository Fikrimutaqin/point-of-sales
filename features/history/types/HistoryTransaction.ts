export type HistoryPaymentMethod = "cash" | "card" | "transfer" | "qris";

export type HistoryTransactionStatus = "paid" | "refunded" | "voided";

export type HistoryTransactionItem = {
  name: string;
  qty: number;
  price: number;
};

export type HistoryTransaction = {
  id: string;
  receiptNumber: string;
  customerName: string;
  createdAtLabel: string;
  itemsCount: number;
  items?: HistoryTransactionItem[];
  paymentMethod: HistoryPaymentMethod;
  status: HistoryTransactionStatus;
  total: number;
};
