import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ontarioCities } from "@/data/mockListings";

export default function CityGuide() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-primary py-10">
        <div className="container">
          <h1 className="text-3xl font-display text-primary-foreground">City Guide</h1>
          <p className="text-primary-foreground/70 mt-1">
            Explore newcomer resources and services by city across Ontario
          </p>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ontarioCities.map(city => (
            <Link
              key={city}
              to={`/directory?city=${encodeURIComponent(city)}`}
              className="group flex items-center justify-between p-5 bg-card border rounded-lg hover:border-accent hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span className="font-medium text-foreground group-hover:text-accent transition-colors">
                  {city}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Can't find your city? Browse all services across Ontario.
          </p>
          <Button asChild>
            <Link to="/directory">View Full Directory</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
