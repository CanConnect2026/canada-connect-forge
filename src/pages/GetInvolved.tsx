import { Heart, MessageSquare, PenLine, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function GetInvolved() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Get Involved</h1>
          <p className="text-primary-foreground/70 mt-2">CanConnect is a community-built platform.</p>
        </div>
      </div>
      <div className="container py-16">
        <div className="max-w-3xl mb-12">
          <h2 className="text-2xl font-display text-foreground mb-4">Who This Is For</h2>
          <ul className="text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>Settled immigrants</li>
            <li>Community members</li>
            <li>Writers, researchers, storytellers</li>
            <li>Service providers & organizations</li>
          </ul>
        </div>

        <h2 className="text-2xl font-display text-foreground mb-6">Ways to Get Involved</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: MessageSquare, title: "Share Your Story", desc: "Your experience can help others navigate their journey." },
            { icon: PenLine, title: "Write or Contribute Content", desc: "Help create practical guides, resources, and stories." },
            { icon: Heart, title: "Share Resources or Events", desc: "Know about a helpful service or event? Let us know." },
            { icon: Handshake, title: "Collaborate on Projects", desc: "Partner with us to build impactful community initiatives." },
          ].map((card) => (
            <div key={card.title} className="bg-card rounded-lg border p-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <card.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">{card.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{card.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-display text-foreground mb-6">Ready to Contribute?</h2>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/contact">Share Your Story <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Become a Contributor <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/contact">Collaborate With CanConnect <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
