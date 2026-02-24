"use client";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types";

/**
 * Convenience wrapper around AuthContext.
 * Optionally redirects if user is not authenticated or lacks required role.
 */
export function useAuth(options?: {
  requiredRole?: UserRole;
  redirectTo?: string;
}) {
  const auth = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (auth.isLoading) return;
    if (!auth.isAuthenticated) {
      router.replace(options?.redirectTo ?? "/login");
      return;
    }
    if (options?.requiredRole && auth.user?.role !== options.requiredRole) {
      router.replace(auth.user?.role === "admin" ? "/admin" : "/user");
    }
  }, [
    auth.isLoading,
    auth.isAuthenticated,
    auth.user,
    options?.requiredRole,
    options?.redirectTo,
    router,
  ]);

  return auth;
}
