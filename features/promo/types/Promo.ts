export type PromoBadgeVariant = "public" | "expired";

export type PromoBadge = {
  label: string;
  variant: PromoBadgeVariant;
};

export type PromoListItem = {
  id: string;
  title: string;
  audience: string;
  channelLabel: string;
  expiredAtLabel: string;
  badge: PromoBadge;
};

export type PromoQuantityItem = {
  id: string;
  title: string;
  expiredAtLabel: string;
  salesDelta: number;
};

