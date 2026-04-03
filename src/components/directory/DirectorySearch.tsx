import { Search, X, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ontarioCities } from "@/data/mockListings";

interface DirectorySearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
}

interface SuggestionItem {
  id: string;
  name: string;
  category: string;
  city: string;
}

export default function DirectorySearch({ search, onSearchChange, selectedCity, onCityChange }: DirectorySearchProps) {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions as user types
  useEffect(() => {
    if (search.length < 2) {
      setSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      const { data } = await supabase
        .from("listings")
        .select("id, name, category, city")
        .eq("is_published", true)
        .or(`name.ilike.%${search}%,description_en.ilike.%${search}%`)
        .limit(6);
      if (data) setSuggestions(data);
    }, 200);
    return () => clearTimeout(timeout);
  }, [search]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredCities = ontarioCities.filter(c =>
    c.toLowerCase().includes(cityFilter.toLowerCase())
  );

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-3xl mx-auto">
      {/* Main search */}
      <div ref={searchRef} className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search services, organizations..."
          className="w-full py-3 pl-10 pr-9 bg-card border-2 border-border rounded-xl text-sm outline-none placeholder:text-muted-foreground text-foreground focus:border-accent transition-colors shadow-sm"
          value={search}
          onChange={e => {
            onSearchChange(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => search.length >= 2 && setShowSuggestions(true)}
        />
        {search && (
          <button
            onClick={() => { onSearchChange(""); setSuggestions([]); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Autocomplete dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
            {suggestions.map(item => (
              <Link
                key={item.id}
                to={`/listing/${item.id}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition-colors border-b border-border/50 last:border-0"
                onClick={() => setShowSuggestions(false)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.category} · {item.city}</p>
                </div>
              </Link>
            ))}
            <button
              className="w-full px-4 py-2.5 text-xs font-medium text-accent hover:bg-accent/5 transition-colors"
              onClick={() => setShowSuggestions(false)}
            >
              View all {search} results →
            </button>
          </div>
        )}
      </div>

      {/* City/Location search */}
      <div ref={cityRef} className="relative w-full sm:w-56">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={selectedCity || "All Ontario"}
          className="w-full py-3 pl-9 pr-9 bg-card border-2 border-border rounded-xl text-sm outline-none placeholder:text-muted-foreground text-foreground focus:border-accent transition-colors shadow-sm"
          value={cityDropdownOpen ? cityFilter : selectedCity}
          onChange={e => {
            setCityFilter(e.target.value);
            setCityDropdownOpen(true);
          }}
          onFocus={() => {
            setCityDropdownOpen(true);
            setCityFilter("");
          }}
        />
        {selectedCity && (
          <button
            onClick={() => { onCityChange(""); setCityFilter(""); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {cityDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
            <button
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent/10 transition-colors text-muted-foreground"
              onClick={() => { onCityChange(""); setCityDropdownOpen(false); }}
            >
              All Ontario
            </button>
            {filteredCities.map(city => (
              <button
                key={city}
                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-accent/10 transition-colors ${
                  selectedCity === city ? "text-accent font-medium" : "text-foreground"
                }`}
                onClick={() => {
                  onCityChange(city);
                  setCityDropdownOpen(false);
                  setCityFilter("");
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
