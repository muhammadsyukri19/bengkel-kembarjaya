"use client";

import { DashboardHeader } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/ui/StatsCard";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuthContext } from "@/context/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { MOCK_STATS } from "@/lib/constants";
import {
  formatCurrency,
  formatDateShort,
  getStatusColor,
  getStatusLabel,
} from "@/lib/utils";

export default function AdminDashboardPage() {
  const { user } = useAuthContext();
  const { orders } = useOrders();

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <DashboardHeader
        title={`Halo, ${user?.name?.split(" ")[0]} 👋`}
        subtitle={`Selamat datang di panel admin Kembar Jaya Motor — ${new Date().toLocaleDateString("id-ID", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        <StatsCard
          title="Total Pesanan"
          value={MOCK_STATS.totalOrders}
          subtitle="Sepanjang waktu"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
          trend={{ value: 12, label: "bulan ini" }}
          color="blue"
        />
        <StatsCard
          title="Menunggu Konfirmasi"
          value={MOCK_STATS.pendingOrders}
          subtitle="Perlu tindakan segera"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          color="orange"
        />
        <StatsCard
          title="Selesai"
          value={MOCK_STATS.completedOrders}
          subtitle="Berhasil diselesaikan"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          trend={{ value: 8, label: "bulan ini" }}
          color="green"
        />
        <StatsCard
          title="Total Pendapatan"
          value={formatCurrency(MOCK_STATS.totalRevenue)}
          subtitle="Akumulasi semua pesanan selesai"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          trend={{ value: 15, label: "vs bulan lalu" }}
          color="purple"
        />
        <StatsCard
          title="Total Pelanggan"
          value={MOCK_STATS.totalCustomers}
          subtitle="Pengguna terdaftar"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
          trend={{ value: 5, label: "bulan ini" }}
          color="blue"
        />
        <StatsCard
          title="Total Layanan"
          value={MOCK_STATS.totalServices}
          subtitle="Layanan tersedia"
          icon={
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
            </svg>
          }
          color="green"
        />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="p-5 pb-0 flex items-center justify-between flex-row">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Pesanan Terbaru</h2>
            <p className="text-sm text-gray-500">3 pesanan aktif saat ini</p>
          </div>
          <a
            href="/admin/orders"
            className="text-sm text-orange-500 hover:text-orange-600 font-medium"
          >
            Lihat semua →
          </a>
        </CardHeader>
        <CardBody className="p-0 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  ID
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  Pelanggan
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  Kendaraan
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  Total
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  Jadwal
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5 text-sm font-mono text-gray-500">
                    {order.id}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-900">
                    {order.userName}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">
                    {order.vehicleInfo}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">
                    {formatCurrency(order.totalPrice)}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">
                    {formatDateShort(order.scheduledAt)}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
