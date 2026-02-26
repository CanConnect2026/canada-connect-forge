import { useState, useRef, useCallback } from "react";
import { Search, X, SlidersHorizontal, MapPin, Locate, ChevronDown } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import { useListings } from "@/hooks/useListings";
import { categories, ontarioCities, allLanguages } from "@/data/mockListings";
import { Button } from "@/components/ui/button";
import DirectoryMap from "@/components/DirectoryMap";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Directory() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locatingUser, setLocatingUser] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const listRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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

  const handleMarkerClick = useCallback((id: string) => {
    setHighlightedId(id);
    if (isMobile) setMobileView("list");
    // Scroll to card
    setTimeout(() => {
      const el = document.getElementById(`listing-${id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, [isMobile]);

  const handleCardHover = useCallback((id: string | null) => {
    setHighlightedId(id);
  }, []);

  const handleNearMe = () => {
    if (!navigator.geolocation) return;
    setLocatingUser(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocatingUser(false);
      },
      () => setLocatingUser(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="bg-background min-h-screen flex flex-col">
      {/* Sticky header with search & filters */}
      <div className="bg-primary sticky top-0 z-30 shadow-md">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display text-primary-foreground leading-tight">Find Services</h1>
              <p className="text-primary-foreground/60 text-xs mt-0.5 hidden sm:block">Browse trusted services across Ontario</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNearMe}
                disabled={locatingUser}
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Locate className={`w-4 h-4 mr-1.5 ${locatingUser ? "animate-pulse" : ""}`} />
                <span className="hidden sm:inline">{locatingUser ? "Locating..." : "Near me"}</span>
              </Button>
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-3 flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-card/95 backdrop-blur rounded-md px-3">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Search by name, service, or keyword..."
                className="w-full py-2.5 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-card/95 border-0 text-foreground shrink-0"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-1.5" />
              Filters
              {hasFilters && <span className="ml-1.5 w-2 h-2 rounded-full bg-accent" />}
              <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Filters row */}
          {showFilters && (
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 animate-fade-in">
              <select className="bg-card/95 backdrop-blur border-0 rounded-md px-3 py-2 text-sm text-foreground" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="bg-card/95 backdrop-blur border-0 rounded-md px-3 py-2 text-sm text-foreground" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                <option value="">All Cities</option>
                {ontarioCities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="bg-card/95 backdrop-blur border-0 rounded-md px-3 py-2 text-sm text-foreground" value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)}>
                <option value="">All Languages</option>
                {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <select className="bg-card/95 backdrop-blur border-0 rounded-md px-3 py-2 text-sm text-foreground" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                <option value="">All Types</option>
                <option value="free">Free</option>
                <option value="nonprofit">Non-Profit</option>
                <option value="paid">Paid</option>
              </select>
              {hasFilters && (
                <button className="col-span-2 sm:col-span-4 text-xs text-primary-foreground/70 hover:text-primary-foreground flex items-center gap-1 transition-colors" onClick={clearFilters}>
                  <X className="w-3 h-3" /> Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Mobile view toggle */}
          {isMobile && (
            <div className="mt-2 flex gap-1 bg-primary-foreground/10 rounded-md p-0.5">
              <button
                onClick={() => setMobileView("list")}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${mobileView === "list" ? "bg-card text-foreground shadow-sm" : "text-primary-foreground/70"}`}
              >
                List ({listings.length})
              </button>
              <button
                onClick={() => setMobileView("map")}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${mobileView === "map" ? "bg-card text-foreground shadow-sm" : "text-primary-foreground/70"}`}
              >
                Map
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Split-panel content */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* Listing list panel */}
        <div
          ref={listRef}
          className={`lg:w-[420px] xl:w-[480px] lg:border-r overflow-y-auto ${isMobile && mobileView === "map" ? "hidden" : ""}`}
          style={{ height: isMobile ? "calc(100vh - 200px)" : "calc(100vh - 160px)" }}
        >
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-3">
              {isLoading ? "Loading..." : `${listings.length} service${listings.length !== 1 ? "s" : ""} found`}
            </p>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : listings.length > 0 ? (
              <div className="space-y-3">
                {listings.map(listing => (
                  <div
                    key={listing.id}
                    id={`listing-${listing.id}`}
                    onMouseEnter={() => handleCardHover(listing.id)}
                    onMouseLeave={() => handleCardHover(null)}
                    className={`transition-all duration-200 rounded-lg ${highlightedId === listing.id ? "ring-2 ring-accent ring-offset-1" : ""}`}
                  >
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium text-sm">No services found</p>
                <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters or search terms</p>
                <div className="flex flex-col items-center gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={clearFilters}>Clear filters</Button>
                  <Link to="/suggest">
                    <Button variant="ghost" size="sm" className="text-accent text-xs">Suggest a service</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map panel */}
        <div
          className={`flex-1 ${isMobile && mobileView === "list" ? "hidden" : ""}`}
          style={{ height: isMobile ? "calc(100vh - 200px)" : "calc(100vh - 160px)" }}
        >
          <DirectoryMap
            listings={listings}
            highlightedId={highlightedId}
            onMarkerClick={handleMarkerClick}
            userLocation={userLocation}
          />
        </div>
      </div>
    </div>
  );
}
