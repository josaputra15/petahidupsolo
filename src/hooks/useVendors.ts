import { useQuery } from "@tanstack/react-query";
import { fetchVendors, fetchVendorBySlug } from "@/lib/vendors";
import { vendors as hardcodedVendors, getVendorBySlug as getHardcodedVendorBySlug } from "@/data/vendors";
import type { Vendor } from "@/data/vendors";

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key && url !== "your-project-url-here");
};

// Hook to fetch all vendors (with fallback to hardcoded)
export const useVendors = () => {
  return useQuery({
    queryKey: ["vendors"],
    queryFn: async () => {
      if (isSupabaseConfigured()) {
        try {
          return await fetchVendors();
        } catch (error) {
          console.warn("Failed to fetch from Supabase, using hardcoded data:", error);
          return hardcodedVendors;
        }
      }
      return hardcodedVendors;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to fetch vendor by slug (with fallback)
export const useVendorBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["vendor", slug],
    queryFn: async () => {
      if (isSupabaseConfigured()) {
        try {
          const vendor = await fetchVendorBySlug(slug);
          if (vendor) return vendor;
        } catch (error) {
          console.warn("Failed to fetch from Supabase, using hardcoded data:", error);
        }
      }
      return getHardcodedVendorBySlug(slug);
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

