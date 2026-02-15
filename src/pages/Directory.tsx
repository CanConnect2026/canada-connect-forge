import { useState, useMemo } from "react";
import { Search, MapPin, Filter, X } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { mockListings, categories, ontarioCities, allLanguages } from "@/data/mockListings";
import { Button } from "@/components/ui/button";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return mockListings.filter(l => {
      if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory && l.category !== selectedCategory) return false;
      if (selectedCity && l.city !== selectedCity) return false;
      if (selectedLanguage && !l.languages.includes(selectedLanguage)) return false;
      return true;
    });
  }, [search, selectedCategory, selectedCity, selectedLanguage]);

  const hasFilters = selectedCategory || selectedCity || selectedLanguage;

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary py-10">
        <div className="container">
          <h1 className="text-3xl font-display text-primary-foreground">Service Directory</h1>
          <p className="text-primary-foreground/70 mt-1">Browse trusted services and resources across Ontario</p>
          <div className="mt-6 bg-card/95 backdrop-blur rounded-lg p-2 flex flex-col sm:flex-row gap-2 shadow-lg max-w-2xl">
            <div className="flex-1 flex items-center gap-2 bg-background rounded-md px-3">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full py-2.5 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="sm:w-auto"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
              {hasFilters && <span className="ml-2 w-2 h-2 rounded-full bg-accent" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-card rounded-lg border animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                <select
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">City</label>
                <select
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm"
                  value={selectedCity}
                  onChange={e => setSelectedCity(e.target.value)}
                >
                  <option value="">All Cities</option>
                  {ontarioCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Language</label>
                <select
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm"
                  value={selectedLanguage}
                  onChange={e => setSelectedLanguage(e.target.value)}
                >
                  <option value="">All Languages</option>
                  {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            {hasFilters && (
              <button
                className="mt-3 text-xs text-accent hover:underline flex items-center gap-1"
                onClick={() => { setSelectedCategory(""); setSelectedCity(""); setSelectedLanguage(""); }}
              >
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-4">{filtered.length} services found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No services found matching your criteria.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setSelectedCategory(""); setSelectedCity(""); setSelectedLanguage(""); }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
