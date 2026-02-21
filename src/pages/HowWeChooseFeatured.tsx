import { Star, CheckCircle2, Heart, DollarSign, Users, Info } from "lucide-react";

const lookForItems = [
  "Serve newcomers in practical, meaningful ways",
  "Are known for trust, accessibility, and community impact",
  "Offer clear services with transparent costs",
  "Address different needs — not just one type of support",
];

const supportTypes = [
  { icon: Heart, text: "Free, community-funded services" },
  { icon: DollarSign, text: "Paid professional services (e.g. legal or career support)" },
  { icon: Users, text: "Cultural and social organizations that help newcomers build belonging" },
];

export default function HowWeChooseFeatured() {
  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">How We Choose Featured Support</h1>
          <p className="text-primary-foreground/70 mt-2">Information about how we select featured organizations</p>
        </div>
      </div>

      <div className="container py-16 max-w-3xl">
        <div className="space-y-10">
          <p className="text-muted-foreground leading-relaxed">
            At CanConnect, our goal is to help newcomers across Ontario find legitimate, useful, and trustworthy support — whether they've just arrived or have been in Canada for several years.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The organizations featured on our homepage are selected to reflect the different stages of the newcomer journey, from immediate needs to long-term stability and community belonging.
          </p>

          {/* What We Look For */}
          <div>
            <h2 className="text-xl font-display text-foreground mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              What We Look For
            </h2>
            <p className="text-muted-foreground text-sm mb-3">We feature organizations that:</p>
            <ul className="space-y-2.5">
              {lookForItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* A Mix of Support Types */}
          <div>
            <h2 className="text-xl font-display text-foreground mb-4">A Mix of Support Types</h2>
            <p className="text-muted-foreground text-sm mb-4">Featured organizations may include:</p>
            <div className="space-y-3">
              {supportTypes.map((item) => (
                <div key={item.text} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                  <item.icon className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              All organizations are clearly labelled so newcomers can quickly understand whether a service is free or paid.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-5 rounded-lg border border-accent/30 bg-accent/5">
            <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Important:</span> Being featured on CanConnect does not mean endorsement, partnership, or sponsorship. It simply means the organization aligns with our mission to help newcomers navigate life in Canada with confidence and clarity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
