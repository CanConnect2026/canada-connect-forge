import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Listing = Tables<"listings">;

export function useRelatedListings(listing: Listing | undefined, limit = 3) {
  return useQuery({
    queryKey: ["related-listings", listing?.id],
    queryFn: async () => {
      if (!listing) return [];

      // Try same category + same city first
      const { data: sameCategoryCity } = await supabase
        .from("listings")
        .select("*")
        .eq("is_published", true)
        .eq("category", listing.category)
        .eq("city", listing.city)
        .neq("id", listing.id)
        .limit(limit);

      if (sameCategoryCity && sameCategoryCity.length >= limit) {
        return sameCategoryCity.slice(0, limit);
      }

      const collected = sameCategoryCity || [];
      const ids = new Set(collected.map(l => l.id));

      // Fill with same category, any city
      if (collected.length < limit) {
        const { data: sameCategory } = await supabase
          .from("listings")
          .select("*")
          .eq("is_published", true)
          .eq("category", listing.category)
          .neq("id", listing.id)
          .limit(limit * 2);

        for (const l of sameCategory || []) {
          if (!ids.has(l.id) && collected.length < limit) {
            collected.push(l);
            ids.add(l.id);
          }
        }
      }

      // Fill with same city, any category
      if (collected.length < limit) {
        const { data: sameCity } = await supabase
          .from("listings")
          .select("*")
          .eq("is_published", true)
          .eq("city", listing.city)
          .neq("id", listing.id)
          .limit(limit * 2);

        for (const l of sameCity || []) {
          if (!ids.has(l.id) && collected.length < limit) {
            collected.push(l);
            ids.add(l.id);
          }
        }
      }

      return collected.slice(0, limit);
    },
    enabled: !!listing,
  });
}
