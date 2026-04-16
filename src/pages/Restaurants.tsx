import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, UtensilsCrossed, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRestaurantImage } from "@/lib/restaurantImages";
import CrossPlatformPrompt from "@/components/CrossPlatformPrompt";
import { useEngagementTracker } from "@/hooks/useEngagementTracker";

const Restaurants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCuisine = searchParams.get("cuisine") || "";
  const [searchQuery, setSearchQuery] = useState("");

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants-list"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("is_published", true)
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const cuisines = useMemo(() => {
    if (!restaurants) return [];
    const set = new Set(restaurants.map((r) => r.cuisine).filter(Boolean));
    return [...set].sort() as string[];
  }, [restaurants]);

  const filtered = useMemo(() => {
    if (!restaurants) return [];
    let list = [...restaurants];

    if (activeCuisine) {
      list = list.filter((r) => r.cuisine === activeCuisine);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine?.toLowerCase().includes(q) ||
          r.neighborhood?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [restaurants, activeCuisine, searchQuery]);

  const setCuisine = (cuisine: string) => {
    const params = new URLSearchParams();
    if (cuisine) params.set("cuisine", cuisine);
    setSearchParams(params);
  };

  return (
    <>
      <section className="py-16 bg-section-alt">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Explore Restaurants
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Discover Toronto's most authentic multicultural food spots — owned and run by newcomers who brought their flavours to Canada.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, cuisine, or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-border/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Cuisine filter chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Button
              variant={!activeCuisine ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setCuisine("")}
            >
              All
            </Button>
            {cuisines.map((c) => (
              <Button
                key={c}
                variant={activeCuisine === c ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setCuisine(activeCuisine === c ? "" : c)}
              >
                {c}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse h-80" />
              ))}
            </div>
          ) : !filtered.length ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No restaurants found.</p>
              <Button variant="outline" className="rounded-full" onClick={() => { setCuisine(""); setSearchQuery(""); }}>
                View all restaurants
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r) => {
                const imgSrc = getRestaurantImage(r);
                return (
                  <Link
                    to={`/restaurants/${r.slug}`}
                    key={r.id}
                    className="group rounded-xl overflow-hidden border border-border/60 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {imgSrc ? (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={imgSrc}
                          alt={r.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                        <UtensilsCrossed className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-bold text-lg leading-tight text-foreground group-hover:text-accent transition-colors">
                          {r.name}
                        </h3>
                        {r.price_range && (
                          <span className="text-xs font-semibold text-accent shrink-0">{r.price_range}</span>
                        )}
                      </div>
                      <span className="text-xs font-semibold text-accent uppercase">{r.cuisine}</span>
                      {r.neighborhood && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-accent-secondary" /> {r.neighborhood}
                        </p>
                      )}
                      {(r as any).description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{(r as any).description}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Restaurants;
