import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Heart,
  BadgeCheck,
  Search,
  MessageSquare,
  CalendarPlus,
  Users,
  Star,
  Link2,
  ArrowRight,
} from "lucide-react";

const businessBenefits = [
  "Full searchable business profile",
  "Direct client inquiries",
  "Verified Partner badge",
  "Post events & promotions",
  "Partner community access",
  "Spotlight feature eligibility",
];

const nonprofitBenefits = [
  "Full searchable organization profile",
  "Direct newcomer inquiries",
  "Verified Community Partner badge",
  "Post events & opportunities",
  "Partner network access",
  "No payment required",
];

export default function Partners() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container max-w-3xl text-center space-y-6">
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            Partner With CanConnect
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Join Canada's fastest-growing newcomer ecosystem. Whether you're a
            business or a nonprofit, we have a partnership path built for you.
          </p>
        </div>
      </section>

      {/* Two paths */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Partner */}
            <Card className="border-2 border-border hover:border-accent/40 transition-colors relative overflow-hidden">
              <CardContent className="p-8 md:p-10 flex flex-col h-full">
                <div className="rounded-full bg-accent/10 p-4 w-fit mb-6">
                  <Briefcase className="h-7 w-7 text-accent" />
                </div>

                <h2 className="font-display text-2xl md:text-3xl mb-2">
                  Verified Business Partner
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  For businesses providing products or services to newcomers in Canada.
                </p>

                <div className="mb-6">
                  <p className="font-display text-3xl text-foreground">
                    $199<span className="text-base text-muted-foreground">/year</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Transparent pricing. No hidden fees.
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {businessBenefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                      <BadgeCheck className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>

                <Button size="lg" className="w-full text-base" asChild>
                  <Link to="/list-your-business">
                    Learn More & Apply <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Community Partner */}
            <Card className="border-2 border-accent/30 hover:border-accent/50 transition-colors relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  FREE
                </span>
              </div>
              <CardContent className="p-8 md:p-10 flex flex-col h-full">
                <div className="rounded-full bg-accent/10 p-4 w-fit mb-6">
                  <Heart className="h-7 w-7 text-accent" />
                </div>

                <h2 className="font-display text-2xl md:text-3xl mb-2">
                  Verified Community Partner
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  For nonprofits, government agencies, and settlement organizations.
                </p>

                <div className="mb-6">
                  <p className="font-display text-3xl text-accent">
                    FREE <span className="text-base text-muted-foreground">for 12 months</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    No payment required. Eligibility reviewed annually.
                  </p>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {nonprofitBenefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                      <BadgeCheck className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>

                <Button size="lg" className="w-full text-base" asChild>
                  <Link to="/community-partner">
                    Apply as Community Partner <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-16 bg-section-alt">
        <div className="container max-w-2xl text-center space-y-4">
          <h3 className="font-display text-2xl">Not sure which is right for you?</h3>
          <p className="text-muted-foreground text-sm">
            Reach out and our team will help you determine the best partnership path.
          </p>
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
