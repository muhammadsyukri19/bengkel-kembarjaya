import { Service, Order, User, Testimonial, DashboardStats } from "@/types";

// ============================================================
// APP CONSTANTS
// ============================================================
export const APP_NAME = "Kembar Jaya Motor";
export const APP_TAGLINE = "Servis Terpercaya, Kualitas Terjamin";
export const APP_ADDRESS = "Jl. Raya Kembar No. 88, Surabaya";
export const APP_PHONE = "+62 812-3456-7890";
export const APP_EMAIL = "kembarjayamotor@gmail.com";
export const APP_HOURS = "Senin - Sabtu: 08.00 - 17.00 WIB";

// ============================================================
// MOCK DATA — Services
// ============================================================
export const MOCK_SERVICES: Service[] = [
  {
    id: "svc-1",
    name: "Tune Up Lengkap",
    category: "tune-up",
    description:
      "Pemeriksaan dan penyetelan mesin menyeluruh termasuk busi, filter udara, dan karburator.",
    price: 150000,
    estimatedDuration: 120,
  },
  {
    id: "svc-2",
    name: "Ganti Oli Mesin",
    category: "ganti-oli",
    description:
      "Penggantian oli mesin menggunakan oli berkualitas tinggi sesuai spesifikasi motor Anda.",
    price: 75000,
    estimatedDuration: 30,
  },
  {
    id: "svc-3",
    name: "Ganti Oli Transmisi",
    category: "ganti-oli",
    description:
      "Penggantian oli transmisi untuk menjaga performa transmisi tetap optimal.",
    price: 60000,
    estimatedDuration: 30,
  },
  {
    id: "svc-4",
    name: "Servis Rem Depan & Belakang",
    category: "rem",
    description:
      "Pemeriksaan dan perbaikan sistem rem depan dan belakang secara menyeluruh.",
    price: 120000,
    estimatedDuration: 90,
  },
  {
    id: "svc-5",
    name: "Ganti Ban Depan",
    category: "ban",
    description:
      "Penggantian ban depan dengan ban baru berkualitas, termasuk balancing.",
    price: 200000,
    estimatedDuration: 45,
  },
  {
    id: "svc-6",
    name: "Ganti Ban Belakang",
    category: "ban",
    description:
      "Penggantian ban belakang dengan ban baru berkualitas, termasuk balancing.",
    price: 220000,
    estimatedDuration: 45,
  },
  {
    id: "svc-7",
    name: "Servis Aki & Kelistrikan",
    category: "kelistrikan",
    description:
      "Pemeriksaan aki, starter, lampu, dan seluruh sistem kelistrikan motor.",
    price: 100000,
    estimatedDuration: 60,
  },
  {
    id: "svc-8",
    name: "Cat & Body Repair",
    category: "body",
    description:
      "Perbaikan body motor dan pengecatan ulang dengan hasil rapi dan tahan lama.",
    price: 500000,
    estimatedDuration: 480,
  },
  {
    id: "svc-9",
    name: "Ganti Kampas Rem",
    category: "rem",
    description:
      "Penggantian kampas rem depan atau belakang dengan kampas rem original.",
    price: 85000,
    estimatedDuration: 45,
  },
  {
    id: "svc-10",
    name: "Servis Karburator",
    category: "tune-up",
    description:
      "Pembersihan dan penyetelan karburator untuk performa mesin yang optimal.",
    price: 80000,
    estimatedDuration: 60,
  },
];

// ============================================================
// MOCK DATA — Users
// ============================================================
export const MOCK_USERS: User[] = [
  {
    id: "usr-1",
    name: "Admin Kembar Jaya",
    email: "admin@kembarjaya.com",
    phone: "081234567890",
    role: "admin",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "usr-2",
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: "081298765432",
    role: "user",
    createdAt: "2024-06-15T00:00:00.000Z",
  },
  {
    id: "usr-3",
    name: "Siti Rahayu",
    email: "siti@example.com",
    phone: "085712345678",
    role: "user",
    createdAt: "2024-08-20T00:00:00.000Z",
  },
  {
    id: "usr-4",
    name: "Ahmad Fauzi",
    email: "ahmad@example.com",
    phone: "089987654321",
    role: "user",
    createdAt: "2024-09-10T00:00:00.000Z",
  },
];

// ============================================================
// MOCK DATA — Orders
// ============================================================
export const MOCK_ORDERS: Order[] = [
  {
    id: "ord-1",
    userId: "usr-2",
    userName: "Budi Santoso",
    vehicleId: "vhc-1",
    vehicleInfo: "Honda Beat 2020 - B 1234 ABC",
    items: [
      {
        serviceId: "svc-1",
        serviceName: "Tune Up Lengkap",
        price: 150000,
        quantity: 1,
      },
      {
        serviceId: "svc-2",
        serviceName: "Ganti Oli Mesin",
        price: 75000,
        quantity: 1,
      },
    ],
    totalPrice: 225000,
    status: "selesai",
    notes: "Tolong cek suara mesin yang agak kasar",
    scheduledAt: "2026-02-10T09:00:00.000Z",
    createdAt: "2026-02-08T14:00:00.000Z",
    updatedAt: "2026-02-10T11:30:00.000Z",
  },
  {
    id: "ord-2",
    userId: "usr-3",
    userName: "Siti Rahayu",
    vehicleId: "vhc-2",
    vehicleInfo: "Yamaha Mio 2022 - L 5678 DEF",
    items: [
      {
        serviceId: "svc-4",
        serviceName: "Servis Rem Depan & Belakang",
        price: 120000,
        quantity: 1,
      },
    ],
    totalPrice: 120000,
    status: "diproses",
    scheduledAt: "2026-02-24T10:00:00.000Z",
    createdAt: "2026-02-22T10:00:00.000Z",
    updatedAt: "2026-02-24T10:15:00.000Z",
  },
  {
    id: "ord-3",
    userId: "usr-4",
    userName: "Ahmad Fauzi",
    vehicleId: "vhc-3",
    vehicleInfo: "Suzuki Satria 2021 - K 9012 GHI",
    items: [
      {
        serviceId: "svc-5",
        serviceName: "Ganti Ban Depan",
        price: 200000,
        quantity: 1,
      },
      {
        serviceId: "svc-6",
        serviceName: "Ganti Ban Belakang",
        price: 220000,
        quantity: 1,
      },
    ],
    totalPrice: 420000,
    status: "menunggu",
    scheduledAt: "2026-02-26T08:00:00.000Z",
    createdAt: "2026-02-24T08:00:00.000Z",
    updatedAt: "2026-02-24T08:00:00.000Z",
  },
];

// ============================================================
// MOCK DATA — Dashboard Stats
// ============================================================
export const MOCK_STATS: DashboardStats = {
  totalOrders: 128,
  pendingOrders: 12,
  completedOrders: 105,
  totalRevenue: 28750000,
  totalCustomers: 74,
  totalServices: 10,
};

// ============================================================
// MOCK DATA — Testimonials
// ============================================================
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "tmn-1",
    userName: "Budi Santoso",
    rating: 5,
    comment:
      "Servis di sini sangat memuaskan! Mekaniknya ramah dan profesional, motor saya jadi lebih enak dikendarai.",
    date: "2026-02-10",
  },
  {
    id: "tmn-2",
    userName: "Siti Rahayu",
    rating: 5,
    comment:
      "Harga terjangkau dan hasilnya bagus. Pelayanan cepat, tidak perlu nunggu lama. Sangat direkomendasikan!",
    date: "2026-02-15",
  },
  {
    id: "tmn-3",
    userName: "Ahmad Fauzi",
    rating: 4,
    comment:
      "Bengkel terpercaya di daerah sini. Sudah langganan 3 tahun dan selalu puas dengan hasilnya.",
    date: "2026-01-28",
  },
  {
    id: "tmn-4",
    userName: "Rina Wahyuni",
    rating: 5,
    comment:
      "Motor saya sudah lama tidak dirawat, setelah servis di sini rasanya seperti baru lagi. Terima kasih!",
    date: "2026-02-05",
  },
];

// ============================================================
// NAV ITEMS
// ============================================================
export const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/orders", label: "Pesanan", icon: "ClipboardList" },
  { href: "/admin/services", label: "Layanan", icon: "Wrench" },
  { href: "/admin/customers", label: "Pelanggan", icon: "Users" },
];

export const USER_NAV_ITEMS = [
  { href: "/user", label: "Beranda", icon: "Home" },
  { href: "/user/services", label: "Layanan", icon: "Wrench" },
  { href: "/user/orders", label: "Pesanan Saya", icon: "ClipboardList" },
  { href: "/user/profile", label: "Profil", icon: "User" },
];
