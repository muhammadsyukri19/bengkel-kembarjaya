"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Nama harus diisi.";
  if (!form.email) errors.email = "Email harus diisi.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Format email tidak valid.";
  if (!form.phone) errors.phone = "Nomor HP harus diisi.";
  if (!form.password) errors.password = "Password harus diisi.";
  else if (form.password.length < 6)
    errors.password = "Password minimal 6 karakter.";
  if (form.confirmPassword !== form.password)
    errors.confirmPassword = "Password tidak cocok.";
  return errors;
}

export default function RegisterPage() {
  const { register } = useAuthContext();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    const result = await register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });
    setIsLoading(false);
    if (!result.success) {
      setErrors({ general: result.message });
      return;
    }
    router.replace("/user");
  };

  const fields: {
    name: keyof FormData;
    label: string;
    type: string;
    placeholder: string;
  }[] = [
    {
      name: "name",
      label: "Nama Lengkap",
      type: "text",
      placeholder: "Budi Santoso",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "email@contoh.com",
    },
    {
      name: "phone",
      label: "Nomor HP",
      type: "tel",
      placeholder: "08xxxxxxxxxx",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
    {
      name: "confirmPassword",
      label: "Konfirmasi Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <div className="w-full max-w-md">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Buat Akun Baru</h1>
            <p className="text-gray-400 text-sm mt-1">
              Daftar dan mulai booking servis motor Anda
            </p>
          </div>

          {/* General error */}
          {errors.general && (
            <div className="mb-5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
              {errors.general}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  {field.label}
                </label>
                <input
                  name={field.name}
                  type={field.type}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`block w-full rounded-xl border px-4 py-2.5 text-sm text-white placeholder:text-gray-500 bg-gray-800 focus:outline-none focus:ring-2 focus:border-transparent transition duration-150 ${
                    errors[field.name]
                      ? "border-red-500/70 focus:ring-red-400"
                      : "border-gray-700 focus:ring-orange-400"
                  }`}
                />
                {errors[field.name] && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              {isLoading ? "Mendaftarkan..." : "Daftar Sekarang"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
            >
              Masuk di sini
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
