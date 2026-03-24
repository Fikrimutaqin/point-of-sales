import type { Order } from "@/features/order/types";

export const defaultOrders: Order[] = [
  {
    id: "order-044",
    orderNumber: "#044",
    customerName: "Robert Fox",
    createdAtLabel: "7 Apr, 11:30 AM",
    location: { type: "table", label: "Table 03" },
    status: "new",
    items: [
      { id: "i-1", name: "Cheese Burger", quantity: 1, price: 12 },
      { id: "i-2", name: "Lemonade", quantity: 1, price: 4 },
    ],
  },
  {
    id: "order-043",
    orderNumber: "#043",
    customerName: "Jenny Wilson",
    createdAtLabel: "7 Apr, 11:25 AM",
    location: { type: "table", label: "Table 05" },
    status: "cooking",
    items: [
      { id: "i-1", name: "Cheese Burger", quantity: 1, price: 12 },
      { id: "i-2", name: "Salad with Sesame", quantity: 2, price: 16 },
    ],
  },
  {
    id: "order-042",
    orderNumber: "#042",
    customerName: "Cameron William",
    createdAtLabel: "7 Apr, 11:10 AM",
    location: { type: "takeaway", label: "Takeaway" },
    status: "ready",
    items: [
      { id: "i-1", name: "Special Sandwich Grill", quantity: 1, price: 14 },
      { id: "i-2", name: "Sparkling Water", quantity: 1, price: 4 },
    ],
  },
  {
    id: "order-041",
    orderNumber: "#041",
    customerName: "Olivia Hart",
    createdAtLabel: "7 Apr, 11:09 AM",
    location: { type: "table", label: "Table 06" },
    status: "cooking",
    items: [
      { id: "i-1", name: "Salad with Sesame", quantity: 2, price: 16 },
      { id: "i-2", name: "Noodles with Chicken", quantity: 1, price: 12 },
    ],
  },
];

