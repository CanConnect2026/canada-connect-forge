import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { useListings } from "@/hooks/useListings";
import { categories, ontarioCities, allLanguages } from "@/data/mockListings";
import { Button } from "@/components/ui/button";
import ListingsMap from "@/components/ListingsMap";

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
            <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setShowFilters(!showFilters)}>
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

        {isLoading ? (
          <div className="h-[600px] flex items-center justify-center text-muted-foreground">Loading map...</div>
        ) : (
          <ListingsMap listings={listings} />
        )}
      </div>
    </div>
  );
}
