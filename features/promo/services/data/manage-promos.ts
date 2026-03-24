import type { ManagePromo } from "@/features/promo/types";

export const managePromos: ManagePromo[] = [
  {
    id: "m-1",
    channel: { label: "Via Barcode Code" },
    title: "Buy 2 Get 1",
    description: "For All Men Collection, All Women Collection",
    validUntilLabel: "Valid Until 23 April 2024",
    visibility: "public",
    status: "active",
  },
  {
    id: "m-2",
    channel: { label: "Via Payment with Credit Card" },
    title: "Discount 15%",
    description: "All Product at store",
    validUntilLabel: "Valid Until 29 April 2024",
    visibility: "private",
    status: "active",
  },
  {
    id: "m-3",
    channel: { label: "Via Barcode Code" },
    title: "Discount 20%",
    description: "For All Women Collection",
    validUntilLabel: "Valid Until 23 April 2024",
    visibility: "public",
    status: "active",
  },
  {
    id: "m-4",
    channel: { label: "Via Barcode Code" },
    title: "Discount 40%",
    description: "For Kids Collection",
    validUntilLabel: "Valid Until 23 April 2024",
    visibility: "public",
    status: "expired",
  },
];

