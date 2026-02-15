import { Search, MapPin, Users, Heart, Briefcase, Home, Scale, BookOpen, Stethoscope, DollarSign, UtensilsCrossed, Landmark, AlertTriangle, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/CategoryCard";
import ListingCard from "@/components/ListingCard";
import { useFeaturedListings } from "@/hooks/useListings";
import heroImage from "@/assets/hero-image.jpg";
import { useState } from "react";

const categoryIcons = [
  { icon: Users, title: "Settlement & Newcomer Services", count: 42 },
  { icon: Scale, title: "Immigration & Legal Support", count: 28 },
  { icon: Home, title: "Housing & Shelter", count: 19 },
  { icon: Briefcase, title: "Employment & Career Support", count: 35 },
  { icon: BookOpen, title: "Language & Education", count: 22 },
  { icon: Stethoscope, title: "Health & Wellness", count: 31 },
  { icon: DollarSign, title: "Financial Services & Support", count: 14 },
  { icon: UtensilsCrossed, title: "Food & Clothing Support", count: 17 },
  { icon: Landmark, title: "Community & Cultural Organizations", count: 26 },
  { icon: AlertTriangle, title: "Crisis & Emergency Help", count: 11 },
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: featuredListings = [] } = useFeaturedListings();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Diverse group of newcomers in Canada" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[hsl(var(--hero-overlay)/0.75)]" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-primary-foreground leading-tight">
              Your Warm Welcome to Canada
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
              Find trusted services, resources, and community support in your new home.
            </p>
            <div className="mt-8 bg-card/95 backdrop-blur rounded-lg p-2 flex flex-col sm:flex-row gap-2 shadow-xl">
              <div className="flex-1 flex items-center gap-2 bg-background rounded-md px-3">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="What do you need help with?"
                  className="w-full py-2.5 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 bg-background rounded-md px-3">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <select className="py-2.5 bg-transparent text-sm outline-none text-foreground">
                  <option>All Ontario</option>
                  <option>Toronto</option>
                  <option>Ottawa</option>
                  <option>Mississauga</option>
                  <option>Hamilton</option>
                  <option>London</option>
                </select>
              </div>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 px-6" asChild>
                <Link to={`/directory${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""}`}>Search</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Support */}
      <section className="py-16 bg-section-alt">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display text-foreground">Featured Support for Newcomers</h2>
              <p className="text-muted-foreground mt-1">Handpicked resources to help you settle in</p>
            </div>
            <Link to="/directory" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-display text-foreground text-center mb-3">Services & Resources</h2>
          <p className="text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            Browse by category to find exactly what you need
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryIcons.map(cat => (
              <CategoryCard
                key={cat.title}
                icon={cat.icon}
                title={cat.title}
                count={cat.count}
                href={`/directory?category=${encodeURIComponent(cat.title)}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="text-3xl font-display text-primary-foreground mb-3">You Belong Here</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 leading-relaxed">
            Connect with others who understand your journey. Share stories, ask questions, and find your community in Canada.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              Explore Your Community
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Events teaser */}
      <section className="py-16 bg-section-alt">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-display text-foreground">Upcoming Events</h2>
              <p className="text-muted-foreground mt-1">Meet, learn, and grow with your community</p>
            </div>
            <Link to="/events" className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline">
              All events <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Newcomer Welcome Night — Toronto", date: "Mar 8, 2026", location: "Metro Toronto Convention Centre" },
              { title: "Resume Workshop for Immigrants", date: "Mar 15, 2026", location: "Achēv Centre, Mississauga" },
              { title: "Multilingual Health Fair", date: "Mar 22, 2026", location: "Access Alliance, Toronto" },
            ].map(event => (
              <div key={event.title} className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow">
                <span className="text-xs font-semibold text-accent uppercase">{event.date}</span>
                <h3 className="font-semibold mt-1 text-foreground">{event.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
