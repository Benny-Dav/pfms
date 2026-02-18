import { type ClassValue, clsx } from "clsx";

/**
 * Merge Tailwind class names conditionally.
 * Lightweight alternative to clsx + twMerge for Phase 1.
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .join(" ");
}

/**
 * Format a number as GH₵ currency (or the tenant's configured currency).
 */
export function formatCurrency(
  amount: number | string,
  currency = "GHS",
  locale = "en-GH"
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Format a date for display.
 */
export function formatDate(date: Date | string, locale = "en-GH"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Derive egg stock metrics from totals.
 */
export function deriveStockMetrics(eggsProduced: number, eggsSold: number) {
  const eggsOnHand = eggsProduced - eggsSold;
  const sellableCrates = Math.floor(eggsOnHand / 30);
  const looseEggs = eggsOnHand % 30;
  return { eggsOnHand, sellableCrates, looseEggs };
}

/**
 * Check if a record is still within the 10-minute edit window.
 */
export function isWithinEditWindow(createdAt: Date | string): boolean {
  const created = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  const tenMinutesMs = 10 * 60 * 1000;
  return Date.now() - created.getTime() < tenMinutesMs;
}
