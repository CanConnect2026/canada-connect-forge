import { ExternalLink, MapPin, UtensilsCrossed, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getRestaurantImage } from "@/lib/restaurantImages";

function useFeaturedRestaurants(limit = 3) {
  return useQuery({
    queryKey: ["featured-restaurants-listings", limit],
    queryFn: async () => {
      // Curate via the unified `tags` system (food/featured) with a category fallback
      // so the section stays populated while admins finish tagging content.
      const { data, error } = await supabase
        .from("listings")
        .select("id, name, slug, cuisine, neighborhood, price_range, image_url, owner_home_country, tags")
        .eq("is_published", true)
        .or("tags.cs.{food},category.eq.Restaurants")
        .limit(limit);
      if (error) throw error;
      return data;
    },
  });
}

export default function ExploreTorontoSection() {
  const { data: restaurants = [] } = useFeaturedRestaurants(3);

  return (
    <section className="py-16 border-t border-border/40">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">FirstBitesTO · Curated</p>
            <h2 className="text-3xl md:text-4xl font-display text-foreground">Explore the City Through Food</h2>
            <p className="text-muted-foreground mt-2 text-base">
              Hand-picked food experiences from newcomer-owned places across Toronto.
            </p>
          </div>
          <Link to="/restaurants" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            All food experiences <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {restaurants.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {restaurants.map((r) => {
              const imgSrc = getRestaurantImage(r);
              return (
                <Link
                  key={r.id}
                  to={`/restaurants/${r.slug}`}
                  className="group bg-card rounded-xl border border-border/60 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {imgSrc ? (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={imgSrc} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                      <UtensilsCrossed className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-accent uppercase">{r.cuisine}</span>
                      <span className="text-xs text-muted-foreground">{r.price_range}</span>
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">{r.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-accent-secondary" /> {r.neighborhood}
                      {r.owner_home_country && (
                        <span className="ml-1">· 🌍 {r.owner_home_country}</span>
                      )}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/restaurants">
              Discover all food experiences
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
