import { Search, X } from "lucide-react";

interface DirectorySearchProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function DirectorySearch({ search, onSearchChange }: DirectorySearchProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search services, organizations, or keywords..."
        className="w-full py-4 pl-12 pr-10 bg-card border-2 border-border rounded-xl text-base outline-none placeholder:text-muted-foreground text-foreground focus:border-accent transition-colors shadow-sm"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
      {search && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
