"use client";

import { useEffect, useMemo, useState } from "react";
import { Banknote, CreditCard, Wallet } from "lucide-react";
import { MetricCard } from "@/shared/components/metric-card";
import { SalesOverview } from "@/shared/components/sales-overview";
import { ProductBestSellerSection } from "@/features/product-best-seller/components";
import { DataTable, type DataTableColumn } from "@/shared/components/data-table";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ChevronDown, LayoutGrid, List, ArrowUpRight } from "lucide-react";
import { getInitials } from "@/lib/name";

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
    price: 22000,
    quantity: 700,
    total: 3320000,
    imageUrl:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "4",
    productName: "Espresso",
    category: "Sweet Coffee",
    price: 20000,
    quantity: 800,
    total: 1600000,
    imageUrl:
      "https://images.unsplash.com/photo-1504753753649-1f21a4f1f2d1?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "5",
    productName: "Latte",
    category: "Sweet Coffee",
    price: 28000,
    quantity: 550,
    total: 1520000,
    imageUrl:
      "https://images.unsplash.com/photo-1504753753649-1f21a4f1f2d1?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "6",
    productName: "Cappuccino",
    category: "Sweet Coffee",
    price: 26000,
    quantity: 600,
    total: 1560000,
    imageUrl:
      "https://images.unsplash.com/photo-1504753753649-1f21a4f1f2d1?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "7",
    productName: "Americano",
    category: "Sweet Coffee",
    price: 24000,
    quantity: 750,
    total: 1800000,
    imageUrl:
      "https://images.unsplash.com/photo-1504753753649-1f21a4f1f2d1?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "8",
    productName: "Cold Brew",
    category: "Manual Brew",
    price: 25000,
    quantity: 650,
    total: 1625000,
    imageUrl:
      "https://images.unsplash.com/photo-1504753753649-1f21a4f1f2d1?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "9",
    productName: "Iced Coffee",
    category: "Manual Brew",
    price: 23000,
    quantity: 680,
    total: 1494000,
    imageUrl:
      "https://images.unsplash.com/photo-1504753753649-1f21a4f1f2d1?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "10",
    productName: "Chai Tea",
    category: "Sweet Tea",
    price: 27000,
    quantity: 580,
    total: 1604000,
    imageUrl:
      "https://images.unsplash.com/photo-1504753753649-1f21a4f1f2d1?auto=format&fit=crop&w=160&h=160&q=60",
  },
  {
    id: "11",
    productName: "Green Tea",
    category: "Sweet Tea",
    price: 25000,
    quantity: 600,
    total: 1500000,
    imageUrl:
      "https://images.unsplash.com/photo-1504753753649-1f21a4f1f2d1?auto=format&fit=crop&w=160&h=160&q=60",
  },
];

export default function HomePage() {
  const allRows = useMemo(() => DEFAULT_TRANSACTIONS, []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category, query]);

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

  const columns = useMemo<DataTableColumn<TransactionRow>[]>(
    () => [
      {
        id: "product",
        header: "Product Name",
        cell: (r) => (
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-muted">
              {r.imageUrl ? (
                <img
                  src={r.imageUrl}
                  alt={r.productName}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
                  }}
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-emerald-700">
                {getInitials(r.productName)}
              </div>
            </div>
            <div className="font-medium">{r.productName}</div>
          </div>
        ),
      },
      {
        id: "category",
        header: "Category",
        cell: (r) => <span className="text-muted-foreground">{r.category}</span>,
      },
      {
        id: "price",
        header: <div className="text-right">Price</div>,
        headerClassName: "text-right",
        cellClassName: "text-right",
        cell: (r) => `Rp.${r.price.toLocaleString("id-ID")}`,
      },
      {
        id: "qty",
        header: <div className="text-right">Quantity</div>,
        headerClassName: "text-right",
        cellClassName: "text-right",
        cell: (r) => r.quantity.toLocaleString("id-ID"),
      },
      {
        id: "total",
        header: <div className="text-right">Total</div>,
        headerClassName: "text-right",
        cellClassName: "text-right font-semibold",
        cell: (r) => `Rp.${r.total.toLocaleString("id-ID")}`,
      },
    ],
    []
  );

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

        <DataTable
          title="Transaction"
          search={{ value: query, onChange: setQuery, placeholder: "Search Product..." }}
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
                  <DropdownMenuItem key={c} onClick={() => setCategory(c)}>
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
          pagination={{ page, onChange: setPage, pageSize: 5 }}
        />
      </div>
      <div className="w-full lg:w-[30%]">
        <ProductBestSellerSection />
      </div>
    </div>
  );
}
