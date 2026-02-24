"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/layout/Sidebar";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useServices } from "@/hooks/useServices";
import { formatCurrency, getCategoryLabel } from "@/lib/utils";
import { ServiceCategory } from "@/types";

const CATEGORIES: { value: ServiceCategory | "semua"; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "tune-up", label: "Tune Up" },
  { value: "ganti-oli", label: "Ganti Oli" },
  { value: "rem", label: "Rem" },
  { value: "ban", label: "Ban" },
  { value: "kelistrikan", label: "Kelistrikan" },
  { value: "body", label: "Body" },
];

export default function UserServicesPage() {
  const [activeCategory, setActiveCategory] = useState<
    ServiceCategory | "semua"
  >("semua");
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const { services, isLoading } = useServices({
    category: activeCategory,
    search,
  });
  const {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    isInCart,
    clearCart,
  } = useCart();

  return (
    <div>
      <DashboardHeader
        title="Pilih Layanan Servis"
        subtitle="Pilih satu atau lebih layanan untuk memulai booking"
        actions={
          <button
            onClick={() => setShowCart(true)}
            className="relative inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors"
          >
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Keranjang
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-white text-orange-500 text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        }
      />

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Cari layanan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                activeCategory === cat.value
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {services.map((service) => {
            const inCart = isInCart(service.id);
            return (
              <Card
                key={service.id}
                className={`transition-all ${inCart ? "ring-2 ring-orange-400" : ""}`}
              >
                <CardBody>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600">
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <Badge variant="outline">
                      {getCategoryLabel(service.category)}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-orange-500 font-bold text-lg">
                      {formatCurrency(service.price)}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg">
                      ⏱ {service.estimatedDuration} mnt
                    </span>
                  </div>

                  {inCart ? (
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-full"
                      onClick={() => removeItem(service.id)}
                    >
                      ✓ Hapus dari Keranjang
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => addItem(service)}
                    >
                      + Tambah ke Keranjang
                    </Button>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCart(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-bold text-gray-900">
                Keranjang Servis
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="text-gray-400">Keranjang masih kosong</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.service.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">
                        {item.service.name}
                      </p>
                      <p className="text-xs text-orange-500 font-medium">
                        {formatCurrency(item.service.price)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.service.id)}
                      className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-700">Total</span>
                  <span className="text-xl font-bold text-orange-500">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <Button variant="primary" size="lg" className="w-full mb-2">
                  Lanjut ke Booking
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-gray-400"
                  onClick={clearCart}
                >
                  Kosongkan Keranjang
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
