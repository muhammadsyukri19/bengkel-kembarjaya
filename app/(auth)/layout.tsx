import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="p-5">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">KJ</span>
          </div>
          <span className="text-white font-bold group-hover:text-orange-400 transition-colors">
            {APP_NAME}
          </span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </div>
  );
}
