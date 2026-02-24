"use client";

import { useState, useEffect, useMemo } from "react";
import { Order, OrderStatus } from "@/types";
import { MOCK_ORDERS } from "@/lib/constants";

interface UseOrdersOptions {
  userId?: string; // filter by userId for regular users; omit for admin (all orders)
  status?: OrderStatus | "semua";
}

export function useOrders({ userId, status = "semua" }: UseOrdersOptions = {}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders(MOCK_ORDERS);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchUser = !userId || o.userId === userId;
      const matchStatus = status === "semua" || o.status === status;
      return matchUser && matchStatus;
    });
  }, [orders, userId, status]);

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, updatedAt: new Date().toISOString() }
          : o,
      ),
    );
  };

  return { orders: filtered, allOrders: orders, isLoading, updateStatus };
}
