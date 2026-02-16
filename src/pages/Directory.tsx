import { useState } from "react";
import { Search, Filter, X, Map as MapIcon, List, SlidersHorizontal } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { useListings } from "@/hooks/useListings";
import { categories, ontarioCities, allLanguages } from "@/data/mockListings";
import { Button } from "@/components/ui/button";
import ListingsMap from "@/components/ListingsMap";
import { Link } from "react-router-dom";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const { data: listings = [], isLoading } = useListings({
    search: search || undefined,
    category: selectedCategory || undefined,
    city: selectedCity || undefined,
    language: selectedLanguage || undefined,
    listingType: selectedType || undefined,
  });

  const hasFilters = selectedCategory || selectedCity || selectedLanguage || selectedType;

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedCity("");
    setSelectedLanguage("");
    setSelectedType("");
  };

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
                placeholder="Search by name, service, or keyword..."
                className="w-full py-2.5 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
              {hasFilters && <span className="ml-2 w-2 h-2 rounded-full bg-accent" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-card rounded-lg border animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
                <select className="w-full bg-background border rounded-md px-3 py-2 text-sm" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">City</label>
                <select className="w-full bg-background border rounded-md px-3 py-2 text-sm" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                  <option value="">All Cities</option>
                  {ontarioCities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Language</label>
                <select className="w-full bg-background border rounded-md px-3 py-2 text-sm" value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
                  <option value="">All Languages</option>
                  {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Type</label>
                <select className="w-full bg-background border rounded-md px-3 py-2 text-sm" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                  <option value="">All Types</option>
                  <option value="free">Free</option>
                  <option value="nonprofit">Non-Profit</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>
            {hasFilters && (
              <button className="mt-3 text-xs text-accent hover:underline flex items-center gap-1" onClick={clearFilters}>
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">{listings.length} services found</p>
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`p-2 rounded-md transition-colors ${viewMode === "map" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              aria-label="Map view"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        ) : viewMode === "list" ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            {listings.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">No services found matching your criteria</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
                  <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
                  <Link to="/suggest">
                    <Button variant="ghost" className="text-accent">Suggest a service we should add</Button>
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <ListingsMap listings={listings} />
        )}
      </div>
    </div>
  );
}
