import { MapPin, Calendar } from "lucide-react";
import ShareButton from "@/components/ShareButton";

const events = [
  { title: "Newcomer Welcome Night — Toronto", date: "March 8, 2026", time: "6:00 PM – 9:00 PM", location: "Metro Toronto Convention Centre", desc: "An evening of networking, live performances, and resources for newly arrived immigrants.", city: "Toronto", theme: "community" },
  { title: "Resume & Interview Workshop", date: "March 15, 2026", time: "10:00 AM – 1:00 PM", location: "Achēv Centre, Mississauga", desc: "Hands-on workshop to build a Canadian-style resume and practice interview techniques.", city: "Mississauga", theme: "employment" },
  { title: "Multilingual Health & Wellness Fair", date: "March 22, 2026", time: "11:00 AM – 4:00 PM", location: "Access Alliance, Toronto", desc: "Free health screenings, mental health workshops, and wellness resources in 10+ languages.", city: "Toronto", theme: "health" },
  { title: "Housing 101 for Newcomers", date: "April 2, 2026", time: "2:00 PM – 4:00 PM", location: "Ottawa Public Library — Main Branch", desc: "Learn about tenant rights, rental processes, and affordable housing resources in Ontario.", city: "Ottawa", theme: "housing" },
  { title: "Community Kitchen — Cook & Connect", date: "April 10, 2026", time: "5:00 PM – 8:00 PM", location: "Newcomer Kitchen, Toronto", desc: "Share dishes from your home country, make new friends, and learn about food entrepreneurship.", city: "Toronto", theme: "community" },
];

function getRelatedEvents(currentIndex: number) {
  const current = events[currentIndex];
  const others = events.filter((_, i) => i !== currentIndex);
  // Prioritize same city or theme
  const scored = others.map(e => ({
    event: e,
    score: (e.city === current.city ? 2 : 0) + (e.theme === current.theme ? 1 : 0),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map(s => s.event);
}

export default function Events() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Upcoming Events</h1>
          <p className="text-primary-foreground/70 mt-2">Meet, learn, and grow with your community</p>
        </div>
      </div>
      <div className="container py-12">
        <div className="space-y-5 max-w-3xl">
          {events.map((event, idx) => (
            <div key={event.title} className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase">
                  <Calendar className="w-3.5 h-3.5" /> {event.date} · {event.time}
                </div>
                <ShareButton title={event.title} text={`${event.title} — ${event.date}`} variant="icon" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mt-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {event.location}
              </p>
            </div>
          ))}
        </div>

        {/* Related events section */}
        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-display text-foreground mb-6">Other Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getRelatedEvents(0).map(event => (
              <div key={event.title} className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow">
                <span className="text-xs font-semibold text-accent uppercase">{event.date}</span>
                <h3 className="font-semibold mt-1 text-foreground text-sm">{event.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {event.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
