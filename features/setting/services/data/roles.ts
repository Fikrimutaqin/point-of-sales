import type { Role } from "@/features/setting/types";

export const initialRoles: Role[] = [
  { id: "role-admin", name: "admin", description: "Full access" },
  { id: "role-cashier", name: "cashier", description: "POS access" },
  { id: "role-manager", name: "manager", description: "Reports & management" },
];
