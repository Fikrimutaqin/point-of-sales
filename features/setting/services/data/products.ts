import type { Product } from "@/features/setting/types";

export const initialProducts: Product[] = [
  { id: "prd-1", name: "Mocha", sku: "PRD-MOCHA", price: 24000, categoryId: "cat-1" },
  { id: "prd-2", name: "Caramel Macchiato", sku: "PRD-CARAMEL", price: 26000, categoryId: "cat-1" },
  { id: "prd-3", name: "Milk Tea", sku: "PRD-MTEA", price: 18000, categoryId: "cat-2" },
  { id: "prd-4", name: "Croissant", sku: "PRD-CROIS", price: 22000, categoryId: "cat-3" },
];
