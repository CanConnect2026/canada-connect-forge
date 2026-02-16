import { useState } from "react";
import { Search, Filter, X, Bus, ExternalLink, MapPin, Navigation } from "lucide-react";
import { useListings } from "@/hooks/useListings";
import { categories, ontarioCities, allLanguages } from "@/data/mockListings";
import { Button } from "@/components/ui/button";
import ListingsMap from "@/components/ListingsMap";

const transitSystems = [
  { name: "TTC (Toronto)", url: "https://www.ttc.ca", area: "Toronto" },
  { name: "GO Transit", url: "https://www.gotransit.com", area: "Greater Toronto & Hamilton" },
  { name: "MiWay (Mississauga)", url: "https://www.mississauga.ca/miway-transit", area: "Mississauga" },
  { name: "OC Transpo (Ottawa)", url: "https://www.octranspo.com", area: "Ottawa" },
  { name: "HSR (Hamilton)", url: "https://www.hamilton.ca/hsr", area: "Hamilton" },
  { name: "GRT (Waterloo Region)", url: "https://www.grt.ca", area: "Kitchener-Waterloo" },
];

export default function MapPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data: listings = [], isLoading } = useListings({
    search: search || undefined,
    category: selectedCategory || undefined,
    city: selectedCity || undefined,
    language: selectedLanguage || undefined,
  });

  const hasFilters = selectedCategory || selectedCity || selectedLanguage;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary py-6">
        <div className="container">
          <h1 className="text-2xl font-display text-primary-foreground">Service Map</h1>
          <p className="text-primary-foreground/70 text-sm mt-1">Explore services near you</p>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 max-w-xl">
            <div className="flex-1 flex items-center gap-2 bg-card/95 backdrop-blur rounded-md px-3">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="w-4 h-4 mr-1" /> Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-4">
        {showFilters && (
          <div className="mb-4 p-4 bg-card rounded-lg border animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <select className="bg-background border rounded-md px-3 py-2 text-sm" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="bg-background border rounded-md px-3 py-2 text-sm" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                <option value="">All Cities</option>
                {ontarioCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="bg-background border rounded-md px-3 py-2 text-sm" value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
                <option value="">All Languages</option>
                {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            {hasFilters && (
              <button className="mt-2 text-xs text-accent hover:underline flex items-center gap-1" onClick={() => { setSelectedCategory(""); setSelectedCity(""); setSelectedLanguage(""); }}>
                <X className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Map */}
          <div>
            {isLoading ? (
              <div className="h-[600px] flex items-center justify-center text-muted-foreground">Loading map...</div>
            ) : (
              <ListingsMap listings={listings} />
            )}
          </div>

          {/* Transit & Navigation Panel */}
          <div className="space-y-4">
            {/* Getting Around */}
            <div className="bg-card rounded-lg border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Bus className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-foreground text-sm">Getting Around Ontario</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Ontario's cities have reliable public transit. Most systems accept contactless payment or reloadable transit cards (like PRESTO). Buses, subways, and streetcars run frequently during the day.
              </p>
              <div className="space-y-2.5">
                {transitSystems.map(t => (
                  <a
                    key={t.name}
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-md border hover:bg-secondary transition-colors"
                  >
                    <div>
                      <span className="text-sm font-medium text-foreground">{t.name}</span>
                      <span className="text-xs text-muted-foreground block">{t.area}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Navigation Tools */}
            <div className="bg-card rounded-lg border p-5">
              <div className="flex items-center gap-2 mb-3">
                <Navigation className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-foreground text-sm">Navigation Tools</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Open any service location in your preferred maps app for directions.</p>
              <div className="space-y-2">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 rounded-md border hover:bg-secondary transition-colors">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
                </a>
                <a href="https://maps.apple.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2.5 rounded-md border hover:bg-secondary transition-colors">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">Apple Maps</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
                </a>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-accent/5 rounded-lg border border-accent/20 p-5">
              <h3 className="font-semibold text-foreground text-sm mb-2">💡 Transit Tips for Newcomers</h3>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Get a <strong>PRESTO card</strong> — it works across most Ontario transit systems</li>
                <li>Use <strong>Google Maps</strong> for real-time transit directions</li>
                <li>Many transit systems offer <strong>reduced fares</strong> for seniors, students, and children</li>
                <li>Rush hours are typically 7–9 AM and 4–6 PM on weekdays</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
