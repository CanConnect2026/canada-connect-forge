import { useParams, Link } from "react-router-dom";
import { useListing } from "@/hooks/useListings";
import { useRelatedListings } from "@/hooks/useRelatedListings";
import { useAuth } from "@/hooks/useAuth";
import ListingBadge from "@/components/ListingBadge";
import ListingCard from "@/components/ListingCard";
import ListingDetailMap from "@/components/ListingDetailMap";
import { MapPin, Phone, Globe, Mail, Clock, ChevronLeft, Flag, ExternalLink, Facebook, Twitter, Instagram, Linkedin, Image as ImageIcon, Navigation, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ClaimForm from "@/components/ClaimForm";
import ShareButton from "@/components/ShareButton";
import type { Json } from "@/integrations/supabase/types";

function parseSocialLinks(social: Json | null): Record<string, string> {
  if (!social || typeof social !== "object" || Array.isArray(social)) return {};
  return social as Record<string, string>;
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading } = useListing(id || "");
  const { data: relatedListings = [] } = useRelatedListings(listing);
  const { user } = useAuth();
  const [showClaimForm, setShowClaimForm] = useState(false);

  if (isLoading) return <div className="container py-16 text-center text-muted-foreground">Loading...</div>;
  if (!listing) return (
    <div className="container py-16 text-center">
      <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
      <p className="text-muted-foreground font-medium">Listing not found</p>
      <p className="text-sm text-muted-foreground mt-1">This service may have been removed or the link may be incorrect.</p>
      <Link to="/directory" className="inline-block mt-4 text-accent hover:underline text-sm">← Back to Directory</Link>
    </div>
  );

  const description = listing.description_en || "";
  const socialLinks = parseSocialLinks(listing.social_links);
  const hasSocialLinks = Object.values(socialLinks).some(v => v);
  const images = listing.images?.filter(Boolean) || [];
  const hasMap = listing.latitude && listing.longitude;
  const directionsUrl = hasMap
    ? `https://www.google.com/maps/dir/?api=1&destination=${listing.latitude},${listing.longitude}`
    : listing.full_address
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(listing.full_address)}`
      : null;

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary py-6">
        <div className="container">
          <Link to="/directory" className="inline-flex items-center gap-1 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4">
            <ChevronLeft className="w-4 h-4" /> Back to Directory
          </Link>
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-display text-primary-foreground">{listing.name}</h1>
                <ListingBadge type={listing.listing_type} />
              </div>
              <p className="text-primary-foreground/70 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {listing.full_address || `${listing.city}, ${listing.province}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ShareButton
                title={listing.name}
                text={`Check out ${listing.name} on CanConnect`}
                variant="button"
                className="[&_button]:bg-transparent [&_button]:border-primary-foreground/30 [&_button]:text-primary-foreground [&_button]:hover:bg-primary-foreground/10"
              />
              {listing.claim_status === "unclaimed" && listing.listing_type !== "paid" && (
                <Button
                  variant="outline"
                  className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => setShowClaimForm(true)}
                >
                  <Flag className="w-4 h-4 mr-2" /> Claim This Listing
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-card rounded-lg border p-6">
              <h2 className="font-display text-xl text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {description || "No description available yet. If you represent this organization, claim this listing to add more details."}
              </p>
            </div>

            {/* Image Gallery */}
            {images.length > 0 ? (
              <div className="bg-card rounded-lg border overflow-hidden">
                {images.length === 1 ? (
                  <div className="w-full aspect-[16/9] bg-muted">
                    <img src={images[0]} alt={`${listing.name} photo`} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-1 p-1">
                    {images.map((img, i) => (
                      <div key={i} className={`bg-muted overflow-hidden ${i === 0 && images.length === 3 ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                        <img src={img} alt={`${listing.name} photo ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-card rounded-lg border p-6">
                <h2 className="font-display text-xl text-foreground mb-3">Photos</h2>
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <ImageIcon className="w-10 h-10 mb-2 opacity-40" />
                  <p className="text-sm">No photos yet. Claim this listing to add images.</p>
                </div>
              </div>
            )}

            {/* Services */}
            {listing.services_provided && listing.services_provided.length > 0 && (
              <div className="bg-card rounded-lg border p-6">
                <h2 className="font-display text-xl text-foreground mb-3">Services Provided</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {listing.services_provided.map(s => (
                    <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {listing.languages_served.length > 0 && (
              <div className="bg-card rounded-lg border p-6">
                <h2 className="font-display text-xl text-foreground mb-3">Languages Served</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.languages_served.map(lang => (
                    <span key={lang} className="text-sm bg-secondary px-3 py-1 rounded-full text-secondary-foreground">{lang}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Map & Directions */}
            {hasMap && (
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-xl text-foreground">Location</h2>
                  {directionsUrl && (
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                    >
                      <Navigation className="w-4 h-4" /> Get Directions
                    </a>
                  )}
                </div>
                <ListingDetailMap latitude={listing.latitude!} longitude={listing.longitude!} name={listing.name} />
                {listing.full_address && (
                  <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 shrink-0" /> {listing.full_address}
                  </p>
                )}
              </div>
            )}

            {/* Trust label */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-accent/60" />
              <span>Community-submitted · Reviewed by CanConnect</span>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact */}
            <div className="bg-card rounded-lg border p-5">
              <h3 className="font-semibold text-foreground mb-3">Contact Information</h3>
              <div className="space-y-3 text-sm">
                {listing.phone && (
                  <a href={`tel:${listing.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent">
                    <Phone className="w-4 h-4 shrink-0" /> {listing.phone}
                  </a>
                )}
                {listing.email && (
                  <a href={`mailto:${listing.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent">
                    <Mail className="w-4 h-4 shrink-0" /> {listing.email}
                  </a>
                )}
                {listing.website && (
                  <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-accent">
                    <Globe className="w-4 h-4 shrink-0" /> Visit Website
                  </a>
                )}
                {directionsUrl && !hasMap && (
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-accent">
                    <Navigation className="w-4 h-4 shrink-0" /> Get Directions
                  </a>
                )}
                {!listing.phone && !listing.email && !listing.website && (
                  <p className="text-muted-foreground text-sm">No contact information available yet.</p>
                )}
              </div>
            </div>

            {/* Social Links */}
            {hasSocialLinks && (
              <div className="bg-card rounded-lg border p-5">
                <h3 className="font-semibold text-foreground mb-3">Social Media</h3>
                <div className="flex gap-3">
                  {Object.entries(socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    const Icon = socialIcons[platform.toLowerCase()] || ExternalLink;
                    return (
                      <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" title={platform}>
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Category */}
            <div className="bg-card rounded-lg border p-5">
              <h3 className="font-semibold text-foreground mb-3">Category</h3>
              <Link to={`/directory?category=${encodeURIComponent(listing.category)}`} className="text-sm text-accent font-medium hover:underline">
                {listing.category}
              </Link>
            </div>

            {/* Pricing */}
            {listing.pricing_info && (
              <div className="bg-card rounded-lg border p-5">
                <h3 className="font-semibold text-foreground mb-3">Pricing</h3>
                <p className="text-sm text-muted-foreground">{listing.pricing_info}</p>
              </div>
            )}

            {/* Address */}
            {listing.full_address && (
              <div className="bg-card rounded-lg border p-5">
                <h3 className="font-semibold text-foreground mb-3">Address</h3>
                <p className="text-sm text-muted-foreground">{listing.full_address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Listings */}
        {relatedListings.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-display text-foreground mb-6">Similar Services Near You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedListings.map(l => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Claim form modal */}
      {showClaimForm && (
        <ClaimForm listingId={listing.id} listingName={listing.name} onClose={() => setShowClaimForm(false)} />
      )}
    </div>
  );
}
