export function ordinal(n: number) {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export function formatHeaderDate(d: Date, locale = "en-US") {
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(d);
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(d);
  const year = new Intl.DateTimeFormat(locale, { year: "numeric" }).format(d);
  return `${weekday}, ${month} ${ordinal(d.getDate())}, ${year}`;
}
