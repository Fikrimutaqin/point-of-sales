export type MenuCategory = {
  id: string;
  label: string;
  itemsCount: number;
  icon?: React.ElementType<{ className?: string }>;
};