import { Heart, MessageSquare, PenLine, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function GetInvolved() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Get Involved</h1>
          <p className="text-primary-foreground/70 mt-2">Help us build a better experience for every newcomer</p>
        </div>
      </div>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {[
            { icon: PenLine, title: "Suggest a Service", desc: "Know a great resource? Help us grow our directory by suggesting trusted services.", cta: "Submit a Service", href: "/suggest" },
            { icon: Heart, title: "Volunteer", desc: "Join our team of community reviewers, translators, or event volunteers.", cta: "Learn More", href: "/contact" },
            { icon: MessageSquare, title: "Share Your Story", desc: "Your experience can help others. Share your immigration journey with the community.", cta: "Get Started", href: "/contact" },
          ].map(card => (
            <div key={card.title} className="bg-card rounded-lg border p-6 flex flex-col">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <card.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">{card.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 flex-1">{card.desc}</p>
              <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90 w-fit" size="sm" asChild>
                <Link to={card.href}>{card.cta} <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
