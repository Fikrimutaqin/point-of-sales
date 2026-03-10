import {
  BarChart3,
  History,
  Home,
  LayoutGrid,
  Percent,
  Receipt,
} from "lucide-react";

export const dataMenu = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Menu", href: "/pos", icon: LayoutGrid },
  { label: "Order", href: "/order", icon: Receipt },
  { label: "Promo", href: "/promo", icon: Percent },
  { label: "Chart", href: "/chart", icon: BarChart3 },
  { label: "History", href: "/history", icon: History },
];