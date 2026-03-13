import { OrderPaymentSummary } from "../types/OrderPaymentSummary";

export default function PaymentSummary({ order }: { order: OrderPaymentSummary }) {
  return (
    <div className="w-full flex flex-col gap-y-3 border-t border-border border-dashed py-3">
      <div className="w-full flex flex-row justify-between items-center gap-x-3">
        <div className="text-lg font-semibold">Payment Summary</div>
      </div>
      <div className="w-full flex flex-row justify-between items-center gap-x-1">
        <div className="text-sm font-medium text-muted-foreground">Sub Total</div>
        <div className="text-sm font-medium">${order.subTotal}</div>
      </div>
      <div className="w-full flex flex-row justify-between items-center gap-x-1">
        <div className="text-sm font-medium text-muted-foreground">Tax</div>
        <div className="text-sm font-medium">${order.tax}</div>
      </div>
      <div className="w-full flex flex-row justify-between items-center gap-x-1">
        <div className="text-sm font-medium text-muted-foreground">Discount</div>
        <div className="text-sm font-medium">{order.discountType === 'percentage' ? `${order.discountValue}%` : `$${order.discountValue}`}</div>
      </div>
      <div className="w-full flex flex-row justify-between items-center gap-x-1">
        <div className="text-sm font-medium text-muted-foreground">Fee Application</div>
        <div className="text-sm font-medium">${order.feeApplication}</div>
      </div>
      <div className="w-full flex flex-row justify-between items-center gap-x-1">
        <div className="text-sm font-medium text-muted-foreground">Total</div>
        <div className="text-sm font-medium">${order.total}</div>
      </div>
    </div>
  );
}