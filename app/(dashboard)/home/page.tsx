"use client";

import { Banknote, CreditCard, Wallet } from "lucide-react";
import { MetricCard } from "@/shared/components/metric-card";
import { SalesOverview } from "@/shared/components/sales-overview";
import { ProductBestSellerSection } from "@/features/product-best-seller/components";

export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row gap-x-5 gap-y-3 lg:gap-y-0 w-full">
      <div className="space-y-4 w-full lg:w-[70%]">
        {/* Metrics */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Income"
            value="Rp.32.000.000"
            tone="income"
            icon={<Banknote className="h-6 w-6 text-emerald-600" />}
            trend={{ value: 24, direction: "up" }}
          />
          <MetricCard
            label="Outcome"
            value="Rp.8.400.000"
            tone="outcome"
            icon={<CreditCard className="h-6 w-6 text-red-600" />}
            trend={{ value: 2.4, direction: "down" }}
          />
          <MetricCard
            label="Balance"
            value="Rp.23.600.000"
            tone="balance"
            icon={<Wallet className="h-6 w-6 text-violet-600" />}
            trend={{ value: 24, direction: "up" }}
          />
        </div>

        <SalesOverview totalValue="Rp. 32,000,000" />

      </div>
      <div className="w-full lg:w-[30%]">
        <ProductBestSellerSection />
      </div>
    </div>
  );
}
