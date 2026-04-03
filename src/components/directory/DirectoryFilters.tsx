import { X } from "lucide-react";
import { categories, ontarioCities, allLanguages } from "@/data/mockListings";

interface DirectoryFiltersProps {
  selectedCategory: string;
  selectedCity: string;
  selectedLanguage: string;
  selectedType: string;
  onCategoryChange: (v: string) => void;
  onCityChange: (v: string) => void;
  onLanguageChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onClear: () => void;
}

export default function DirectoryFilters({
  selectedCategory, selectedCity, selectedLanguage, selectedType,
  onCategoryChange, onCityChange, onLanguageChange, onTypeChange, onClear,
}: DirectoryFiltersProps) {
  const hasFilters = selectedCategory || selectedCity || selectedLanguage || selectedType;

  return (
    <div className="flex flex-wrap items-center gap-2 justify-center">
      <select
        className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground min-w-[150px]"
        value={selectedCategory}
        onChange={e => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select
        className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground min-w-[130px]"
        value={selectedCity}
        onChange={e => onCityChange(e.target.value)}
      >
        <option value="">All Cities</option>
        {ontarioCities.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <select
        className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground min-w-[130px]"
        value={selectedLanguage}
        onChange={e => onLanguageChange(e.target.value)}
      >
        <option value="">All Languages</option>
        {allLanguages.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <select
        className="bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground min-w-[110px]"
        value={selectedType}
        onChange={e => onTypeChange(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="free">Free</option>
        <option value="nonprofit">Non-Profit</option>
        <option value="paid">Paid</option>
      </select>
      {hasFilters && (
        <button
          className="text-xs text-accent hover:text-accent/80 flex items-center gap-1 transition-colors font-medium"
          onClick={onClear}
        >
          <X className="w-3 h-3" /> Clear
        </button>
      )}
    </div>
  );
}
