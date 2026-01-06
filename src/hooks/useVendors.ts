import { useQuery } from "@tanstack/react-query";
import { fetchVendors, fetchVendorBySlug } from "@/lib/vendors";
import type { Vendor } from "@/data/vendors";

// Hook to fetch all vendors from Supabase
export const useVendors = () => {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      return await fetchVendors();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to fetch vendor by slug from Supabase
export const useVendorBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["vendor", slug],
    queryFn: async () => {
      return await fetchVendorBySlug(slug);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

