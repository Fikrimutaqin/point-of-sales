"use client";

import { useState } from "react";
import ReportSidebar from "./_components/sidebar";
import ReportContent from "@/features/report/components/ReportContent";
import type { ReportKey } from "@/features/report/types";

export default function ChartPage() {
  const [active, setActive] = useState<ReportKey>("order");
  return (
    <div className="w-full">
      <ReportSidebar value={active} onChange={(k) => setActive(k as ReportKey)} />
      <div className="ml-[16%] mr-6 pt-6">
        <ReportContent active={active} />
      </div>
    </div>
  );
}
