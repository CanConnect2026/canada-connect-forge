import { useState, useMemo } from "react";
import { useRestaurants } from "@/hooks/useRestaurants";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, DollarSign, Leaf, UtensilsCrossed } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Breadcrumb from "@/components/Breadcrumb";


const dietaryFilters = [
  { key: "halal", label: "Halal" },
  { key: "kosher", label: "Kosher" },
  { key: "vegetarian_friendly", label: "Vegetarian" },
  { key: "vegan_friendly", label: "Vegan" },
] as const;

const priceOptions = ["$", "$$", "$$$"] as const;

export default function Restaurants() {
  const { data: restaurants, isLoading } = useRestaurants();
  const [search, setSearch] = useState("");
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [dietaryFilter, setDietaryFilter] = useState<string[]>([]);
  const [cuisineFilter, setCuisineFilter] = useState<string | null>(null);

  const cuisines = useMemo(() => {
    if (!restaurants) return [];
    return [...new Set(restaurants.map((r) => r.cuisine))].sort();
  }, [restaurants]);

  const filtered = useMemo(() => {
    if (!restaurants) return [];
    return restaurants.filter((r) => {
      const q = search.toLowerCase();
      if (q && !r.name.toLowerCase().includes(q) && !r.cuisine.toLowerCase().includes(q) && !r.neighborhood.toLowerCase().includes(q)) return false;
      if (priceFilter && r.price_range !== priceFilter) return false;
      if (cuisineFilter && r.cuisine !== cuisineFilter) return false;
      for (const d of dietaryFilter) {
        if (!(r as any)[d]) return false;
      }
      return true;
    });
  }, [restaurants, search, priceFilter, cuisineFilter, dietaryFilter]);

  const toggleDietary = (key: string) =>
    setDietaryFilter((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  return (
    <>

      <div className="bg-secondary/50 border-b">
        <div className="container py-4">
          <Breadcrumb items={[{ label: "Restaurants" }]} />
          <h1 className="text-2xl md:text-3xl font-heading font-bold mt-2">Restaurants</h1>
          <p className="text-muted-foreground mt-1">Discover immigrant-owned restaurants and their stories</p>
        </div>
      </div>

      <div className="container py-6">
        {/* Search & Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, cuisine, or neighborhood..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Price */}
            {priceOptions.map((p) => (
              <Button
                key={p}
                size="sm"
                variant={priceFilter === p ? "default" : "outline"}
                onClick={() => setPriceFilter(priceFilter === p ? null : p)}
                className="text-xs"
              >
                {p}
              </Button>
            ))}

            <span className="w-px h-6 bg-border self-center mx-1" />

            {/* Dietary */}
            {dietaryFilters.map((d) => (
              <Button
                key={d.key}
                size="sm"
                variant={dietaryFilter.includes(d.key) ? "default" : "outline"}
                onClick={() => toggleDietary(d.key)}
                className="text-xs"
              >
                {d.label}
              </Button>
            ))}

            <span className="w-px h-6 bg-border self-center mx-1" />

            {/* Cuisine */}
            <select
              value={cuisineFilter || ""}
              onChange={(e) => setCuisineFilter(e.target.value || null)}
              className="text-xs border rounded-md px-2 py-1.5 bg-background"
            >
              <option value="">All Cuisines</option>
              {cuisines.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {(priceFilter || dietaryFilter.length || cuisineFilter) && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => { setPriceFilter(null); setDietaryFilter([]); setCuisineFilter(null); }}
                className="text-xs text-muted-foreground"
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <UtensilsCrossed className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">No restaurants found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function RestaurantCard({ restaurant: r }: { restaurant: any }) {
  const dietaryBadges = [
    r.halal && "Halal",
    r.kosher && "Kosher",
    r.vegetarian_friendly && "Vegetarian",
    r.vegan_friendly && "Vegan",
  ].filter(Boolean);

  return (
    <div className="border rounded-xl overflow-hidden bg-card hover:shadow-md transition-shadow">
      {r.image_url ? (
        <img src={r.image_url} alt={r.name} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-secondary flex items-center justify-center">
          <UtensilsCrossed className="w-10 h-10 text-muted-foreground/30" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading font-bold text-lg leading-tight">{r.name}</h3>
          <span className="text-accent font-bold text-sm shrink-0">{r.price_range}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" /> {r.neighborhood} · {r.cuisine}
        </p>

        {dietaryBadges.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {dietaryBadges.map((b) => (
              <Badge key={b} variant="secondary" className="text-[10px] px-1.5 py-0">
                <Leaf className="w-3 h-3 mr-0.5" /> {b}
              </Badge>
            ))}
          </div>
        )}

        {r.owner_name && (
          <p className="text-xs text-muted-foreground mt-3 border-t pt-2">
            Owned by <span className="font-medium text-foreground">{r.owner_name}</span>
            {r.owner_home_country && <> from {r.owner_home_country}</>}
          </p>
        )}

        {r.owner_story && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 italic">"{r.owner_story}"</p>
        )}
      </div>
    </div>
  );
}
