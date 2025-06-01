import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatNumber(
  number: number,
  options: { decimals?: number; prefix?: string; suffix?: string } = {}
): string {
  const { decimals = 2, prefix = "", suffix = "" } = options;
  const formatted = number.toFixed(decimals);
  return `${prefix}${formatted}${suffix}`;
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
