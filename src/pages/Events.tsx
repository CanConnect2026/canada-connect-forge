import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import ShareButton from "@/components/ShareButton";
import { Calendar } from "@/components/ui/calendar";
import { format, parse, startOfMonth, addMonths, subMonths } from "date-fns";
import { cn } from "@/lib/utils";

function formatTime(time: string | null) {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateFilter = searchParams.get("date") || undefined;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    dateFilter ? parse(dateFilter, "yyyy-MM-dd", new Date()) : undefined
  );

  const { data: events = [], isLoading } = useEvents({ date: dateFilter });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setSearchParams({ date: format(date, "yyyy-MM-dd") });
    } else {
      setSearchParams({});
    }
  };

  const clearDate = () => {
    setSelectedDate(undefined);
    setSearchParams({});
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary py-12">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Upcoming Events</h1>
          <p className="text-primary-foreground/70 mt-2">Meet, learn, and grow with your community</p>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Event listings */}
          <div>
            {dateFilter && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">
                  Showing events for <strong className="text-foreground">{format(parse(dateFilter, "yyyy-MM-dd", new Date()), "MMMM d, yyyy")}</strong>
                </span>
                <button onClick={clearDate} className="text-xs text-accent hover:underline">
                  Clear filter
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No events found{dateFilter ? " for this date" : ""}.</p>
                {dateFilter && (
                  <button onClick={clearDate} className="text-sm text-accent hover:underline mt-2">
                    View all events
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {events.map(event => (
                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="group flex gap-4 bg-card rounded-lg border overflow-hidden hover:shadow-md transition-all"
                  >
                    {/* Image thumbnail */}
                    <div className="w-40 sm:w-52 shrink-0 bg-muted">
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover min-h-[120px]"
                        />
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
                              <span className="text-muted-foreground font-normal">
                                · {formatTime(event.start_time)}{event.end_time ? ` – ${formatTime(event.end_time)}` : ""}
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
                ))}
              </div>
            )}
          </div>

          {/* Calendar sidebar */}
          <div className="order-first lg:order-last">
            <div className="bg-card rounded-lg border p-4 sticky top-4">
              <h3 className="font-semibold text-foreground mb-3 text-sm">Filter by Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className={cn("p-0 pointer-events-auto")}
              />
              {selectedDate && (
                <button onClick={clearDate} className="w-full mt-3 text-xs text-accent hover:underline text-center">
                  Show all events
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
