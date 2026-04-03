import { MapPin } from "lucide-react";
import ListingBadge from "./ListingBadge";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";
import type { BadgeType } from "./ListingBadge";

type Listing = Tables<"listings">;

export default function ListingCard({ listing }: { listing: Listing }) {
  const badgeType = listing.listing_type as BadgeType;
  const description = listing.description_en || "";

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group bg-card rounded-xl border border-border/60 overflow-hidden hover:shadow-xl hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="relative h-44 bg-muted overflow-hidden">
        {listing.logo_url || (listing.images && listing.images.length > 0) ? (
          <img src={listing.logo_url || listing.images![0]} alt={listing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent-secondary/10 text-accent text-4xl font-display">
            {listing.name.charAt(0)}
          </div>
        )}
        <div className="absolute top-3 left-3">
          <ListingBadge type={badgeType} />
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">{listing.category}</span>
        <h3 className="font-bold text-foreground mt-1.5 group-hover:text-accent transition-colors text-base">{listing.name}</h3>
        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 flex-1 leading-relaxed">{description}</p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 text-accent-secondary" />
          {listing.city}, {listing.province}
        </div>
        {listing.languages_served.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {listing.languages_served.slice(0, 3).map(lang => (
              <span key={lang} className="text-xs bg-accent-secondary/10 text-accent-secondary px-2.5 py-0.5 rounded-full font-medium">{lang}</span>
            ))}
            {listing.languages_served.length > 3 && (
              <span className="text-xs text-muted-foreground">+{listing.languages_served.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
