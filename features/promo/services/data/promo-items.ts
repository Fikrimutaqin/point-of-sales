import type { PromoListItem, PromoQuantityItem } from "@/features/promo/types";

export const promoProgressItems: PromoListItem[] = [
  {
    id: "p-1",
    title: "Buy 2 Get 1",
    audience: "Men Collection",
    channelLabel: "Via Barcode Code",
    expiredAtLabel: "Expired date 23 April 2024",
    badge: { label: "Public", variant: "public" },
  },
  {
    id: "p-2",
    title: "Discount 20%",
    audience: "Women Collection",
    channelLabel: "Via Barcode Code",
    expiredAtLabel: "Expired date 23 April 2024",
    badge: { label: "Public", variant: "public" },
  },
  {
    id: "p-3",
    title: "Discount 15%",
    audience: "All Product",
    channelLabel: "Via Debit Card",
    expiredAtLabel: "Expired date 29 April 2024",
    badge: { label: "Public", variant: "public" },
  },
];

export const promoExpiredItems: PromoListItem[] = [
  {
    id: "e-1",
    title: "Discount 40%",
    audience: "Kids Collection",
    channelLabel: "Via Barcode Code",
    expiredAtLabel: "Expired date 23 April 2024",
    badge: { label: "Expired", variant: "expired" },
  },
  {
    id: "e-2",
    title: "Discount 25%",
    audience: "Women Collection",
    channelLabel: "Via Barcode Code",
    expiredAtLabel: "Expired date 23 April 2024",
    badge: { label: "Expired", variant: "expired" },
  },
  {
    id: "e-3",
    title: "Discount 15%",
    audience: "All Product",
    channelLabel: "Via Debit Card",
    expiredAtLabel: "Expired date 29 April 2024",
    badge: { label: "Expired", variant: "expired" },
  },
];

export const promoQuantityItems: PromoQuantityItem[] = [
  {
    id: "q-1",
    title: "Buy 2 Get 1",
    expiredAtLabel: "Expired date 23 April 2024",
    salesDelta: 100,
  },
  {
    id: "q-2",
    title: "Discount 20%",
    expiredAtLabel: "Expired date 23 April 2024",
    salesDelta: 55,
  },
  {
    id: "q-3",
    title: "Discount 15%",
    expiredAtLabel: "Expired date 29 April 2024",
    salesDelta: 124,
  },
];

