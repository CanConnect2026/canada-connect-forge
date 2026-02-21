import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin, Calendar as CalendarIcon, Clock, Plus, Tag } from "lucide-react";
import { useEvents, Event } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";
import ShareButton from "@/components/ShareButton";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, parse } from "date-fns";
import { cn } from "@/lib/utils";
import { EVENT_CATEGORIES } from "@/data/eventCategories";
import VideoTipModule from "@/components/VideoTipModule";
import NewsletterSignup from "@/components/NewsletterSignup";

function formatTime(time: string | null) {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function EventCard({ event, isPast }: { event: Event; isPast: boolean }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex gap-4 bg-card rounded-lg border overflow-hidden hover:shadow-md transition-all relative"
    >
      {isPast && (
        <span className="absolute top-2 left-2 z-10 text-[10px] font-semibold uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
          Past Event
        </span>
      )}
      {/* Image thumbnail */}
      <div className="w-40 sm:w-52 shrink-0 bg-muted">
        {event.image_url ? (
          <img src={event.image_url} alt={event.title} className="w-full h-full object-cover min-h-[120px]" />
        ) : (
          <div className="w-full h-full min-h-[120px] flex items-center justify-center text-muted-foreground">
            <CalendarIcon className="w-8 h-8 opacity-30" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 py-4 pr-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase">
              <CalendarIcon className="w-3.5 h-3.5" />
              {format(parse(event.event_date, "yyyy-MM-dd", new Date()), "MMMM d, yyyy")}
              {event.start_time && (
                <span className="text-muted-foreground font-normal flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {formatTime(event.start_time)}{event.end_time ? ` – ${formatTime(event.end_time)}` : ""}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground mt-1 group-hover:text-accent transition-colors">
              {event.title}
            </h3>
          </div>
          <div onClick={e => e.preventDefault()}>
            <ShareButton title={event.title} text={`${event.title} — ${event.event_date}`} url={`${window.location.origin}/events/${event.id}`} variant="icon" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {event.category && (
            <span className="inline-flex items-center gap-1 text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
              <Tag className="w-3 h-3" /> {event.category}
            </span>
          )}
          {event.cost_type && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${event.cost_type === "Free" ? "bg-accent/10 text-accent" : "bg-secondary text-secondary-foreground"}`}>
              {event.cost_type}
            </span>
          )}
        </div>
        {event.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
        )}
        {event.location && (
          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" /> {event.location}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateFilter = searchParams.get("date") || undefined;
  const categoryFilter = searchParams.get("category") || undefined;
  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    dateFilter ? parse(dateFilter, "yyyy-MM-dd", new Date()) : undefined
  );

  const { data: events = [], isLoading } = useEvents({ date: dateFilter, category: categoryFilter });

  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = events.filter(e => e.event_date >= today);
  const pastEvents = events.filter(e => e.event_date < today);

  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    setSearchParams(params);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    updateParams({ date: date ? format(date, "yyyy-MM-dd") : undefined });
  };

  const handleCategorySelect = (cat: string) => {
    updateParams({ category: categoryFilter === cat ? undefined : cat });
  };

  const clearFilters = () => {
    setSelectedDate(undefined);
    setSearchParams({});
  };

  const hasFilters = dateFilter || categoryFilter;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary py-12">
        <div className="container flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-display text-primary-foreground">Upcoming Events</h1>
            <p className="text-primary-foreground/70 mt-2">Meet, learn, and grow with your community</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Link to={user ? "/submit-event" : "/login?redirectTo=/submit-event"}>
              <Button variant="secondary" size="sm">
                <Plus className="w-4 h-4 mr-1" /> Add Your Event
              </Button>
            </Link>
            <span className="text-xs text-primary-foreground/60">Free for community & newcomer-focused events</span>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Event listings */}
          <div>
            {hasFilters && (
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                <span className="text-sm text-muted-foreground">Filtering by:</span>
                {dateFilter && (
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    {format(parse(dateFilter, "yyyy-MM-dd", new Date()), "MMMM d, yyyy")}
                  </span>
                )}
                {categoryFilter && (
                  <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    {categoryFilter}
                  </span>
                )}
                <button onClick={clearFilters} className="text-xs text-accent hover:underline ml-1">
                  Clear all
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading events...</div>
            ) : upcomingEvents.length === 0 && pastEvents.length === 0 ? (
              <div className="text-center py-16">
                <CalendarIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  {hasFilters ? "No events match your filters" : "No upcoming events right now"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {hasFilters
                    ? "Try a different date or category to find what you're looking for."
                    : "Check back soon — new events are added regularly by the community."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
                  {hasFilters && (
                    <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
                  )}
                  <Link to={user ? "/submit-event" : "/login?redirectTo=/submit-event"}>
                    <Button variant="ghost" className="text-accent">Add your event</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {upcomingEvents.length > 0 && (
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <EventCard key={event.id} event={event} isPast={false} />
                    ))}
                  </div>
                )}

                {pastEvents.length > 0 && (
                  <div className="mt-10">
                    <h2 className="text-xl font-display text-foreground mb-4">Past Events</h2>
                    <div className="space-y-4 opacity-75">
                      {pastEvents.map(event => (
                        <EventCard key={event.id} event={event} isPast={true} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last space-y-4">
            <div className="bg-card rounded-lg border p-4 sticky top-4">
              <h3 className="font-semibold text-foreground mb-3 text-sm">Filter by Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className={cn("p-0 pointer-events-auto")}
              />
              {selectedDate && (
                <button onClick={() => handleDateSelect(undefined)} className="w-full mt-3 text-xs text-accent hover:underline text-center">
                  Show all dates
                </button>
              )}
            </div>

            <div className="bg-card rounded-lg border p-4">
              <h3 className="font-semibold text-foreground mb-3 text-sm">Filter by Category</h3>
              <div className="flex flex-wrap gap-1.5">
                {EVENT_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={cn(
                      "text-xs px-2.5 py-1 rounded-full transition-colors",
                      categoryFilter === cat
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <VideoTipModule />

            <div className="bg-card rounded-lg border p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Have an event to share?</p>
              <Link to={user ? "/submit-event" : "/login?redirectTo=/submit-event"}>
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-1" /> {user ? "Submit an Event" : "Log in to submit"}
                </Button>
              </Link>
              <p className="text-xs text-muted-foreground mt-2">Free for community events</p>
            </div>

            <NewsletterSignup source="events" variant="card" />
          </div>
        </div>
      </div>
    </div>
  );
}
