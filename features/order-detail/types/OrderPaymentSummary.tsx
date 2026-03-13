export type OrderPaymentSummary = {
  subTotal: number;
  tax: number;
  discountType?: discType;
  discountValue?: number;
  feeApplication?: number;
  total: number;
};

export type discType = 'percentage' | 'fixed';
