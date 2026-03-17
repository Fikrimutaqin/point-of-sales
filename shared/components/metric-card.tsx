'use client';
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

export type MetricCardTone = "income" | "outcome" | "balance" | "neutral";

export type MetricTrend = {
  value: number;
  direction: "up" | "down";
};

type Props = {
  label: string;
  value: string;
  tone?: MetricCardTone;
  icon?: ReactNode;
  trend?: MetricTrend;
  className?: string;
};

const toneClass: Record<MetricCardTone, string> = {
  income: "bg-[var(--color-card)] bg-gradient-to-br from-emerald-500/10 to-sky-500/10",
  outcome: "bg-[var(--color-card)] bg-gradient-to-br from-red-500/10 to-amber-500/10",
  balance: "bg-[var(--color-card)] bg-gradient-to-br from-violet-500/10 to-sky-500/10",
  neutral: "bg-[var(--color-card)]",
};

export function MetricCard({ label, value, tone = "neutral", icon, trend, className }: Props) {
  const trendUp = trend?.direction === "up";
  const trendLabel = trend ? `${trend.value}%` : null;
  return (
    <div
      className={cn(
        "w-full rounded-lg border border-border p-4",
        toneClass[tone],
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/60 text-foreground">
              {icon}
            </div>
          ) : null}
          <div className="text-sm font-medium text-muted-foreground">{label}</div>
        </div>
        {trend ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
              trendUp ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
            )}
          >
            {trendUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {trendLabel}
          </span>
        ) : null}
      </div>
      <div className="mt-2 text-xl font-semibold text-foreground">{value}</div>
    </div>
  );
}
