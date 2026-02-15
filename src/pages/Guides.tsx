import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const cities = [
  { name: "Toronto", slug: "toronto", description: "Transit, neighbourhoods, and services in Canada's largest city." },
  { name: "Ottawa", slug: "ottawa", description: "The capital region — government services, bilingual resources, and more." },
  { name: "Hamilton", slug: "hamilton", description: "Affordable living, growing community programs, and local support." },
  { name: "Brampton", slug: "brampton", description: "One of the most diverse cities — cultural hubs and settlement agencies." },
  { name: "Mississauga", slug: "mississauga", description: "Family-friendly services, transit connections, and newcomer programs." },
  { name: "London", slug: "london", description: "University town with growing newcomer communities and support." },
  { name: "Kitchener", slug: "kitchener", description: "Tech hub with affordable living and strong newcomer settlement services." },
  { name: "Windsor", slug: "windsor", description: "Border city with bilingual opportunities and manufacturing jobs." },
  { name: "Markham", slug: "markham", description: "Diverse tech corridor with strong Chinese and South Asian communities." },
  { name: "Vaughan", slug: "vaughan", description: "Growing suburban city with expanding transit and family services." },
  { name: "Richmond Hill", slug: "richmond-hill", description: "Multicultural suburb with excellent schools and community programs." },
  { name: "Oakville", slug: "oakville", description: "Upscale lakeside town with strong schools and family-oriented living." },
  { name: "Burlington", slug: "burlington", description: "Scenic waterfront city with a balanced lifestyle and growing diversity." },
  { name: "Scarborough", slug: "scarborough", description: "One of Toronto's most diverse districts — affordable and transit-connected." },
];

export default function Guides() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display text-primary-foreground mb-4">
            City Guides
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Everything newcomers need to know about living in Ontario's cities — housing, transit, jobs, healthcare, and community life.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cities.map((city) => (
            <Link key={city.name} to={`/guides/${city.slug}`}>
              <div className="group bg-card rounded-2xl p-6 border hover:border-accent hover:shadow-md transition-all cursor-pointer h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin size={22} className="text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {city.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{city.description}</p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  Read Guide <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
