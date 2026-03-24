import type { User } from "@/features/setting/types";

export const initialUsers: User[] = [
  { id: "usr-1", name: "Steven", email: "steven@example.com", roleId: "role-admin" },
  { id: "usr-2", name: "Annisa", email: "annisa@example.com", roleId: "role-cashier" },
  { id: "usr-3", name: "Bima", email: "bima@example.com", roleId: "role-manager" },
];
