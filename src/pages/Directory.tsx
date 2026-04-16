import { useState, useMemo, useCallback, useEffect } from "react";
import { Search, Map, Locate } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { useListings } from "@/hooks/useListings";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DirectorySearch from "@/components/directory/DirectorySearch";
import DirectoryFilters from "@/components/directory/DirectoryFilters";
import CategoryBrowse from "@/components/directory/CategoryBrowse";
import MapOverlay from "@/components/directory/MapOverlay";
import CrossPlatformPrompt from "@/components/CrossPlatformPrompt";
import { useEngagementTracker } from "@/hooks/useEngagementTracker";

export default function Directory() {
  const { trackView } = useEngagementTracker();

  useEffect(() => {
    trackView("service");
  }, [trackView]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locatingUser, setLocatingUser] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const { data: listings = [], isLoading } = useListings({
    search: search || undefined,
    category: selectedCategory || undefined,
    city: selectedCity || undefined,
    language: selectedLanguage || undefined,
    listingType: selectedType || undefined,
  });

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

  return (
    <div className="bg-background min-h-screen">
      {/* Compact hero — light background */}
      <section className="bg-gradient-to-b from-primary/[0.06] via-accent/[0.04] to-background py-8 sm:py-10 border-b border-accent/10">
        <div className="container">
          <h1 className="text-3xl sm:text-4xl font-display text-foreground mb-1 text-center">
            Find Services
          </h1>
          <p className="text-muted-foreground text-sm mb-5 max-w-lg mx-auto text-center">
            Search trusted services and organizations across Ontario
          </p>

          <DirectorySearch
            search={search}
            onSearchChange={setSearch}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />

          {/* Quick actions row */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleNearMe}
              disabled={locatingUser}
              className="text-xs h-8 border-border hover:border-accent hover:text-accent"
            >
              <Locate className={`w-3.5 h-3.5 mr-1 text-accent ${locatingUser ? "animate-pulse" : ""}`} />
              {locatingUser ? "Locating..." : "Near Me"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMap(true)}
              className="text-xs h-8 border-border hover:border-accent hover:text-accent"
            >
              <Map className="w-3.5 h-3.5 mr-1 text-accent" />
              Map
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCategories(!showCategories)}
              className="text-xs h-8 border-border hover:border-accent hover:text-accent"
            >
              {showCategories ? "Hide" : "Browse"} Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Collapsible categories */}
      {showCategories && (
        <section className="container py-4 border-b border-border">
          <CategoryBrowse
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categoryCounts={categoryCounts}
          />
        </section>
      )}

      {/* Filters + Results */}
      <section className="container py-4">
        <div className="mb-3">
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
        <div className="flex items-center justify-between mb-3">
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
          <div className="text-center py-12">
            <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-foreground font-semibold">No services found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms</p>
            <div className="flex flex-col items-center gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={clearFilters}>Clear all filters</Button>
              <Link to="/suggest">
                <Button variant="ghost" size="sm" className="text-accent text-xs">Suggest a service</Button>
              </Link>
            </div>
          </div>
        )}
      </section>

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
