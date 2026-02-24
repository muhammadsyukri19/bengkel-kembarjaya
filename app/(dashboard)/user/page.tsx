"use client";

import Link from "next/link";
import { DashboardHeader } from "@/components/layout/Sidebar";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuthContext } from "@/context/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import {
  formatCurrency,
  formatDateShort,
  getStatusColor,
  getStatusLabel,
} from "@/lib/utils";
import { APP_PHONE, APP_HOURS } from "@/lib/constants";

export default function UserDashboardPage() {
  const { user } = useAuthContext();
  const { orders } = useOrders({ userId: user?.id });

  const pendingOrders = orders.filter(
    (o) => o.status === "menunggu" || o.status === "diproses",
  );
  const completedOrders = orders.filter((o) => o.status === "selesai");
  const recentOrders = orders.slice(0, 3);

  return (
    <div>
      <DashboardHeader
        title={`Halo, ${user?.name?.split(" ")[0]} 👋`}
        subtitle="Selamat datang di portal servis Kembar Jaya Motor"
        actions={
          <Link href="/user/services">
            <Button variant="primary" size="sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Booking Servis
            </Button>
          </Link>
        }
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <Card className="border-l-4 border-l-orange-400">
          <CardBody className="py-4">
            <p className="text-sm text-gray-500">Total Pesanan</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {orders.length}
            </p>
          </CardBody>
        </Card>
        <Card className="border-l-4 border-l-blue-400">
          <CardBody className="py-4">
            <p className="text-sm text-gray-500">Sedang Berjalan</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {pendingOrders.length}
            </p>
          </CardBody>
        </Card>
        <Card className="border-l-4 border-l-green-400">
          <CardBody className="py-4">
            <p className="text-sm text-gray-500">Selesai</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {completedOrders.length}
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardBody className="p-5 pb-0 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Pesanan Terbaru</h2>
              <Link
                href="/user/orders"
                className="text-sm text-orange-500 hover:text-orange-600 font-medium"
              >
                Lihat semua →
              </Link>
            </CardBody>
            <CardBody className="pt-4">
              {recentOrders.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-3">📋</div>
                  <p className="text-gray-500 mb-4">Belum ada pesanan</p>
                  <Link href="/user/services">
                    <Button variant="primary" size="sm">
                      Mulai Booking
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">
                            {order.items.map((i) => i.serviceName).join(", ")}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          🚗 {order.vehicleInfo}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          📅 {formatDateShort(order.scheduledAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-500 text-sm mb-1">
                          {formatCurrency(order.totalPrice)}
                        </p>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <Card>
            <CardBody>
              <h2 className="font-bold text-gray-900 mb-4">Aksi Cepat</h2>
              <div className="space-y-2">
                {[
                  {
                    href: "/user/services",
                    label: "Pesan Servis Baru",
                    icon: "🔧",
                  },
                  {
                    href: "/user/orders",
                    label: "Cek Status Pesanan",
                    icon: "📋",
                  },
                  { href: "/user/profile", label: "Kelola Profil", icon: "👤" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all group cursor-pointer">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600">
                        {item.label}
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-300 group-hover:text-orange-400 ml-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Contact */}
          <Card className="bg-gray-900 text-white border-0">
            <CardBody>
              <h2 className="font-bold mb-3">Butuh Bantuan?</h2>
              <p className="text-gray-400 text-sm mb-4">
                Hubungi kami langsung untuk pertanyaan tentang servis motor
                Anda.
              </p>
              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <p>📞 {APP_PHONE}</p>
                <p>⏰ {APP_HOURS}</p>
              </div>
              <a href={`tel:${APP_PHONE}`}>
                <Button variant="primary" size="sm" className="w-full">
                  Hubungi Kami
                </Button>
              </a>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
