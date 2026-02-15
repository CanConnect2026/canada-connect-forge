import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Listing = Tables<"listings">;

export function useListings(filters?: {
  search?: string;
  category?: string;
  city?: string;
  language?: string;
  listingType?: string;
}) {
  return useQuery({
    queryKey: ["listings", filters],
    queryFn: async () => {
      let query = supabase
        .from("listings")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("name");

      if (filters?.category) query = query.eq("category", filters.category);
      if (filters?.city) query = query.eq("city", filters.city);
      if (filters?.listingType) query = query.eq("listing_type", filters.listingType as any);
      if (filters?.language) query = query.contains("languages_served", [filters.language]);
      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description_en.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useListing(id: string) {
  return useQuery({
    queryKey: ["listing", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useFeaturedListings() {
  return useQuery({
    queryKey: ["listings", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .limit(4);
      if (error) throw error;
      return data;
    },
  });
}
