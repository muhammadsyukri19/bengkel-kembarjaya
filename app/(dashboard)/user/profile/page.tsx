"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/layout/Sidebar";
import { Card, CardBody, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useAuthContext } from "@/context/AuthContext";
import { getInitials, formatDate } from "@/lib/utils";

export default function UserProfilePage() {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In real app: PATCH /api/user
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <DashboardHeader
        title="Profil Saya"
        subtitle="Kelola informasi akun Anda"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1 h-fit">
          <CardBody className="text-center py-8">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg shadow-orange-200">
              {user ? getInitials(user.name) : "?"}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
            <div className="mt-3">
              <Badge variant={user?.role === "admin" ? "warning" : "success"}>
                {user?.role === "admin" ? "Administrator" : "Pelanggan"}
              </Badge>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Bergabung sejak {user ? formatDate(user.createdAt) : "-"}
            </p>
          </CardBody>
        </Card>

        {/* Edit Form */}
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Informasi Akun
              </h2>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Edit Profil
                </Button>
              )}
            </div>

            {saved && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-600">
                ✅ Profil berhasil disimpan!
              </div>
            )}

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Nama Lengkap
                </label>
                {isEditing ? (
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user?.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email
                </label>
                <p className="text-gray-900 font-medium">{user?.email}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Email tidak dapat diubah
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Nomor HP
                </label>
                {isEditing ? (
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{user?.phone}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Peran
                </label>
                <p className="text-gray-900 font-medium capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </CardBody>

          {isEditing && (
            <CardFooter className="flex gap-2 justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Batal
              </Button>
              <Button variant="primary" size="sm" onClick={handleSave}>
                Simpan Perubahan
              </Button>
            </CardFooter>
          )}
        </Card>

        {/* Password Section */}
        <Card className="lg:col-span-3">
          <CardBody>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Keamanan Akun
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Untuk keamanan, ubah password secara berkala.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1.5">
                  Password Lama
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1.5">
                  Password Baru
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1.5">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="block w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="secondary" size="sm">
                Ubah Password
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
