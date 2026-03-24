export type PromoVisibility = "public" | "private";
export type PromoManageStatus = "active" | "expired";

export type PromoChannel = {
  label: string;
};

export type ManagePromo = {
  id: string;
  title: string;
  description: string;
  channel: PromoChannel;
  validUntilLabel: string;
  visibility: PromoVisibility;
  status: PromoManageStatus;
};

export type ManagePromoFilterKey = "all" | "public" | "private" | "expired";

