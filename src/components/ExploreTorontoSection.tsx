import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExploreTorontoSection() {
  return (
    <section className="py-12 border-t border-border/40">
      <div className="container text-center max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display text-foreground mb-2">Explore Toronto</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Discover food, culture, and local experiences across the city.
        </p>
        <Button variant="outline" className="gap-2" asChild>
          <a href="https://taste-to-trails.lovable.app">
            Explore FirstBitesTO
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </section>
  );
}
