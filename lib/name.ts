export function getFirstLast(fullNameOrEmail: string): { first: string; last: string } {
  const input = (fullNameOrEmail || "").trim();
  if (!input) return { first: "", last: "" };
  const base = input.includes("@") ? input.split("@")[0] : input;
  const parts = base
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean);
  const first = parts[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1] : "";
  return { first, last };
}

export function getInitials(fullNameOrEmail: string, max = 2): string {
  const { first, last } = getFirstLast(fullNameOrEmail);
  const initials =
    (first[0] || "") + (last ? last[0] || "" : first[1] || "");
  return initials.toUpperCase().slice(0, Math.max(1, max));
}
