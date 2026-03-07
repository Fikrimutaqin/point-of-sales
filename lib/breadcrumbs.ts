export type Crumb = { href: string; label: string; active: boolean };

function titleCase(s: string) {
  return s
    .split(/[-_]/g)
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1).toLowerCase() : ""))
    .join(" ")
    .replace(/\bId\b/g, "ID");
}

export function buildBreadcrumbs(pathname: string): Crumb[] {
  const clean = pathname.split("?")[0].split("#")[0];
  const parts = clean.split("/").filter(Boolean);
  const crumbs: Crumb[] = [];
  let acc = "";
  for (let i = 0; i < parts.length; i++) {
    acc += `/${parts[i]}`;
    const isLast = i === parts.length - 1;
    const raw = decodeURIComponent(parts[i]);
    const label = titleCase(raw);
    crumbs.push({ href: acc, label, active: isLast });
  }
  return crumbs;
}
