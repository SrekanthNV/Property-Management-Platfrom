import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string, format: "short" | "long" | "relative" = "short"): string {
  const d = new Date(date);

  if (format === "relative") {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
  }

  if (format === "long") {
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function calculateOccupancyRate(occupied: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((occupied / total) * 100);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    COMPLETED: "text-success-700 bg-success-50",
    PENDING: "text-warning-700 bg-warning-50",
    FAILED: "text-danger-700 bg-danger-50",
    REFUNDED: "text-surface-500 bg-surface-100",
    OPEN: "text-brand-700 bg-brand-50",
    IN_PROGRESS: "text-warning-700 bg-warning-50",
    WAITING: "text-surface-500 bg-surface-100",
    RESOLVED: "text-success-700 bg-success-50",
    CLOSED: "text-surface-500 bg-surface-100",
    ACTIVE: "text-success-700 bg-success-50",
    EXPIRED: "text-danger-700 bg-danger-50",
    TERMINATED: "text-danger-700 bg-danger-50",
    LOW: "text-surface-500 bg-surface-100",
    MEDIUM: "text-brand-700 bg-brand-50",
    HIGH: "text-warning-700 bg-warning-50",
    URGENT: "text-danger-700 bg-danger-50",
    VACANT: "text-success-700 bg-success-50",
    OCCUPIED: "text-brand-700 bg-brand-50",
    MAINTENANCE: "text-warning-700 bg-warning-50",
  };
  return colors[status] || "text-surface-500 bg-surface-100";
}

export function getPriorityIcon(priority: string): string {
  const icons: Record<string, string> = {
    LOW: "↓",
    MEDIUM: "→",
    HIGH: "↑",
    URGENT: "⚡",
  };
  return icons[priority] || "→";
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
