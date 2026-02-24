import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { OrderStatus, ServiceCategory } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export function formatDateShort(dateString: string): string {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function getStatusLabel(status: OrderStatus): string {
  const labels: Record<OrderStatus, string> = {
    menunggu: "Menunggu",
    diproses: "Diproses",
    selesai: "Selesai",
    dibatalkan: "Dibatalkan",
  };
  return labels[status];
}

export function getStatusColor(status: OrderStatus): string {
  const colors: Record<OrderStatus, string> = {
    menunggu: "bg-yellow-100 text-yellow-800 border-yellow-200",
    diproses: "bg-blue-100 text-blue-800 border-blue-200",
    selesai: "bg-green-100 text-green-800 border-green-200",
    dibatalkan: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[status];
}

export function getCategoryLabel(category: ServiceCategory): string {
  const labels: Record<ServiceCategory, string> = {
    "tune-up": "Tune Up",
    "ganti-oli": "Ganti Oli",
    rem: "Rem",
    ban: "Ban",
    kelistrikan: "Kelistrikan",
    body: "Body",
    lainnya: "Lainnya",
  };
  return labels[category];
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
