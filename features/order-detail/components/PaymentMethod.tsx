'use client';
import { useState } from "react";
import { cn } from "@/lib/utils";
import { paymentMethods } from "../services/data/payment-method";
import { PaymentMethodProps, PaymentMethodValue } from "../types/PaymentMethod";

export default function PaymentMethod({
  value,
  defaultValue = "card",
  onChange,
  className,
}: PaymentMethodProps) {
  const [internal, setInternal] = useState<PaymentMethodValue>(defaultValue);
  const current = value ?? internal;
  const select = (v: PaymentMethodValue) => {
    if (!value) setInternal(v);
    onChange?.(v);
  };

  return (
    <div
      className={cn(
        "flex justify-center items-center gap-2 rounded-2xl border border-border bg-background p-2",
        className
      )}
    >
      {paymentMethods.map(({ key, label, Icon }) => {
        const active = current === (key as PaymentMethodValue);
        return (
          <button
            key={key}
            type="button"
            onClick={() => select(key as PaymentMethodValue)}
            className={cn(
              "w-full flex flex-col justify-between items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium",
              active
                ? "bg-emerald-600 text-white"
                : "text-muted-foreground hover:bg-muted/50"
            )}
          >
            <Icon className={cn("h-5 w-5", active ? "text-white" : "text-muted-foreground")} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
