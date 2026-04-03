import { useState, useMemo, useCallback } from "react";
import { Search, Map, Locate } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { useListings } from "@/hooks/useListings";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DirectorySearch from "@/components/directory/DirectorySearch";
import DirectoryFilters from "@/components/directory/DirectoryFilters";
import CategoryBrowse from "@/components/directory/CategoryBrowse";
import MapOverlay from "@/components/directory/MapOverlay";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locatingUser, setLocatingUser] = useState(false);

  const { data: listings = [], isLoading } = useListings({
    search: search || undefined,
    category: selectedCategory || undefined,
    city: selectedCity || undefined,
    language: selectedLanguage || undefined,
    listingType: selectedType || undefined,
  });

  // Get all listings for category counts (unfiltered)
  const { data: allListings = [] } = useListings({});

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allListings.forEach(l => {
      counts[l.category] = (counts[l.category] || 0) + 1;
    });
    return counts;
  }, [allListings]);

  const clearFilters = useCallback(() => {
    setSearch("");
    setSelectedCategory("");
    setSelectedCity("");
    setSelectedLanguage("");
    setSelectedType("");
  }, []);

  const handleNearMe = () => {
    if (!navigator.geolocation) return;
    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocatingUser(false);
        setShowMap(true);
      },
      () => setLocatingUser(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const hasActiveSearch = search || selectedCategory || selectedCity || selectedLanguage || selectedType;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero search section */}
      <section className="bg-primary py-12 sm:py-16">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl font-display text-primary-foreground mb-2">
            Find Services
          </h1>
          <p className="text-primary-foreground/70 text-sm sm:text-base mb-8 max-w-lg mx-auto">
            Search trusted services and organizations across Ontario for newcomers
          </p>

          <DirectorySearch search={search} onSearchChange={setSearch} />

          {/* Quick action buttons */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNearMe}
              disabled={locatingUser}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Locate className={`w-4 h-4 mr-1.5 ${locatingUser ? "animate-pulse" : ""}`} />
              {locatingUser ? "Locating..." : "Near Me"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMap(true)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Map className="w-4 h-4 mr-1.5" />
              View Map
            </Button>
          </div>
        </div>
      </section>

      {/* Category browse */}
      <section className="container py-8">
        <h2 className="text-lg font-semibold text-foreground mb-4 text-center">Browse by Category</h2>
        <CategoryBrowse
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryCounts={categoryCounts}
        />
      </section>

      {/* Filters + Results */}
      <section className="container pb-16">
        <div className="mb-6">
          <DirectoryFilters
            selectedCategory={selectedCategory}
            selectedCity={selectedCity}
            selectedLanguage={selectedLanguage}
            selectedType={selectedType}
            onCategoryChange={setSelectedCategory}
            onCityChange={setSelectedCity}
            onLanguageChange={setSelectedLanguage}
            onTypeChange={setSelectedType}
            onClear={clearFilters}
          />
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {isLoading ? "Searching..." : `${listings.length} service${listings.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Results grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-foreground font-semibold">No services found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms</p>
            <div className="flex flex-col items-center gap-2 mt-6">
              <Button variant="outline" size="sm" onClick={clearFilters}>Clear all filters</Button>
              <Link to="/suggest">
                <Button variant="ghost" size="sm" className="text-accent text-xs">Suggest a service</Button>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Map overlay */}
      {showMap && (
        <MapOverlay
          listings={listings}
          onClose={() => setShowMap(false)}
          userLocation={userLocation}
        />
      )}
    </div>
  );
}
