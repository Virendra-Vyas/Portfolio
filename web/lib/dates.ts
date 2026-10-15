import type { YearMonth } from "@/content/schema";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "August 2022", matching how dates are written on the CV. */
export function formatYearMonth({ year, month }: YearMonth): string {
  return `${MONTHS[month - 1]} ${year}`;
}

/** Machine-readable value for <time dateTime>, e.g. "2022-08". */
export function isoYearMonth({ year, month }: YearMonth): string {
  return `${year}-${String(month).padStart(2, "0")}`;
}
