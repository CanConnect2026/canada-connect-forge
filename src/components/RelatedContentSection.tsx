import { Link } from "react-router-dom";
import { Clock, Calendar, MapPin, BookOpen } from "lucide-react";
import { format, parse } from "date-fns";
import ListingBadge from "./ListingBadge";
import type { BadgeType } from "./ListingBadge";

interface RelatedItem {
  id: string;
  title: string;
  href: string;
  imageUrl?: string | null;
  category?: string | null;
  meta?: string;
  metaIcon?: "clock" | "calendar" | "location";
  badgeType?: BadgeType;
  fallbackIcon?: "calendar" | "book" | "location";
}

interface RelatedContentSectionProps {
  title: string;
  items: RelatedItem[];
}

const metaIcons = {
  clock: Clock,
  calendar: Calendar,
  location: MapPin,
};

const fallbackIcons = {
  calendar: Calendar,
  book: BookOpen,
  location: MapPin,
};

function RelatedCard({ item }: { item: RelatedItem }) {
  const FallbackIcon = item.fallbackIcon ? fallbackIcons[item.fallbackIcon] : BookOpen;
  const MetaIcon = item.metaIcon ? metaIcons[item.metaIcon] : null;

  return (
    <Link
      to={item.href}
      className="group bg-card rounded-lg border overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
    >
      {item.imageUrl ? (
        <div className="h-36 bg-muted overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {item.badgeType && (
            <div className="absolute top-3 left-3">
              <ListingBadge type={item.badgeType} />
            </div>
          )}
        </div>
      ) : (
        <div className="h-36 bg-muted flex items-center justify-center">
          <FallbackIcon className="w-8 h-8 text-muted-foreground opacity-30" />
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        {item.category && (
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {item.category}
          </span>
        )}
        <h3 className="font-semibold mt-1 text-foreground text-sm group-hover:text-accent transition-colors line-clamp-2">
          {item.title}
        </h3>
        {item.meta && (
          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
            {MetaIcon && <MetaIcon className="w-3 h-3" />}
            {item.meta}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function RelatedContentSection({ title, items }: RelatedContentSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-display text-foreground mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <RelatedCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

// Helpers to convert data models to RelatedItem

export function listingToRelatedItem(l: any): RelatedItem {
  return {
    id: l.id,
    title: l.name,
    href: `/listing/${l.id}`,
    imageUrl: l.logo_url || (l.images && l.images.length > 0 ? l.images[0] : null),
    category: l.category,
    meta: `${l.city}, ${l.province}`,
    metaIcon: "location",
    badgeType: l.listing_type as BadgeType,
    fallbackIcon: "location",
  };
}

export function eventToRelatedItem(e: any): RelatedItem {
  let dateStr = "";
  try {
    dateStr = format(parse(e.event_date, "yyyy-MM-dd", new Date()), "MMM d, yyyy");
  } catch {
    dateStr = e.event_date;
  }
  return {
    id: e.id,
    title: e.title,
    href: `/events/${e.id}`,
    imageUrl: e.image_url,
    category: dateStr,
    meta: e.location || undefined,
    metaIcon: "location",
    fallbackIcon: "calendar",
  };
}

export function articleToRelatedItem(a: any): RelatedItem {
  return {
    id: a.id,
    title: a.title,
    href: `/how-to/${a.slug}`,
    imageUrl: a.featured_image_url,
    category: a.category,
    meta: `${a.estimated_read_minutes} min read`,
    metaIcon: "clock",
    fallbackIcon: "book",
  };
}
