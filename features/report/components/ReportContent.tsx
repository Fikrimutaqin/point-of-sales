"use client";

import { Card } from "@/shared/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReportKey } from "@/features/report/types";
import ReportOrderSection from "./ReportOrderSection";

type Props = {
  active: ReportKey;
  className?: string;
};

export default function ReportContent({ active, className }: Props) {
  return (
    <div className={cn("w-full", className)}>
      {active === "order" ? (
        <ReportOrderSection />
      ) : (
        <Card className="rounded-2xl p-6">
          <div className="text-lg font-semibold">Coming Soon</div>
          <div className="mt-1 text-muted-foreground">Report for "{active}" will be available soon.</div>
        </Card>
      )}
    </div>
  );
}
