"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/layout/Sidebar";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_USERS } from "@/lib/constants";
import { formatDate, getInitials } from "@/lib/utils";

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  const customers = MOCK_USERS.filter((u) => u.role === "user").filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <DashboardHeader
        title="Data Pelanggan"
        subtitle="Daftar semua pelanggan terdaftar"
        actions={
          <input
            type="text"
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        }
      />

      <Card>
        <CardBody className="p-0 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["Pelanggan", "Email", "No. HP", "Bergabung", "Status"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    Tidak ada pelanggan ditemukan.
                  </td>
                </tr>
              ) : (
                customers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400 font-mono">
                            {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">
                      {user.phone}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="success">Aktif</Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
