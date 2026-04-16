import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  neighborhood: string;
  price_range: string;
  halal: boolean;
  kosher: boolean;
  vegetarian_friendly: boolean;
  vegan_friendly: boolean;
  owner_name: string | null;
  owner_home_country: string | null;
  owner_story: string | null;
  latitude: number | null;
  longitude: number | null;
  full_address: string | null;
  image_url: string | null;
  website: string | null;
  phone: string | null;
}

export function useRestaurants() {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("is_published", true)
        .order("name");
      if (error) throw error;
      return data as Restaurant[];
    },
  });
}
