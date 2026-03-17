'use client';
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export type SalesOverviewPeriod = "weekly" | "monthly" | "yearly";

export type SalesOverviewDatum = {
  label: string;
  income: number;
  outcome: number;
};

type Props = {
  title?: string;
  totalLabel?: string;
  totalValue: string;
  data?: SalesOverviewDatum[];
  period?: SalesOverviewPeriod;
  onPeriodChange?: (p: SalesOverviewPeriod) => void;
  className?: string;
};

function roundUp(n: number, step: number) {
  if (n <= 0) return step;
  return Math.ceil(n / step) * step;
}

function formatK(n: number) {
  if (n === 0) return "0k";
  return `${Math.round(n)}k`;
}

export function SalesOverview({
  title = "Sales Overview",
  totalLabel,
  totalValue,
  data,
  period,
  onPeriodChange,
  className,
}: Props) {
  const [internalPeriod, setInternalPeriod] = useState<SalesOverviewPeriod>("weekly");
  const currentPeriod = period ?? internalPeriod;

  const [show, setShow] = useState({ income: true, outcome: true });

  const defaultData = useMemo<SalesOverviewDatum[]>(
    () => [
      { label: "Sun", income: 2400, outcome: 1200 },
      { label: "Mon", income: 1300, outcome: 300 },
      { label: "Tue", income: 1600, outcome: 1100 },
      { label: "Wed", income: 1700, outcome: 1050 },
      { label: "Thu", income: 1500, outcome: 1000 },
      { label: "Fri", income: 2300, outcome: 950 },
      { label: "Sat", income: 2400, outcome: 1200 },
    ],
    []
  );

  const series = data ?? defaultData;

  const yMax = useMemo(() => {
    const max = series.reduce((acc, d) => Math.max(acc, d.income, d.outcome), 0);
    return roundUp(max, 400);
  }, [series]);

  const ticks = useMemo(() => {
    const steps = 4;
    return Array.from({ length: steps + 1 }, (_, i) => (yMax / steps) * i).reverse();
  }, [yMax]);

  const setPeriod = (p: SalesOverviewPeriod) => {
    if (period === undefined) setInternalPeriod(p);
    onPeriodChange?.(p);
  };

  return (
    <Card className={cn("rounded-2xl p-5", className)}>
      <div className="flex items-start gap-4">
        <div className="min-w-0">
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="mt-2 text-3xl font-semibold">{totalValue}</div>
          {totalLabel ? <div className="mt-1 text-sm text-muted-foreground">{totalLabel}</div> : null}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full">
                {currentPeriod[0].toUpperCase() + currentPeriod.slice(1)}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setPeriod("weekly")}>Weekly</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("monthly")}>Monthly</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("yearly")}>Yearly</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => setShow((s) => ({ ...s, income: !s.income }))}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
            show.income ? "border-border bg-background" : "border-border bg-muted text-muted-foreground"
          )}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          Income
        </button>
        <button
          type="button"
          onClick={() => setShow((s) => ({ ...s, outcome: !s.outcome }))}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
            show.outcome ? "border-border bg-background" : "border-border bg-muted text-muted-foreground"
          )}
        >
          <span className="h-2 w-2 rounded-full bg-red-600" />
          Outcome
        </button>
      </div>

      <div className="mt-4 grid grid-cols-[56px_1fr] gap-3">
        <div className="flex h-[220px] flex-col justify-between pb-6 text-right text-sm text-muted-foreground">
          {ticks.map((t) => (
            <div key={t}>{formatK(t)}</div>
          ))}
        </div>

        <div className="h-[220px]">
          <div className="flex h-[196px] items-end gap-3">
            {series.map((d) => {
              const incomeH = yMax ? Math.max(2, Math.round((d.income / yMax) * 100)) : 0;
              const outcomeH = yMax ? Math.max(2, Math.round((d.outcome / yMax) * 100)) : 0;
              return (
                <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div className="flex h-full w-full items-end justify-center gap-2">
                    {show.outcome ? (
                      <div
                        className="relative w-full max-w-[46px] overflow-hidden rounded-2xl bg-red-600/80"
                        style={{ height: `${outcomeH}%` }}
                      >
                        <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.45)_0,rgba(255,255,255,0.45)_8px,rgba(255,255,255,0)_8px,rgba(255,255,255,0)_16px)]" />
                      </div>
                    ) : (
                      <div className="w-full max-w-[46px]" />
                    )}
                    {show.income ? (
                      <div
                        className="relative w-full max-w-[46px] overflow-hidden rounded-2xl bg-emerald-600/80"
                        style={{ height: `${incomeH}%` }}
                      >
                        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.35)_0,rgba(255,255,255,0.35)_8px,rgba(255,255,255,0)_8px,rgba(255,255,255,0)_16px)]" />
                      </div>
                    ) : (
                      <div className="w-full max-w-[46px]" />
                    )}
                  </div>
                  <div className="pb-1 text-sm text-muted-foreground">{d.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

