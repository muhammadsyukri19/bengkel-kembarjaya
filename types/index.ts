// ============================================================
// TYPES — Kembar Jaya Motor
// ============================================================

export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
}

export type ServiceCategory =
  | "tune-up"
  | "ganti-oli"
  | "rem"
  | "ban"
  | "kelistrikan"
  | "body"
  | "lainnya";

export type OrderStatus = "menunggu" | "diproses" | "selesai" | "dibatalkan";

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  estimatedDuration: number; // in minutes
  imageUrl?: string;
}

export interface OrderItem {
  serviceId: string;
  serviceName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  vehicleId: string;
  vehicleInfo: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  notes?: string;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  service: Service;
  quantity: number;
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalServices: number;
}

export interface Testimonial {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
