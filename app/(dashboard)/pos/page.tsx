import Link from "next/link";
import { OrderCard } from "@/shared/components/order-card";

export default function POSPage() {
  return (
    <div className="flex flex-row gap-x-5">
      <div className="space-y-4 w-full">
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
      <div className="w-1/3">
        <div className="h-full rounded-2xl p-4 border border-border">
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg font-semibold">Order Details</p>
            <p className="text-lg font-medium text-muted-foreground">#045</p>
          </div>
        </div>
      </div>
    </div>
  );
}
