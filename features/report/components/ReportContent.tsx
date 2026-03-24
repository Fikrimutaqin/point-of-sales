"use client";

import { Card } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReportKey } from "@/features/report/types";
import ReportOrderSection from "./ReportOrderSection";
import ReportIncomeSection from "./ReportIncomeSection";
import ReportOutcomeSection from "./ReportOutcomeSection";
import ReportBalanceSection from "./ReportBalanceSection";
import ReportBestSellerSection from "./ReportBestSellerSection";
import ReportTransactionSection from "./ReportTransactionSection";
import ReportPromoSection from "./ReportPromoSection";

type Props = {
  active: ReportKey;
  className?: string;
};

export default function ReportContent({ active, className }: Props) {
  return (
    <div className={cn("w-full", className)}>
      {active === "order" ? <ReportOrderSection /> : null}
      {active === "income" ? <ReportIncomeSection /> : null}
      {active === "outcome" ? <ReportOutcomeSection /> : null}
      {active === "balance" ? <ReportBalanceSection /> : null}
      {active === "best-seller" ? <ReportBestSellerSection /> : null}
      {active === "transaction" ? <ReportTransactionSection /> : null}
      {active === "promo" ? <ReportPromoSection /> : null}
      {active !== "order" &&
      active !== "income" &&
      active !== "outcome" &&
      active !== "balance" &&
      active !== "best-seller" &&
      active !== "transaction" &&
      active !== "promo" ? (
        <Card className="rounded-2xl p-6">
          <div className="text-lg font-semibold">Coming Soon</div>
          <div className="mt-1 text-muted-foreground">Report for "{active}" will be available soon.</div>
        </Card>
      ) : null}
    </div>
  );
}
