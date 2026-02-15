import { MapPin, Globe, Phone } from "lucide-react";
import ListingBadge, { type BadgeType } from "./ListingBadge";
import { Link } from "react-router-dom";

export interface Listing {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  province: string;
  type: BadgeType;
  languages: string[];
  phone?: string;
  website?: string;
  image?: string;
}

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
    >
      <div className="relative h-40 bg-muted overflow-hidden">
        {listing.image ? (
          <img src={listing.image} alt={listing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl font-display">
            {listing.name.charAt(0)}
          </div>
        )}
        <div className="absolute top-3 left-3">
          <ListingBadge type={listing.type} />
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs font-medium text-accent uppercase tracking-wider">{listing.category}</span>
        <h3 className="font-semibold text-foreground mt-1 group-hover:text-accent transition-colors">{listing.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-1">{listing.description}</p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          {listing.city}, {listing.province}
        </div>
        {listing.languages.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {listing.languages.slice(0, 3).map(lang => (
              <span key={lang} className="text-xs bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">{lang}</span>
            ))}
            {listing.languages.length > 3 && (
              <span className="text-xs text-muted-foreground">+{listing.languages.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
