import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  Heart,
  BadgeCheck,
  ArrowRight,
  Globe,
  TrendingUp,
  ShieldCheck,
  Users,
  Eye,
  MessageSquare,
  Megaphone,
  BarChart3,
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

const whyPartner = [
  {
    icon: Eye,
    title: "Visibility Where It Matters",
    description:
      "Your listing appears directly in front of newcomers actively searching for services in your area — not buried in generic directories.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Credibility",
    description:
      "The Verified Partner badge signals to newcomers that your organization has been reviewed and is recognized by CanConnect.",
  },
  {
    icon: TrendingUp,
    title: "Growing Audience",
    description:
      "CanConnect is one of Canada's fastest-growing newcomer platforms. Partner early and grow with us as the ecosystem expands across Ontario and beyond.",
  },
  {
    icon: MessageSquare,
    title: "Direct Inquiries",
    description:
      "Newcomers contact you directly through your profile — no middleman, no lead forms, no delays.",
  },
  {
    icon: Megaphone,
    title: "Promote Events & Services",
    description:
      "Share workshops, open houses, hiring events, and promotions directly with newcomers who need them most.",
  },
  {
    icon: Users,
    title: "Community & Collaboration",
    description:
      "Join a network of partners who are committed to supporting newcomers. Collaborate, refer, and build together.",
  },
];

const stats = [
  { value: "50K+", label: "Monthly newcomer visitors" },
  { value: "15+", label: "Ontario cities served" },
  { value: "500+", label: "Services listed" },
  { value: "95%", label: "Partner satisfaction rate" },
];

const howItWorks = [
  {
    step: "1",
    title: "Choose Your Path",
    description: "Select Business Partner or Community Partner based on your organization type.",
  },
  {
    step: "2",
    title: "Submit Your Application",
    description: "Complete the application form with your organization details.",
  },
  {
    step: "3",
    title: "Get Reviewed & Approved",
    description: "Our team reviews your application to ensure quality and relevance.",
  },
  {
    step: "4",
    title: "Go Live",
    description: "Your verified profile becomes searchable and visible to newcomers across Ontario.",
  },
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
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <a href="#partner-options">View Partnership Options</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-section-alt border-b">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl text-accent">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl md:text-4xl">
              Why Partner With CanConnect?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We connect your organization directly with newcomers who are actively
              searching for trusted services and support in their community.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyPartner.map(({ icon: Icon, title, description }) => (
              <div key={title} className="space-y-3">
                <div className="rounded-lg bg-accent/10 p-3 w-fit">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-section-alt">
        <div className="container max-w-4xl space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl md:text-4xl">How It Works</h2>
            <p className="text-muted-foreground">
              Getting listed is simple — here's what to expect.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map(({ step, title, description }) => (
              <div key={step} className="text-center space-y-3">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-accent text-accent-foreground font-bold text-lg">
                  {step}
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section id="partner-options" className="py-16 md:py-24 scroll-mt-20">
        <div className="container max-w-5xl space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-display text-3xl md:text-4xl">
              Choose Your Partnership Path
            </h2>
            <p className="text-muted-foreground">
              Select the option that best fits your organization.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Business Partner */}
            <Card className="border-2 border-border hover:border-accent/40 transition-colors relative overflow-hidden">
              <CardContent className="p-8 md:p-10 flex flex-col h-full">
                <div className="rounded-full bg-accent/10 p-4 w-fit mb-6">
                  <Briefcase className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl mb-2">
                  Verified Business Partner
                </h3>
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
                <h3 className="font-display text-2xl md:text-3xl mb-2">
                  Verified Community Partner
                </h3>
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
