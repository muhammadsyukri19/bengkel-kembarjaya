"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, UserRole } from "@/types";
import { MOCK_USERS } from "@/lib/constants";

// ============================================================
// Types
// ============================================================
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; role?: UserRole; message?: string }>;
  register: (
    data: RegisterData,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// ============================================================
// Context
// ============================================================
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============================================================
// Provider
// ============================================================
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading persisted session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("kjm_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("kjm_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; role?: UserRole; message?: string }> => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800));

    const found = MOCK_USERS.find((u) => u.email === email);

    if (!found) {
      setIsLoading(false);
      return { success: false, message: "Email tidak ditemukan." };
    }

    // In real app, compare hashed password. Here we accept any password for mock.
    if (password.length < 6) {
      setIsLoading(false);
      return { success: false, message: "Password minimal 6 karakter." };
    }

    setUser(found);
    localStorage.setItem("kjm_user", JSON.stringify(found));
    setIsLoading(false);
    return { success: true, role: found.role };
  };

  const register = async (
    data: RegisterData,
  ): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const exists = MOCK_USERS.find((u) => u.email === data.email);
    if (exists) {
      setIsLoading(false);
      return { success: false, message: "Email sudah terdaftar." };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: "user",
      createdAt: new Date().toISOString(),
    };

    // In real app, POST to API. Here we just set it locally.
    setUser(newUser);
    localStorage.setItem("kjm_user", JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kjm_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ============================================================
// Hook
// ============================================================
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
