import { MapPin, Calendar, ArrowRight } from "lucide-react";

const events = [
  { title: "Newcomer Welcome Night — Toronto", date: "March 8, 2026", time: "6:00 PM – 9:00 PM", location: "Metro Toronto Convention Centre", desc: "An evening of networking, live performances, and resources for newly arrived immigrants." },
  { title: "Resume & Interview Workshop", date: "March 15, 2026", time: "10:00 AM – 1:00 PM", location: "Achēv Centre, Mississauga", desc: "Hands-on workshop to build a Canadian-style resume and practice interview techniques." },
  { title: "Multilingual Health & Wellness Fair", date: "March 22, 2026", time: "11:00 AM – 4:00 PM", location: "Access Alliance, Toronto", desc: "Free health screenings, mental health workshops, and wellness resources in 10+ languages." },
  { title: "Housing 101 for Newcomers", date: "April 2, 2026", time: "2:00 PM – 4:00 PM", location: "Ottawa Public Library — Main Branch", desc: "Learn about tenant rights, rental processes, and affordable housing resources in Ontario." },
  { title: "Community Kitchen — Cook & Connect", date: "April 10, 2026", time: "5:00 PM – 8:00 PM", location: "Newcomer Kitchen, Toronto", desc: "Share dishes from your home country, make new friends, and learn about food entrepreneurship." },
];

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
          {events.map(event => (
            <div key={event.title} className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent uppercase">
                <Calendar className="w-3.5 h-3.5" /> {event.date} · {event.time}
              </div>
              <h3 className="text-lg font-semibold text-foreground mt-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {event.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
