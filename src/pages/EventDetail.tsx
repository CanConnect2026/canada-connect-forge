import { useParams, Link } from "react-router-dom";
import { useEvent, useRelatedEvents } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";
import { MapPin, Calendar, Clock, ChevronLeft, Plus } from "lucide-react";
import ShareButton from "@/components/ShareButton";
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
  if (!event) return <div className="container py-16 text-center text-muted-foreground">Event not found.</div>;

  const eventDate = format(parse(event.event_date, "yyyy-MM-dd", new Date()), "MMMM d, yyyy");

  return (
    <div className="bg-background min-h-screen">
      {/* Hero image */}
      {event.image_url && (
        <div className="w-full h-[300px] md:h-[400px] bg-muted overflow-hidden">
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="container py-8">
        <Link to="/events" className="inline-flex items-center gap-1 text-muted-foreground hover:text-accent text-sm mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Events
        </Link>

        <div className="max-w-3xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-accent uppercase mb-2">
                <Calendar className="w-4 h-4" /> {eventDate}
              </div>
              <h1 className="text-3xl font-display text-foreground">{event.title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <ShareButton title={event.title} text={`${event.title} — ${eventDate}`} variant="button" />
              <Link to={user ? "/submit-event" : "/login"}>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add Your Event
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
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
          </div>

          {event.description && (
            <div className="bg-card rounded-lg border p-6 mt-6">
              <h2 className="font-display text-xl text-foreground mb-3">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>
          )}
        </div>

        {/* Related events */}
        {relatedEvents.length > 0 && (
          <div className="mt-12 max-w-3xl">
            <h2 className="text-2xl font-display text-foreground mb-6">Other Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedEvents.map(e => (
                <Link
                  key={e.id}
                  to={`/events/${e.id}`}
                  className="group bg-card rounded-lg border overflow-hidden hover:shadow-md transition-shadow"
                >
                  {e.image_url ? (
                    <div className="h-32 bg-muted">
                      <img src={e.image_url} alt={e.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-32 bg-muted flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-muted-foreground opacity-30" />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="text-xs font-semibold text-accent uppercase">
                      {format(parse(e.event_date, "yyyy-MM-dd", new Date()), "MMM d, yyyy")}
                    </span>
                    <h3 className="font-semibold mt-1 text-foreground text-sm group-hover:text-accent transition-colors">{e.title}</h3>
                    {e.location && (
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {e.location}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
