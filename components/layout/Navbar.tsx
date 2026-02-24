"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuthContext();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">KJ</span>
            </div>
            <span className="text-white font-bold text-lg leading-tight">
              Kembar Jaya<span className="text-orange-400"> Motor</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#layanan"
              className="text-gray-300 hover:text-orange-400 text-sm font-medium transition-colors"
            >
              Layanan
            </Link>
            <Link
              href="#tentang"
              className="text-gray-300 hover:text-orange-400 text-sm font-medium transition-colors"
            >
              Tentang Kami
            </Link>
            <Link
              href="#kontak"
              className="text-gray-300 hover:text-orange-400 text-sm font-medium transition-colors"
            >
              Kontak
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link href={user?.role === "admin" ? "/admin" : "/user"}>
                <Button variant="primary" size="sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-800 space-y-1">
            {["#layanan", "#tentang", "#kontak"].map((href) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-gray-300 hover:text-orange-400 text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                {href === "#layanan"
                  ? "Layanan"
                  : href === "#tentang"
                    ? "Tentang Kami"
                    : "Kontak"}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gray-600 text-gray-300"
                >
                  Masuk
                </Button>
              </Link>
              <Link href="/register" className="flex-1">
                <Button variant="primary" size="sm" className="w-full">
                  Daftar
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">KJ</span>
              </div>
              <span className="text-white font-bold">Kembar Jaya Motor</span>
            </div>
            <p className="text-sm leading-relaxed">
              Bengkel motor terpercaya dengan teknisi berpengalaman dan
              peralatan modern.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Layanan</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Tune Up",
                "Ganti Oli",
                "Servis Rem",
                "Ganti Ban",
                "Kelistrikan",
              ].map((item) => (
                <li key={item}>
                  <span className="hover:text-orange-400 transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Jl. Raya Kembar No. 88, Surabaya</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <span>⏰</span>
                <span>Senin – Sabtu: 08.00 – 17.00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs">
          © {new Date().getFullYear()} {APP_NAME}. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
