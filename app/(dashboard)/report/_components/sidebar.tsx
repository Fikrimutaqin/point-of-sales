"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";

type Props = {
  value?: string;
  onChange?: (key: string) => void;
};

export default function ReportSidebar({ value, onChange }: Props) {
  const items: Array<{ key: string; label: string }> = [
    { key: "order", label: "Report Order" },
    { key: "income", label: "Report Income" },
    { key: "outcome", label: "Report Outcome" },
    { key: "balance", label: "Report Balance" },
    { key: "best-seller", label: "Report Best seller" },
    { key: "transaction", label: "Report Transaction" },
    { key: "promo", label: "Report Promo" },
  ];
  const [internal, setInternal] = useState<string>(items[0]?.key ?? "order");
  const active = value ?? internal;
  const setActive = (k: string) => {
    if (onChange) onChange(k);
    else setInternal(k);
  };

  return (
    <div className="w-[10%] h-[90vh] overflow-y-scroll border-r-2 fixed top-20 left-24">
      <p className="text-base py-3 px-3 font-medium bg-background text-secondary-foreground">
        Menu Reporting
      </p>
      <hr />
      <div className="p-3 flex flex-col gap-2">
        {items.map((it) => {
          const isActive = active === it.key;
          return (
            <Button
              key={it.key}
              type="button"
              variant={isActive ? "secondary" : "outline"}
              className={`w-full justify-start rounded-full! h-12 font-medium hover:bg-emerald-600 hover:text-white ${
                isActive ? "bg-emerald-600 text-background" : ""
              }`}
              aria-pressed={isActive}
              onClick={() => setActive(it.key)}
            >
              {it.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
