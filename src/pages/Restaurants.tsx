import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, UtensilsCrossed, ArrowRight, Sparkles, Map as MapIcon, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRestaurantImage } from "@/lib/restaurantImages";
import CrossPlatformPrompt from "@/components/CrossPlatformPrompt";
import { useEngagementTracker } from "@/hooks/useEngagementTracker";

// Editorial food trails — curated narrative experiences (presentation-only).
// Each trail "borrows" newcomer-owned restaurants from Canada Connect via tags.
const editorialTrails = [
  {
    slug: "downtown-flavours",
    eyebrow: "Trail · 1",
    title: "A Day in Downtown Flavours",
    description: "From morning chai in Kensington to late-night dumplings in Chinatown — a walking food story through Toronto's core.",
    cuisineTags: ["Indian", "Chinese", "Vietnamese", "Caribbean"],
    accent: "from-accent/90 to-accent-secondary/80",
    icon: Compass,
  },
  {
    slug: "hidden-brunch",
    eyebrow: "Trail · 2",
    title: "Best Hidden Brunch Spots",
    description: "Off-radar weekend tables run by newcomer chefs — slow mornings, warm welcomes, unforgettable plates.",
    cuisineTags: ["Mediterranean", "Ethiopian", "Mexican", "Filipino"],
    accent: "from-primary/90 to-accent/70",
    icon: Sparkles,
  },
  {
    slug: "first-week",
    eyebrow: "Trail · 3",
    title: "Your First Week in Toronto",
    description: "An easy, comforting introduction to the city's food identity — three meals, three neighbourhoods, one welcome.",
    cuisineTags: ["Italian", "Japanese", "Middle Eastern", "Thai"],
    accent: "from-accent-secondary/90 to-primary/80",
    icon: MapIcon,
  },
];

const Restaurants = () => {
  const { trackView } = useEngagementTracker();

  useEffect(() => {
    trackView("food");
  }, [trackView]);

  const { data: restaurants } = useQuery({
    queryKey: ["firstbites-curated-restaurants"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("is_published", true)
        .eq("category", "Restaurants")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Match restaurants to each editorial trail via cuisine tags (curation, not a directory).
  const trailsWithStops = useMemo(() => {
    if (!restaurants) return editorialTrails.map(t => ({ ...t, stops: [] as typeof restaurants }));
    return editorialTrails.map(trail => ({
      ...trail,
      stops: restaurants
        .filter(r => trail.cuisineTags.some(tag => r.cuisine?.toLowerCase().includes(tag.toLowerCase())))
        .slice(0, 3),
    }));
  }, [restaurants]);

  // A small "Featured Place" spotlight (one curated restaurant) — editorial, not a list.
  const spotlight = useMemo(() => {
    if (!restaurants?.length) return null;
    return restaurants.find(r => r.is_featured) ?? restaurants[0];
  }, [restaurants]);

  return (
    <>
      {/* Editorial hero */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-primary/5" aria-hidden />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4">FirstBitesTO · Curated Discovery</p>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-[1.05] text-foreground">
              Toronto, told through<br className="hidden md:block" /> the people who feed it.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Curated food trails, neighbourhood journeys, and editorial guides — built around the newcomer-owned places shaping the city's flavour.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="#trails">Start a food trail <ArrowRight className="ml-2 w-4 h-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="#spotlight">See this week's spotlight</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Food Trails */}
      <section id="trails" className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">Food Trails</p>
            <h2 className="text-3xl md:text-4xl font-display text-foreground">Curated journeys, not a list of places</h2>
            <p className="text-muted-foreground mt-2">Each trail is a narrative — three places, one neighbourhood mood, a story to follow.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trailsWithStops.map(trail => {
              const Icon = trail.icon;
              return (
                <article
                  key={trail.slug}
                  className="group rounded-2xl overflow-hidden border border-border/60 bg-card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className={`relative aspect-[16/10] bg-gradient-to-br ${trail.accent} p-6 flex flex-col justify-between`}>
                    <div className="flex items-center gap-2 text-primary-foreground/95">
                      <Icon className="w-5 h-5" />
                      <span className="text-[11px] uppercase tracking-widest font-semibold">{trail.eyebrow}</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-primary-foreground leading-tight">
                      {trail.title}
                    </h3>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{trail.description}</p>

                    {trail.stops.length > 0 && (
                      <div className="space-y-2 mb-5">
                        <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground/70">
                          Stops on this trail
                        </div>
                        {trail.stops.map((stop, idx) => (
                          <Link
                            key={stop.id}
                            to={`/restaurants/${stop.slug}`}
                            className="flex items-center gap-3 py-2 group/stop"
                          >
                            <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-foreground group-hover/stop:text-accent transition-colors truncate">
                                {stop.name}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {stop.cuisine}{stop.neighborhood && ` · ${stop.neighborhood}`}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-3 border-t border-border/40">
                      <span className="text-sm font-semibold text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Follow this trail <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Spotlight — single editorial feature */}
      {spotlight && (
        <section id="spotlight" className="py-20 bg-section-alt border-y border-border/40">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
                {getRestaurantImage(spotlight) ? (
                  <img
                    src={getRestaurantImage(spotlight)!}
                    alt={spotlight.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UtensilsCrossed className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">This Week's Spotlight</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                  {spotlight.name}
                </h2>
                {spotlight.cuisine && (
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                    <span className="font-semibold text-accent uppercase tracking-wider text-xs">{spotlight.cuisine}</span>
                    {spotlight.neighborhood && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accent-secondary" /> {spotlight.neighborhood}
                      </span>
                    )}
                  </div>
                )}
                {(spotlight.owner_story || spotlight.description_en) && (
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-5">
                    {spotlight.owner_story || spotlight.description_en}
                  </p>
                )}
                <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to={`/restaurants/${spotlight.slug}`}>
                    Read the full story <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Neighbourhood explorer — editorial entry, not a filter UI */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">Neighbourhood Experiences</p>
            <h2 className="text-3xl md:text-4xl font-display text-foreground">Explore Toronto by mood</h2>
            <p className="text-muted-foreground mt-2">More curated journeys are on the way. In the meantime, follow a trail above or read this week's spotlight.</p>
          </div>
          <CrossPlatformPrompt variant="suggest-services" />
        </div>
      </section>
    </>
  );
};

export default Restaurants;
