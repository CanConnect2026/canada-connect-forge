import { useParams, Link } from "react-router-dom";
import Breadcrumb from "@/components/Breadcrumb";
import { useEvent, useRelatedEvents } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";
import { MapPin, Calendar, Clock, Plus, Globe, Mail, Phone, ExternalLink, Tag } from "lucide-react";
import RelatedContentSection, { eventToRelatedItem } from "@/components/RelatedContentSection";
import ReportIssueDialog from "@/components/ReportIssueDialog";
import ShareButton from "@/components/ShareButton";
import ListingDetailMap from "@/components/ListingDetailMap";
import { Button } from "@/components/ui/button";
import { format, parse } from "date-fns";

function formatTime(time: string | null) {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading } = useEvent(id || "");
  const { data: relatedEvents = [] } = useRelatedEvents(event);
  const { user } = useAuth();

  if (isLoading) return <div className="container py-16 text-center text-muted-foreground">Loading...</div>;
  if (!event) return (
    <div className="container py-16 text-center">
      <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
      <p className="text-muted-foreground font-medium">Event not found</p>
      <p className="text-sm text-muted-foreground mt-1">This event may have been removed or the link may be incorrect.</p>
      <Link to="/events" className="inline-block mt-4 text-accent hover:underline text-sm">← Back to Events</Link>
    </div>
  );

  const eventDate = format(parse(event.event_date, "yyyy-MM-dd", new Date()), "MMMM d, yyyy");
  const hasContactInfo = event.website || event.contact_email || event.contact_phone;
  const socialLinks = event.social_links && typeof event.social_links === "object" ? event.social_links : null;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero image */}
      {event.image_url && (
        <div className="w-full h-[300px] md:h-[400px] bg-muted overflow-hidden">
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="container py-8">
        <Breadcrumb
          items={[
            { label: "Events", to: "/events" },
            { label: event.title },
          ]}
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-accent uppercase mb-2">
                  <Calendar className="w-4 h-4" /> {eventDate}
                </div>
                <h1 className="text-3xl font-display text-foreground">{event.title}</h1>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <ShareButton title={event.title} text={`${event.title} — ${eventDate}`} variant="button" />
                <Link to={user ? "/submit-event" : "/login"}>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" /> Add Your Event
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4 text-sm text-muted-foreground">
              {event.start_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {formatTime(event.start_time)}{event.end_time ? ` – ${formatTime(event.end_time)}` : ""}
                </span>
              )}
              {event.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" /> {event.location}
                </span>
              )}
              {event.cost_type && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${event.cost_type === "Free" ? "bg-accent/10 text-accent" : "bg-secondary text-secondary-foreground"}`}>
                  {event.cost_type}
                </span>
              )}
              {event.category && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                  <Tag className="w-3 h-3" /> {event.category}
                </span>
              )}
            </div>

            {event.description && (
              <div className="bg-card rounded-lg border p-6 mt-6">
                <h2 className="font-display text-xl text-foreground mb-3">About This Event</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{event.description}</p>
              </div>
            )}

            {/* Contact & Links */}
            {(hasContactInfo || socialLinks) && (
              <div className="bg-card rounded-lg border p-6 mt-4">
                <h2 className="font-display text-lg text-foreground mb-3">Contact & Links</h2>
                <div className="space-y-2.5 text-sm">
                  {event.website && (
                    <a href={event.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-accent hover:underline">
                      <Globe className="w-4 h-4" /> Visit Website
                    </a>
                  )}
                  {event.contact_email && (
                    <a href={`mailto:${event.contact_email}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent">
                      <Mail className="w-4 h-4" /> {event.contact_email}
                    </a>
                  )}
                  {event.contact_phone && (
                    <a href={`tel:${event.contact_phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent">
                      <Phone className="w-4 h-4" /> {event.contact_phone}
                    </a>
                  )}
                  {socialLinks && Object.entries(socialLinks).map(([key, url]) => (
                    <a key={key} href={url as string} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-accent capitalize">
                      <ExternalLink className="w-4 h-4" /> {key}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Community-submitted label + Report */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                Community-submitted · Reviewed by CanConnect
              </p>
              <ReportIssueDialog
                relatedUrl={window.location.href}
                relatedEventId={event.id}
              />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {event.location && (
              <div className="bg-card rounded-lg border p-5">
                <h3 className="font-semibold text-foreground text-sm mb-3">Get Directions</h3>
                <a
                  href={event.latitude && event.longitude
                    ? `https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`
                    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.location + (event.city ? `, ${event.city}, ON` : ", ON"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <MapPin className="w-4 h-4" /> Open in Google Maps
                </a>
              </div>
            )}

            {/* Submit CTA */}
            <div className="bg-card rounded-lg border p-5 text-center">
              <p className="text-sm text-muted-foreground mb-2">Have an event to share?</p>
              <Link to={user ? "/submit-event" : "/login"}>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-1" /> Submit Your Event
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-2">Free for community events</p>
            </div>
          </div>
        </div>

        {/* Location map */}
        {((event.latitude && event.longitude) || event.location) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display text-foreground mb-4">Location</h2>
              {(event.latitude && event.longitude) ? (
                <ListingDetailMap latitude={event.latitude} longitude={event.longitude} name={event.title} />
              ) : (
                <iframe
                  title="Location map"
                  className="w-full h-[300px] rounded-lg border"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(event.location + (event.city ? `, ${event.city}` : ''))}&output=embed`}
                  allowFullScreen
                  loading="lazy"
                />
              )}
            </div>
          </div>
        )}

        <RelatedContentSection
          title="Other Upcoming Events"
          items={relatedEvents.map(eventToRelatedItem)}
        />
      </div>
    </div>
  );
}
