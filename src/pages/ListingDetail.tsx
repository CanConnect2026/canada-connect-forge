import { useParams, Link } from "react-router-dom";
import { useListing } from "@/hooks/useListings";
import { useAuth } from "@/hooks/useAuth";
import ListingBadge from "@/components/ListingBadge";
import { MapPin, Phone, Globe, Mail, Clock, ChevronLeft, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ClaimForm from "@/components/ClaimForm";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading } = useListing(id || "");
  const { user } = useAuth();
  const [showClaimForm, setShowClaimForm] = useState(false);

  if (isLoading) return <div className="container py-16 text-center text-muted-foreground">Loading...</div>;
  if (!listing) return <div className="container py-16 text-center text-muted-foreground">Listing not found.</div>;

  const description = listing.description_en || "";

  return (
    <div className="bg-background min-h-screen">
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

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h2 className="font-display text-xl text-foreground mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>

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
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
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
              </div>
            </div>

            <div className="bg-card rounded-lg border p-5">
              <h3 className="font-semibold text-foreground mb-3">Category</h3>
              <span className="text-sm text-accent font-medium">{listing.category}</span>
            </div>

            {listing.pricing_info && (
              <div className="bg-card rounded-lg border p-5">
                <h3 className="font-semibold text-foreground mb-3">Pricing</h3>
                <p className="text-sm text-muted-foreground">{listing.pricing_info}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Claim form modal */}
      {showClaimForm && (
        <ClaimForm listingId={listing.id} listingName={listing.name} onClose={() => setShowClaimForm(false)} />
      )}
    </div>
  );
}
