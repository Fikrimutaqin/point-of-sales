export type Item = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type HeaderUser = {
  name: string;
  email: string;
  avatar: string;
  role: "USER" | "ADMIN" | "UNKNOWN";
};