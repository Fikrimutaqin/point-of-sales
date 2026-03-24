"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { OrderCard } from "@/shared/components/order-card";
import type { Order, OrderFilterKey, OrderStatus } from "@/features/order/types";
import { defaultOrders } from "@/features/order/services/data";
import { useMemo, useState } from "react";
import OrderFilterBar from "./OrderFilterBar";

const statusLabel: Record<OrderStatus, string> = {
  new: "New Order",
  cooking: "Cooking",
  ready: "Ready to serve",
};

function calcTotal(items: Order["items"]) {
  return items.reduce((acc, it) => acc + it.price * it.quantity, 0);
}

type Props = {
  title?: string;
  seeAllHref?: string;
  orders?: Order[];
  layout?: "horizontal" | "grid";
  showFilterBar?: boolean;
  className?: string;
};

export default function OrderQueueSection({
  title = "Order Queue",
  seeAllHref = "/order",
  orders = defaultOrders,
  layout = "horizontal",
  showFilterBar = layout === "grid",
  className,
}: Props) {
  const [filter, setFilter] = useState<OrderFilterKey>("all");

  const counts = useMemo(() => {
    const base: Record<OrderFilterKey, number> = {
      all: orders.length,
      new: 0,
      cooking: 0,
      ready: 0,
      completed: 0,
      cancelled: 0,
    };
    for (const o of orders) {
      if (o.status === "new") base.new += 1;
      if (o.status === "cooking") base.cooking += 1;
      if (o.status === "ready") base.ready += 1;
    }
    return base;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    if (filter === "new" || filter === "cooking" || filter === "ready") {
      return orders.filter((o) => o.status === filter);
    }
    return [];
  }, [filter, orders]);

  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {layout === "horizontal" ? (
          <Link href={seeAllHref} className="text-sm font-medium text-emerald-600 hover:underline">
            See All
          </Link>
        ) : null}
      </div>

      {showFilterBar ? (
        <OrderFilterBar
          value={filter}
          counts={counts}
          onChange={setFilter}
          onSearchClick={() => {}}
          onDateClick={() => {}}
        />
      ) : null}

      {layout === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {filteredOrders.map((o) => (
            <OrderCard
              key={o.id}
              customerName={o.customerName}
              orderNumber={o.orderNumber}
              createdAtLabel={o.createdAtLabel}
              locationLabel={o.location.label}
              locationIcon={o.location.type}
              items={o.items.map((it) => ({ name: it.name, price: it.price, quantity: it.quantity }))}
              itemsCount={o.items.length}
              total={calcTotal(o.items)}
              seeMoreHref={seeAllHref}
              status={{ label: statusLabel[o.status], variant: o.status }}
            />
          ))}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {filteredOrders.map((o) => (
            <OrderCard
              key={o.id}
              customerName={o.customerName}
              orderNumber={o.orderNumber}
              createdAtLabel={o.createdAtLabel}
              locationLabel={o.location.label}
              locationIcon={o.location.type}
              items={o.items.map((it) => ({ name: it.name, price: it.price, quantity: it.quantity }))}
              itemsCount={o.items.length}
              total={calcTotal(o.items)}
              seeMoreHref={seeAllHref}
              status={{ label: statusLabel[o.status], variant: o.status }}
              className="shrink-0"
            />
          ))}
        </div>
      )}
    </div>
  );
}
