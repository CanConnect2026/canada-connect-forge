import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, UtensilsCrossed, ArrowRight, Sparkles, Compass, Map as MapIcon, Flame, Moon, Heart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRestaurantImage } from "@/lib/restaurantImages";
import CrossPlatformPrompt from "@/components/CrossPlatformPrompt";
import { useEngagementTracker } from "@/hooks/useEngagementTracker";
import heroFood from "@/assets/hero-food.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// FirstBitesTO — Editorial discovery experience.
// Magazine-style: hero feature → trail chapters → mood discovery → neighbourhood
// journeys → seasonal guide → spotlight. NEVER a directory.
// All content sourced from Canada Connect listings via the unified `tags` system.
// ─────────────────────────────────────────────────────────────────────────────

const editorialTrails = [
  {
    slug: "around-the-world",
    chapter: "Chapter 1",
    title: "Taste the World in One Day",
    kicker: "A walking journey across cuisines",
    description:
      "Breakfast in Little India, lunch in Chinatown, dinner in Little Italy. One day, three neighbourhoods, a city's worth of flavour.",
    tags: ["food", "culture", "neighbourhood"],
    cuisineFallback: ["Indian", "Chinese", "Italian", "Caribbean"],
    accent: "from-accent via-accent to-accent-secondary",
    icon: Compass,
  },
  {
    slug: "hidden-gems",
    chapter: "Chapter 2",
    title: "Hidden Gems Locals Love",
    kicker: "The places Torontonians quietly recommend",
    description:
      "Affordable, under-the-radar kitchens tucked between the big names — the spots locals send their friends to first.",
    tags: ["food", "featured"],
    cuisineFallback: ["Mediterranean", "Ethiopian", "Mexican", "Filipino"],
    accent: "from-primary via-primary to-accent",
    icon: Sparkles,
  },
  {
    slug: "first-week",
    chapter: "Chapter 3",
    title: "Your First Week of Eating",
    kicker: "A gentle introduction to Toronto's flavour",
    description:
      "New to the city? Start here. Three approachable meals across three neighbourhoods — your first taste of what Toronto really feels like.",
    tags: ["food", "newcomer"],
    cuisineFallback: ["Italian", "Japanese", "Middle Eastern", "Thai"],
    accent: "from-accent-secondary via-accent-secondary to-primary",
    icon: MapIcon,
  },
];

const moods = [
  { slug: "cozy", label: "Cozy & Warm", description: "Slow dinners, candlelight, comfort food", icon: Heart, accent: "bg-accent/10 text-accent" },
  { slug: "hidden-gems", label: "Hidden Gems", description: "Tucked-away kitchens worth finding", icon: Sparkles, accent: "bg-accent-gold/15 text-accent-gold" },
  { slug: "late-night", label: "Late Night Eats", description: "After-hours flavours across the city", icon: Moon, accent: "bg-primary/10 text-primary" },
  { slug: "street-food", label: "Street Food", description: "Quick bites, big personality", icon: Flame, accent: "bg-accent-secondary/15 text-accent-secondary" },
  { slug: "plant-based", label: "Plant-Based", description: "Vegetarian and vegan favourites", icon: Leaf, accent: "bg-badge-free/15 text-badge-free" },
];

const neighbourhoods = [
  { name: "Kensington Market", tag: "Eclectic · Multicultural", match: ["kensington"] },
  { name: "Little India", tag: "Gerrard East · South Asian", match: ["little india", "gerrard"] },
  { name: "Chinatown", tag: "Spadina · East Asian", match: ["chinatown", "spadina"] },
  { name: "Koreatown", tag: "Bloor West · Korean BBQ", match: ["koreatown", "bloor"] },
  { name: "Little Italy", tag: "College Street · Italian", match: ["little italy", "college"] },
  { name: "Greektown", tag: "Danforth · Mediterranean", match: ["greektown", "danforth"] },
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
        .or("tags.cs.{food},category.eq.Restaurants")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  // Magazine feature story — single hero piece (featured restaurant or first available).
  const featureStory = useMemo(() => {
    if (!restaurants?.length) return null;
    return restaurants.find((r) => r.is_featured) ?? restaurants[0];
  }, [restaurants]);

  // Trails: tag overlap with cuisine fallback during tagging backfill.
  const trailsWithStops = useMemo(() => {
    if (!restaurants) return editorialTrails.map((t) => ({ ...t, stops: [] as typeof restaurants }));
    return editorialTrails.map((trail) => {
      const tagged = restaurants.filter(
        (r) => Array.isArray(r.tags) && trail.tags.some((t) => r.tags!.includes(t))
      );
      const fallback = restaurants.filter((r) =>
        trail.cuisineFallback.some((c) => r.cuisine?.toLowerCase().includes(c.toLowerCase()))
      );
      const seen = new Set<string>();
      const stops = [...tagged, ...fallback]
        .filter((r) => {
          if (seen.has(r.id)) return false;
          seen.add(r.id);
          return true;
        })
        .slice(0, 3);
      return { ...trail, stops };
    });
  }, [restaurants]);

  // Neighbourhood journeys — match listings against neighbourhood keywords.
  const neighbourhoodJourneys = useMemo(() => {
    if (!restaurants) return neighbourhoods.map((n) => ({ ...n, places: [] as typeof restaurants }));
    return neighbourhoods.map((n) => {
      const places = restaurants
        .filter((r) =>
          n.match.some((kw) => r.neighborhood?.toLowerCase().includes(kw))
        )
        .slice(0, 2);
      return { ...n, places };
    });
  }, [restaurants]);

  return (
    <>
      {/* ─── HERO FEATURE STORY (magazine cover) ──────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          <img src={heroFood} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/70 to-foreground" />
        </div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-5">
              FirstBitesTO · Issue 01 · Spring
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.95] text-background">
              Taste the world,<br />
              <span className="text-accent">right here in Toronto.</span>
            </h1>
            <p className="mt-7 text-lg md:text-xl text-background/80 max-w-2xl leading-relaxed">
              An editorial guide to Toronto's food — curated trails, neighbourhood journeys, and the hidden kitchens worth knowing about.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="#trails">
                  Begin reading <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-transparent border-background/30 text-background hover:bg-background/10 hover:text-background"
                asChild
              >
                <a href="#neighbourhoods">Explore neighbourhoods</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EDITOR'S NOTE / FEATURE STORY ────────────────────────────────── */}
      {featureStory && (
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-4">
                  Cover Story
                </p>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
                  {featureStory.name}
                </h2>
                {featureStory.cuisine && (
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border/60">
                    <span className="font-semibold text-accent uppercase tracking-wider text-xs">
                      {featureStory.cuisine}
                    </span>
                    {featureStory.neighborhood && (
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-accent-secondary" />
                        {featureStory.neighborhood}
                      </span>
                    )}
                  </div>
                )}
                {(featureStory.owner_story || featureStory.description_en) && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8 first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:text-accent first-letter:mr-2 first-letter:float-left first-letter:leading-none first-letter:mt-1">
                    {featureStory.owner_story || featureStory.description_en}
                  </p>
                )}
                <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to={`/restaurants/${featureStory.slug}`}>
                    Read the full story <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-2xl">
                  {getRestaurantImage(featureStory) ? (
                    <img
                      src={getRestaurantImage(featureStory)!}
                      alt={featureStory.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent-secondary/20">
                      <UtensilsCrossed className="w-20 h-20 text-accent/40" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/95 backdrop-blur text-[11px] uppercase tracking-widest font-bold text-accent">
                    This Issue's Feature
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── TRAIL CHAPTERS (scrollable narrative journeys) ──────────────── */}
      <section id="trails" className="py-20 md:py-28 bg-section-alt border-y border-border/40">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">
              The Trails
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
              Three journeys, one city to taste.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Each trail is a story you walk through — three stops, three flavours, one afternoon in Toronto.
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {trailsWithStops.map((trail, trailIdx) => {
              const Icon = trail.icon;
              const isReversed = trailIdx % 2 === 1;
              return (
                <article
                  key={trail.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Visual panel */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : ""}`}>
                    <div
                      className={`relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${trail.accent} p-8 flex flex-col justify-between shadow-xl`}
                    >
                      <div className="flex items-center gap-2 text-background/95">
                        <Icon className="w-6 h-6" />
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold">
                          {trail.chapter}
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-widest text-background/80 font-semibold mb-2">
                          {trail.kicker}
                        </p>
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-background leading-[1.05]">
                          {trail.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Editorial body + stops */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : ""}`}>
                    <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                      {trail.description}
                    </p>

                    {trail.stops.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground/70 mb-4">
                          Stops on this trail
                        </div>
                        {trail.stops.map((stop, idx) => (
                          <Link
                            key={stop.id}
                            to={`/restaurants/${stop.slug}`}
                            className="group flex items-center gap-5 p-4 rounded-xl hover:bg-background transition-all border border-transparent hover:border-border hover:shadow-md"
                          >
                            <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-muted">
                              {getRestaurantImage(stop) ? (
                                <img
                                  src={getRestaurantImage(stop)!}
                                  alt={stop.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/15 to-accent-secondary/15">
                                  <UtensilsCrossed className="w-7 h-7 text-accent/50" />
                                </div>
                              )}
                              <div className="absolute top-1.5 left-1.5 w-6 h-6 rounded-full bg-background text-accent text-xs font-bold flex items-center justify-center shadow-sm">
                                {idx + 1}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                                {stop.name}
                              </h4>
                              <p className="text-sm text-muted-foreground truncate">
                                {stop.cuisine}
                                {stop.neighborhood && ` · ${stop.neighborhood}`}
                              </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BROWSE BY MOOD ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">
              Browse by Mood
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
              What kind of evening is it?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Pick a feeling. We'll point you to the kitchens that fit.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {moods.map((mood) => {
              const Icon = mood.icon;
              return (
                <button
                  key={mood.slug}
                  className="group text-left p-6 rounded-2xl border border-border/60 bg-card hover:shadow-xl hover:-translate-y-1 hover:border-accent/40 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${mood.accent} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base mb-1.5 leading-tight">
                    {mood.label}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{mood.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── NEIGHBOURHOOD JOURNEYS ──────────────────────────────────────── */}
      <section id="neighbourhoods" className="py-20 md:py-28 bg-section-alt border-y border-border/40">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">
              Neighbourhood Journeys
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
              The city, one block at a time.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Toronto's flavour lives in its neighbourhoods. Start with one, then taste your way through.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighbourhoodJourneys.map((n) => (
              <article
                key={n.name}
                className="group rounded-2xl overflow-hidden bg-card border border-border/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[5/3] bg-gradient-to-br from-accent/30 via-accent-secondary/20 to-primary/20 overflow-hidden">
                  {n.places[0] && getRestaurantImage(n.places[0]) ? (
                    <img
                      src={getRestaurantImage(n.places[0])!}
                      alt={n.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-background/60" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-2xl font-display font-bold text-background leading-tight">
                      {n.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-background/85 font-semibold mt-1">
                      {n.tag}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  {n.places.length > 0 ? (
                    <div className="space-y-2">
                      {n.places.map((p) => (
                        <Link
                          key={p.id}
                          to={`/restaurants/${p.slug}`}
                          className="flex items-center justify-between text-sm group/p"
                        >
                          <span className="text-foreground font-medium group-hover/p:text-accent transition-colors truncate">
                            {p.name}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover/p:text-accent group-hover/p:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      Stories from this neighbourhood are coming soon.
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEASONAL GUIDE BLOCK ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-accent to-accent-secondary p-10 md:p-16">
            <div className="absolute inset-0 opacity-20">
              <img src={heroFood} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-background/90 font-bold mb-4">
                Seasonal Guide · Spring 2026
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-background leading-tight mb-5">
                Patios, fresh menus, & the city waking up.
              </h2>
              <p className="text-lg text-background/90 leading-relaxed mb-8">
                Spring in Toronto belongs to long lunches and outdoor tables. Our seasonal edit drops soon — sign up to be the first to read it.
              </p>
              <Button
                size="lg"
                className="rounded-full bg-background text-accent hover:bg-background/90"
                asChild
              >
                <Link to="/get-involved">
                  Get the seasonal edit <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SUGGEST A PLACE (closing) ──────────────────────────────────── */}
      <section className="py-16 bg-section-alt border-t border-border/40">
        <div className="container">
          <CrossPlatformPrompt variant="suggest-services" />
        </div>
      </section>
    </>
  );
};

export default Restaurants;
