"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/layout/Sidebar";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { useAuthContext } from "@/context/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import { OrderStatus } from "@/types";
import {
  formatCurrency,
  formatDateShort,
  getStatusColor,
  getStatusLabel,
} from "@/lib/utils";
import Link from "next/link";

export default function UserOrdersPage() {
  const { user } = useAuthContext();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "semua">(
    "semua",
  );
  const { orders, isLoading } = useOrders({
    userId: user?.id,
    status: statusFilter,
  });

  const statusOptions = [
    { value: "semua", label: "Semua Status" },
    { value: "menunggu", label: "Menunggu" },
    { value: "diproses", label: "Diproses" },
    { value: "selesai", label: "Selesai" },
    { value: "dibatalkan", label: "Dibatalkan" },
  ];

  const statusSteps: OrderStatus[] = ["menunggu", "diproses", "selesai"];

  return (
    <div>
      <DashboardHeader
        title="Pesanan Saya"
        subtitle="Riwayat dan status semua pesanan servis Anda"
        actions={
          <div className="flex items-center gap-3">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as OrderStatus | "semua")
              }
              className="w-40"
            />
            <Link href="/user/services">
              <Button variant="primary" size="sm">
                + Booking Baru
              </Button>
            </Link>
          </div>
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardBody className="py-16 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500 font-medium mb-2">
              Tidak ada pesanan ditemukan
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Mulai pesan layanan servis untuk motor Anda
            </p>
            <Link href="/user/services">
              <Button variant="primary">Lihat Layanan</Button>
            </Link>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const currentStep = statusSteps.indexOf(
              order.status as OrderStatus,
            );
            return (
              <Card key={order.id}>
                <CardBody>
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                          {order.id}
                        </span>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        🚗 {order.vehicleInfo}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      📅 Jadwal:{" "}
                      <span className="font-medium text-gray-700">
                        {formatDateShort(order.scheduledAt)}
                      </span>
                    </div>
                  </div>

                  {/* Progress Tracker (for non-cancelled) */}
                  {order.status !== "dibatalkan" && (
                    <div className="flex items-center mb-5">
                      {statusSteps.map((step, idx) => (
                        <div
                          key={step}
                          className="flex items-center flex-1 last:flex-none"
                        >
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                idx <= currentStep
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-200 text-gray-400"
                              }`}
                            >
                              {idx < currentStep ? "✓" : idx + 1}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                              {getStatusLabel(step)}
                            </p>
                          </div>
                          {idx < statusSteps.length - 1 && (
                            <div
                              className={`flex-1 h-0.5 mx-2 mb-4 ${idx < currentStep ? "bg-orange-400" : "bg-gray-200"}`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Items */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Layanan Dipesan
                    </p>
                    <div className="space-y-1.5">
                      {order.items.map((item) => (
                        <div
                          key={item.serviceId}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-700">
                            • {item.serviceName}
                          </span>
                          <span className="font-medium text-gray-900">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.notes && (
                    <p className="text-sm text-gray-500 mb-4 italic">
                      📝 Catatan: {order.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-500">
                        Total Tagihan:{" "}
                      </span>
                      <span className="text-xl font-bold text-orange-500">
                        {formatCurrency(order.totalPrice)}
                      </span>
                    </div>
                    {order.status === "selesai" && (
                      <Button variant="outline" size="sm">
                        ⭐ Beri Ulasan
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
