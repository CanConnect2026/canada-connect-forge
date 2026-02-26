import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  MessageSquare,
  BadgeCheck,
  CalendarPlus,
  Users,
  Star,
} from "lucide-react";

const benefits = [
  { icon: Search, label: "Full searchable business profile" },
  { icon: MessageSquare, label: "Direct client inquiries" },
  { icon: BadgeCheck, label: "Verified Partner badge" },
  { icon: CalendarPlus, label: "Ability to post events & promotions" },
  { icon: Users, label: "Access to the partner community" },
  { icon: Star, label: "Eligibility for spotlight features" },
];

export default function ListYourBusiness() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container max-w-3xl text-center space-y-6">
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            List Your Business on CanConnect
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Become a Verified Business Partner and gain visibility inside
            Canada's fastest-growing immigrant marketplace. Reach Newcomers
            actively searching for trusted service providers.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl space-y-10">
          <h2 className="font-display text-3xl md:text-4xl text-center">
            Why Become a Verified Partner?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, label }) => (
              <Card
                key={label}
                className="border-none shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="rounded-lg bg-accent/10 p-2.5 shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-foreground font-medium leading-snug">
                    {label}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-20 bg-section-alt">
        <div className="container max-w-2xl text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Annual Investment
          </p>
          <p className="font-display text-5xl md:text-6xl text-foreground">
            $199<span className="text-2xl text-muted-foreground">/year</span>
          </p>
          <p className="text-muted-foreground">
            Transparent pricing. No hidden fees.
          </p>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Your investment positions your business in front of Newcomers who
            are actively looking for trusted service providers inside the
            CanConnect ecosystem.
          </p>

          <Button size="lg" className="mt-4 text-base px-8" asChild>
            <Link to="/partner-registration">
              Apply to Become a Verified Business Partner
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
