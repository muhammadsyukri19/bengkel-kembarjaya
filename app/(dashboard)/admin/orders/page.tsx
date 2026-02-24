"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/layout/Sidebar";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { useOrders } from "@/hooks/useOrders";
import { OrderStatus } from "@/types";
import {
  formatCurrency,
  formatDateShort,
  getStatusColor,
  getStatusLabel,
} from "@/lib/utils";

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "semua">(
    "semua",
  );
  const { orders, isLoading, updateStatus } = useOrders({
    status: statusFilter,
  });

  const statusOptions = [
    { value: "semua", label: "Semua Status" },
    { value: "menunggu", label: "Menunggu" },
    { value: "diproses", label: "Diproses" },
    { value: "selesai", label: "Selesai" },
    { value: "dibatalkan", label: "Dibatalkan" },
  ];

  const nextStatus: Record<OrderStatus, OrderStatus | null> = {
    menunggu: "diproses",
    diproses: "selesai",
    selesai: null,
    dibatalkan: null,
  };

  return (
    <div>
      <DashboardHeader
        title="Manajemen Pesanan"
        subtitle="Kelola semua pesanan servis dari pelanggan"
        actions={
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as OrderStatus | "semua")
            }
            className="w-44"
          />
        }
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <Card>
          <CardBody className="py-16 text-center">
            <div className="text-5xl mb-3">📋</div>
            <p className="text-gray-500 font-medium">
              Tidak ada pesanan ditemukan
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardBody>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                        {order.id}
                      </span>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {order.userName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      🚗 {order.vehicleInfo}
                    </p>

                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div
                          key={item.serviceId}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">
                            • {item.serviceName}
                          </span>
                          <span className="text-gray-900 font-medium">
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {order.notes && (
                      <p className="mt-3 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                        📝 {order.notes}
                      </p>
                    )}
                  </div>

                  {/* Right */}
                  <div className="lg:text-right">
                    <div className="text-2xl font-bold text-orange-500 mb-1">
                      {formatCurrency(order.totalPrice)}
                    </div>
                    <p className="text-xs text-gray-400 mb-1">
                      Jadwal: {formatDateShort(order.scheduledAt)}
                    </p>
                    <p className="text-xs text-gray-400 mb-4">
                      Dibuat: {formatDateShort(order.createdAt)}
                    </p>

                    <div className="flex flex-wrap gap-2 lg:justify-end">
                      {nextStatus[order.status] && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            updateStatus(order.id, nextStatus[order.status]!)
                          }
                        >
                          {nextStatus[order.status] === "diproses"
                            ? "✅ Konfirmasi"
                            : "🏁 Selesaikan"}
                        </Button>
                      )}
                      {order.status === "menunggu" && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => updateStatus(order.id, "dibatalkan")}
                        >
                          Batalkan
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
