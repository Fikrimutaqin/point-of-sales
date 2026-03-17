import { BestSellerItem } from "./BestSellerItem";
import { BestSellerPeriod } from "./BestSellerPeriod";

export type Props = {
  title?: string;
  period?: BestSellerPeriod;
  onPeriodChange?: (p: BestSellerPeriod) => void;
  items?: BestSellerItem[];
  className?: string;
};
