"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardBody } from "@/components/ui/Card";

export default function LoginPage() {
  const { login } = useAuthContext();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email dan password harus diisi.");
      return;
    }
    setIsLoading(true);
    const result = await login(form.email, form.password);
    setIsLoading(false);
    if (!result.success) {
      setError(result.message ?? "Login gagal.");
      return;
    }
    router.replace(result.role === "admin" ? "/admin" : "/user");
  };

  // Demo hints
  const demoAccounts = [
    { label: "Admin", email: "admin@kembarjaya.com" },
    { label: "User", email: "budi@example.com" },
  ];

  return (
    <div className="w-full max-w-md">
      {/* Card */}
      <Card className="shadow-2xl border-gray-800 bg-gray-900">
        <CardBody className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Selamat Datang</h1>
            <p className="text-gray-400 text-sm mt-1">
              Masuk ke akun Kembar Jaya Motor Anda
            </p>
          </div>

          {/* Demo hint */}
          <div className="mb-6 bg-gray-800/60 rounded-xl p-3 border border-gray-700">
            <p className="text-xs text-gray-400 font-medium mb-2">
              🔑 Demo akun (gunakan password apa saja 6+ karakter):
            </p>
            <div className="flex gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.label}
                  type="button"
                  onClick={() =>
                    setForm({ email: acc.email, password: "password123" })
                  }
                  className="text-xs bg-gray-700 hover:bg-orange-500/20 hover:text-orange-400 text-gray-300 border border-gray-600 hover:border-orange-500/50 rounded-lg px-3 py-1.5 transition-all"
                >
                  {acc.label}: {acc.email}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email@contoh.com"
                autoComplete="email"
                className="block w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                className="block w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-150"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>

          {/* Footer link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
            >
              Daftar sekarang
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
