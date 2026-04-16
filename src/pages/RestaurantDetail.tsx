import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Globe,
  UtensilsCrossed,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ShareButton from "@/components/ShareButton";
import { getRestaurantImage } from "@/lib/restaurantImages";
import CrossPlatformPrompt from "@/components/CrossPlatformPrompt";
import { useEngagementTracker } from "@/hooks/useEngagementTracker";
import { useEffect } from "react";

const RestaurantDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: restaurant, isLoading } = useQuery({
    queryKey: ["restaurant-detail", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  const { data: similarRestaurants } = useQuery({
    queryKey: ["similar-restaurants", restaurant?.id, restaurant?.cuisine],
    queryFn: async () => {
      if (restaurant!.cuisine) {
        const { data, error } = await supabase
          .from("restaurants")
          .select("id, name, slug, image_url, cuisine, neighborhood, price_range")
          .eq("is_published", true)
          .eq("cuisine", restaurant!.cuisine)
          .neq("id", restaurant!.id)
          .limit(4);
        if (!error && data && data.length > 0) return data;
      }
      const { data, error } = await supabase
        .from("restaurants")
        .select("id, name, slug, image_url, cuisine, neighborhood, price_range")
        .eq("is_published", true)
        .neq("id", restaurant!.id)
        .limit(4);
      if (error) throw error;
      return data;
    },
    enabled: !!restaurant?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-display font-bold">Restaurant not found</h1>
        <Button asChild variant="outline">
          <Link to="/restaurants">Back to restaurants</Link>
        </Button>
      </div>
    );
  }

  const heroImage = getRestaurantImage(restaurant);
  const dietaryTags: string[] = [];
  if (restaurant.halal) dietaryTags.push("Halal");
  if (restaurant.kosher) dietaryTags.push("Kosher");
  if (restaurant.vegetarian_friendly) dietaryTags.push("Vegetarian-friendly");
  if (restaurant.vegan_friendly) dietaryTags.push("Vegan-friendly");

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[50vh] min-h-[360px] w-full overflow-hidden">
        {heroImage ? (
          <img src={heroImage} alt={restaurant.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <UtensilsCrossed className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> All restaurants
            </Link>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm">
              <ShareButton
                title={restaurant.name}
                text={(restaurant as any).description || undefined}
                className="border-white/30 text-white hover:bg-white/20 hover:text-white"
              />
              {restaurant.cuisine && (
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {restaurant.cuisine}
                </span>
              )}
              {restaurant.price_range && (
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  {restaurant.price_range}
                </span>
              )}
              {restaurant.owner_home_country && (
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  🌍 {restaurant.owner_home_country}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left – Details */}
          <div className="md:col-span-2 space-y-10">
            {/* Description */}
            {(restaurant as any).description && (
              <div>
                <h2 className="text-xl font-display font-bold mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{(restaurant as any).description}</p>
              </div>
            )}

            {/* Owner story */}
            {restaurant.owner_story && (
              <div className="bg-section-alt rounded-xl p-6">
                <h2 className="text-xl font-display font-bold mb-3">
                  The Story Behind {restaurant.name}
                </h2>
                {restaurant.owner_name && (
                  <p className="text-sm text-accent font-semibold mb-2">
                    Founded by {restaurant.owner_name}
                    {restaurant.owner_home_country && ` · Originally from ${restaurant.owner_home_country}`}
                  </p>
                )}
                <p className="text-muted-foreground leading-relaxed">{restaurant.owner_story}</p>
              </div>
            )}

            {/* Dietary tags */}
            {dietaryTags.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-bold mb-3">Dietary Options</h2>
                <div className="flex flex-wrap gap-2">
                  {dietaryTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-6">
            <div className="bg-card border border-border/60 rounded-xl p-6 space-y-4 sticky top-28">
              {/* Address */}
              {restaurant.full_address && (
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{restaurant.full_address}</span>
                </div>
              )}

              {/* Neighborhood */}
              {restaurant.neighborhood && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  {restaurant.neighborhood}
                </div>
              )}

              {/* Phone */}
              {restaurant.phone && (
                <a
                  href={`tel:${restaurant.phone}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  {restaurant.phone}
                </a>
              )}

              {/* Website */}
              {restaurant.website && (
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  Visit website
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {/* CTA */}
              {restaurant.website ? (
                <Button asChild className="w-full">
                  <a href={restaurant.website} target="_blank" rel="noopener noreferrer">
                    View Menu
                  </a>
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  Menu not available
                </Button>
              )}
            </div>
          </aside>
        </div>

        {/* Map */}
        {restaurant.latitude && restaurant.longitude && (
          <div className="mt-16">
            <h2 className="text-xl font-display font-bold mb-4">Location</h2>
            <div className="rounded-xl overflow-hidden border border-border/60 h-[350px]">
              <iframe
                title={`Map of ${restaurant.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=15&output=embed`}
              />
            </div>
          </div>
        )}

        {/* Similar restaurants */}
        {similarRestaurants && similarRestaurants.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-display font-bold mb-6">Similar Restaurants</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {similarRestaurants.map((r) => {
                const img = getRestaurantImage(r);
                return (
                  <Link
                    key={r.id}
                    to={`/restaurants/${r.slug}`}
                    className="group rounded-xl overflow-hidden border border-border/60 bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      {img ? (
                        <img
                          src={img}
                          alt={r.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <UtensilsCrossed className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-bold text-sm truncate">{r.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {[r.cuisine, r.neighborhood].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default RestaurantDetail;
