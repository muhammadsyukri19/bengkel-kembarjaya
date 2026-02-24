"use client";

import { useState, useEffect, useMemo } from "react";
import { Service, ServiceCategory } from "@/types";
import { MOCK_SERVICES } from "@/lib/constants";

interface UseServicesOptions {
  category?: ServiceCategory | "semua";
  search?: string;
}

export function useServices({
  category = "semua",
  search = "",
}: UseServicesOptions = {}) {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setServices(MOCK_SERVICES);
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchCat = category === "semua" || s.category === category;
      const matchSearch =
        search === "" ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [services, category, search]);

  return { services: filtered, allServices: services, isLoading };
}
