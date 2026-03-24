import type { OrderItem } from "./OrderItem";
import type { OrderLocation } from "./OrderLocation";
import type { OrderStatus } from "./OrderStatus";

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  createdAtLabel: string;
  location: OrderLocation;
  status: OrderStatus;
  items: OrderItem[];
};

