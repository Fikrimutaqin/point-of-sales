"use client";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus, ShieldX } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderItemLine } from "../types/OderItemType";
import { getInitials } from "@/lib/name";

export default function ItemListDetail({
  initialItems,
  onChange,
}: {
  initialItems?: OrderItemLine[];
  onChange?: (items: OrderItemLine[]) => void;
}) {
  // If initialItems is not provided, use an empty array as the default value
  const [items, setItems] = useState<OrderItemLine[]>(initialItems ?? []);

  // Call onChange whenever items change
  useEffect(() => {
    onChange?.(items);
  }, [items, onChange]);

  // Increment the quantity of the item with the given id
  const inc = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, quantity: it.quantity + 1 } : it))
    );
  };

  // Decrement the quantity of the item with the given id
  const dec = (id: string) => {
    setItems((prev) =>
      prev.flatMap((it) => {
        if (it.id !== id) return [it];
        const nextQty = it.quantity - 1;
        return nextQty <= 0 ? [] : [{ ...it, quantity: nextQty }];
      })
    );
  };

  return (
    <div className="w-full min-h-0 flex flex-col gap-y-3 border-t border-border border-dashed py-3">
      <div className="w-full flex flex-row justify-between items-center gap-x-3">
        <div className="text-lg font-semibold">Item List</div>
        <Button
          type="button"
          size="sm"
          onClick={() => setItems([])}
          disabled={items.length === 0}
          className="h-8 px-3 text-lg rounded-full! bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-muted-foreground"
        >
          Reset
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-10 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center text-white rounded-full bg-emerald-600 hover:bg-emerald-700">
            <ShieldX className="h-5 w-5" />
          </div>
          <p className="text-sm font-medium">Belum ada item</p>
          <p className="text-xs text-muted-foreground">
            Tambahkan item dari menu untuk mulai pesanan
          </p>
        </div>
      ) : (
        <div
          className={cn(
            "w-full min-h-0 flex flex-col gap-y-4 maxHeightOrderDetail overflow-y-auto pr-2 overscroll-contain"
          )}
        >
          {items.map((it) => (
            <div key={it.id} className="w-full flex items-center gap-x-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-muted shrink-0">
                {it.imageUrl ? (
                  <img
                    src={it.imageUrl}
                    alt={it.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-emerald-700">
                  {getInitials(it.name)}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-base font-semibold">{it.name}</div>
                <div className="text-emerald-600 text-base font-semibold">${it.price}</div>
              </div>

              <div className="flex items-center gap-x-3 gap-y-3 shrink-0">
                <Button
                  size="icon"
                  onClick={() => dec(it.id)}
                  className="h-10 w-10 rounded-full! border-emerald-600 text-emerald-600 flex items-center justify-center hover:bg-emerald-700 hover:text-white"
                  aria-label={`Decrease ${it.name}`}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-5 text-center text-emerald-700 font-semibold">{it.quantity}</div>
                <Button
                  size="icon"
                  onClick={() => inc(it.id)}
                  className="h-10 w-10 rounded-full! border border-emerald-600 text-emerald-600 flex items-center justify-center hover:bg-emerald-700  hover:text-white"
                  aria-label={`Increase ${it.name}`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
