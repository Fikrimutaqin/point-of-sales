export type PaymentMethodValue = "card" | "cash" | "qris";

export type PaymentMethodProps = {
  value?: PaymentMethodValue;
  defaultValue?: PaymentMethodValue;
  onChange?: (value: PaymentMethodValue) => void;
  className?: string;
};