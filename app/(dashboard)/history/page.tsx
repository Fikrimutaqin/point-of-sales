import { HistoryTransactionSection } from "@/features/history/components";

export default function HistoryPage() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">History</h2>
      </div>
      <HistoryTransactionSection />
    </div>
  );
}
