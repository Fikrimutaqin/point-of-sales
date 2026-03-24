"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/name";
import { Button } from "@/shared/components/ui/button";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";
import { SalesOverview, type SalesOverviewDatum } from "@/shared/components/sales-overview";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type TransactionRow = {
  id: string;
  productName: string;
  category: string;
  price: number;
  quantity: number;
  total: number;
  imageUrl?: string;
};

const DEFAULT_TRANSACTIONS: TransactionRow[] = [
  {
    id: "1",
    productName: "Mocha",
    category: "Sweet Coffee",
    price: 24000,
    quantity: 720,
    total: 8280000,
    imageUrl:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "2",
    productName: "Caramel Macchiato",
    category: "Sweet Coffee",
    price: 26000,
    quantity: 630,
    total: 7280000,
    imageUrl:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "3",
    productName: "Toraja Coffee",
    category: "Manual Brew",
    price: 20000,
    quantity: 510,
    total: 5180000,
    imageUrl:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "4",
    productName: "Milk Tea",
    category: "Tea",
    price: 18000,
    quantity: 420,
    total: 3280000,
    imageUrl:
      "https://images.unsplash.com/photo-1542444459-db37f3d85b0d?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "5",
    productName: "Croissant",
    category: "Snack",
    price: 22000,
    quantity: 310,
    total: 1500000,
    imageUrl: "",
  },
];

function formatIDR(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}

export default function ReportTransactionSection({ className }: { className?: string }) {
  const allRows = useMemo(() => DEFAULT_TRANSACTIONS, []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [page, setPage] = useState(1);

  const setQueryAndResetPage = (value: string) => {
    setPage(1);
    setQuery(value);
  };

  const setCategoryAndResetPage = (value: string) => {
    setPage(1);
    setCategory(value);
  };

  const categories = useMemo(() => {
    const set = new Set(allRows.map((r) => r.category));
    return ["All", ...Array.from(set)];
  }, [allRows]);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allRows.filter((r) => {
      const matchQ = q ? r.productName.toLowerCase().includes(q) : true;
      const matchCat = category === "All" ? true : r.category === category;
      return matchQ && matchCat;
    });
  }, [allRows, category, query]);

  const series = useMemo<SalesOverviewDatum[]>(
    () => [
      { label: "Sun", income: 2400, outcome: 1200 },
      { label: "Mon", income: 1900, outcome: 900 },
      { label: "Tue", income: 2200, outcome: 1100 },
      { label: "Wed", income: 2600, outcome: 950 },
      { label: "Thu", income: 2100, outcome: 1000 },
      { label: "Fri", income: 3200, outcome: 1300 },
      { label: "Sat", income: 3800, outcome: 1450 },
    ],
    []
  );

  const totalValue = formatIDR(rows.reduce((acc, r) => acc + r.total, 0));

  const columns = useMemo<DataTableColumn<TransactionRow>[]>(
    () => [
      {
        id: "product",
        header: "Product Name",
        cell: (r) => (
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-muted">
              {r.imageUrl ? (
                <Image
                  src={r.imageUrl}
                  alt={getInitials(r.productName)}
                  fill
                  unoptimized
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-emerald-700">
                  {getInitials(r.productName)}
                </div>
              )}
            </div>
            <div className="font-medium">{r.productName}</div>
          </div>
        ),
      },
      { id: "category", header: "Category", cell: (r) => r.category },
      { id: "price", header: "Price", cell: (r) => formatIDR(r.price), headerClassName: "w-[140px] text-right", cellClassName: "text-right" },
      { id: "quantity", header: "Qty", cell: (r) => r.quantity, headerClassName: "w-[100px] text-right", cellClassName: "text-right" },
      { id: "total", header: "Total", cell: (r) => formatIDR(r.total), headerClassName: "w-[160px] text-right", cellClassName: "text-right font-semibold" },
    ],
    []
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <SalesOverview title="Transaction Overview" totalLabel="Total sales by period" totalValue={totalValue} data={series} />
      <DataTable
        title="Transaction Report"
        search={{ value: query, onChange: setQueryAndResetPage, placeholder: "Search Product..." }}
        filtersSlot={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full">
                {category}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {categories.map((c) => (
                <DropdownMenuItem key={c} onClick={() => setCategoryAndResetPage(c)}>
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        }
        actionsSlot={""}
        columns={columns}
        rows={rows}
        getRowKey={(r) => r.id}
        pagination={{ page, onChange: setPage, pageSize: 10 }}
      />
    </div>
  );
}

