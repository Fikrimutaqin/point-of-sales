"use client";

import { useState } from "react";
import Link from "next/link";
import MenuSection from "@/features/menu/components/MenuSection";
import { OrderItemLine } from "@/features/order-detail/types/OderItemType";
import { OrderCard } from "@/shared/components/order-card";
import OrderDetailSection from "@/features/order-detail/components/OrderDetailSection";

export default function POSPage() {
  const [orderItems, setOrderItems] = useState<OrderItemLine[]>([]);

  return (
    <div className="flex flex-col lg:flex-row gap-x-5 gap-y-3 lg:gap-y-0">
      <div className="space-y-4 w-full">
        {/* Order Queue */}
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Order Queue</h2>
            <Link href="/pos" className="text-sm font-medium text-emerald-600 hover:underline">
              See All
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            <OrderCard
              customerName="Robert Fox"
              orderNumber="#044"
              itemsCount={2}
              locationLabel="Table 03"
              status={{ label: "New Order", variant: "new" }}
            />
            <OrderCard
              customerName="Jenny Wilson"
              orderNumber="#043"
              itemsCount={3}
              locationLabel="Table 05"
              status={{ label: "Cooking", variant: "cooking" }}
            />
            <OrderCard
              customerName="Cameron William"
              orderNumber="#042"
              itemsCount={2}
              locationLabel="Takeaway"
              status={{ label: "Ready to serve", variant: "ready" }}
            />
          </div>
        </div>
        {/* Menu */}
        <div className="w-full flex flex-col">
          <MenuSection />
        </div>
      </div>

      <div className={`w-full lg:w-1/2 ${orderItems.length > 0 ? "block" : "hidden"}`}>
        <div className="min-h-0 rounded-2xl p-4 border border-border w-auto overflow-y-scroll">
          <OrderDetailSection />
        </div>
      </div>
    </div>
  );
}
