export type MenuProduct = {
  id: string;
  name: string;
  description: string;
  priceMin: number;
  priceMax: number;
  imageUrl?: string;
  available: boolean;
  onAdd?: (id: string, qty: number) => void;
  className?: string;
};