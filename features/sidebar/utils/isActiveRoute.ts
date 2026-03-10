export function isActiveRoute(pathname: string, href: string) {
  const p = pathname || "/";
  const h = href || "/";
  return p === h || p.startsWith(`${h}/`);
}
