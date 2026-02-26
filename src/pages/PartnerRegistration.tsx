import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Search,
  MessageSquare,
  BadgeCheck,
  CalendarPlus,
  Users,
  Star,
  Link2,
  Lock,
  ShieldCheck,
  PartyPopper,
} from "lucide-react";

const benefits = [
  { icon: Search, label: "Full searchable business profile" },
  { icon: MessageSquare, label: "Direct client inquiries" },
  { icon: Link2, label: "Website & social media links" },
  { icon: CalendarPlus, label: "Ability to post events & promotions" },
  { icon: BadgeCheck, label: "Verified Partner badge" },
  { icon: Users, label: "Access to partner community" },
  { icon: Star, label: "Eligibility for spotlight features" },
];

const steps = [
  { label: "Application Submitted", completed: true },
  { label: "Complete Payment", completed: false },
  { label: "Profile Activated", completed: false },
];

export default function PartnerRegistration() {
  const [paid, setPaid] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production this would integrate with Circle for payment processing.
    // For now we show the confirmation state.
    setPaid(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (paid) {
    return <ConfirmationScreen />;
  }

  return (
    <main className="min-h-screen py-12 md:py-16">
      <div className="container max-w-3xl space-y-12">
        {/* Title */}
        <h1 className="font-display text-3xl md:text-4xl text-center">
          Activate Your Verified Business Partner Profile
        </h1>

        {/* Progress */}
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold shrink-0 ${
                  step.completed
                    ? "bg-accent text-accent-foreground"
                    : i === 1
                      ? "border-2 border-accent text-accent"
                      : "border-2 border-muted text-muted-foreground"
                }`}
              >
                {step.completed ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:inline ${
                  step.completed ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
              {i < steps.length - 1 && (
                <div className="w-8 md:w-16 h-px bg-border mx-1" />
              )}
            </div>
          ))}
        </div>

        {/* Benefits */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl">What You Get</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2 shrink-0">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <div className="text-center space-y-2 py-4 border-y border-border">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Annual Investment
          </p>
          <p className="font-display text-4xl text-foreground">
            $199<span className="text-lg text-muted-foreground">/year</span>
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            This investment ensures your business is positioned prominently
            inside the trusted CanConnect partner network.
          </p>
        </div>

        {/* Payment Form */}
        <Card className="border shadow-sm">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Secure, encrypted payment</span>
              <ShieldCheck className="h-4 w-4 ml-auto text-accent" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="Full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name (optional)</Label>
                  <Input id="company" placeholder="Company name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Business Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Billing Address</Label>
                <Input id="address" placeholder="Street address" required />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue="Canada" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Input id="province" placeholder="ON" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Toronto" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal">Postal Code</Label>
                  <Input id="postal" placeholder="M5V 1A1" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="card">Card Details</Label>
                <Input
                  id="card"
                  placeholder="Card number"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="MM / YY" required />
                  <Input placeholder="CVC" required />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full text-base">
                Complete Registration & Activate Profile
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Payment securely processed through Circle. Your data is
                encrypted and never stored on our servers.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function ConfirmationScreen() {
  return (
    <main className="min-h-screen flex items-center justify-center py-16">
      <div className="container max-w-lg text-center space-y-8">
        <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
          <PartyPopper className="h-8 w-8 text-accent" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl">
          Congratulations — Your Profile Is Now Active
        </h1>
        <p className="text-muted-foreground">
          Your Verified Business Partner listing is now live and searchable
          inside CanConnect.
        </p>

        <ul className="text-left max-w-xs mx-auto space-y-2 text-sm text-foreground">
          <li>• Edit your profile</li>
          <li>• Receive direct inquiries</li>
          <li>• Post events & promotions</li>
          <li>• Access the partner community</li>
          <li>• Use your Verified Partner badge</li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild>
            <Link to="/directory">Go to My Listing</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
