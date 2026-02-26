import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  Heart,
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

export default function ListYourBusiness() {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    setLoading(true);
    const { error } = await supabase.from("business_partner_applications").insert({
      name_on_card: fd.get("cardName") as string,
      company_name: (fd.get("company") as string) || null,
      email: fd.get("email") as string,
      billing_address: fd.get("address") as string,
      country: fd.get("country") as string,
      province: fd.get("province") as string,
      city: fd.get("city") as string,
      postal_code: fd.get("postal") as string,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
      return;
    }

    // In production, redirect to Circle for payment here.
    setPaid(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (paid) {
    return <ConfirmationScreen />;
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container max-w-4xl text-center space-y-6">
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            List Your Business on CanConnect
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Become a Verified Business Partner and gain visibility inside
            Canada's fastest-growing immigrant marketplace. Reach Newcomers
            actively searching for trusted service providers.
          </p>
          {/* Progress */}
          <div className="flex items-center justify-center gap-1 pt-4">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div
                  className={`flex items-center justify-center h-8 w-8 rounded-full text-sm font-bold shrink-0 ${
                    step.completed
                      ? "bg-accent text-accent-foreground"
                      : i === 1
                        ? "border-2 border-accent/60 text-accent"
                        : "border-2 border-primary-foreground/30 text-primary-foreground/50"
                  }`}
                >
                  {step.completed ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    step.completed ? "text-accent" : "text-primary-foreground/60"
                  }`}
                >
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <div className="w-8 md:w-16 h-px bg-primary-foreground/20 mx-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-column: content left, form right */}
      <section className="py-12 md:py-20">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Left column — content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Benefits */}
              <div className="space-y-5">
                <h2 className="font-display text-2xl md:text-3xl">
                  Why Become a Verified Partner?
                </h2>
                <ul className="space-y-4">
                  {benefits.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-3">
                      <div className="rounded-lg bg-accent/10 p-2 shrink-0 mt-0.5">
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-foreground font-medium text-sm leading-snug">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="space-y-3 p-6 rounded-xl bg-section-alt">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Annual Investment
                </p>
                <p className="font-display text-3xl text-foreground">
                  $199<span className="text-lg text-muted-foreground">/year</span>
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transparent pricing. No hidden fees. Your investment positions
                  your business in front of Newcomers actively looking for
                  trusted service providers inside the CanConnect ecosystem.
                </p>
              </div>

              {/* Nonprofit callout */}
              <div className="p-5 rounded-xl border-2 border-accent/20 bg-accent/5 space-y-3">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-accent" />
                  <h3 className="font-display text-lg">Nonprofit or government?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Community partners receive a <strong>free 12-month listing</strong>. No payment required.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/community-partner">Apply as Community Partner</Link>
                </Button>
              </div>
            </div>

            {/* Right column — sticky payment form */}
            <div className="lg:col-span-3">
              <div className="lg:sticky lg:top-24">
                <Card className="border shadow-sm">
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <h2 className="font-display text-2xl">Complete Payment</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Secure, encrypted payment</span>
                      <ShieldCheck className="h-4 w-4 ml-auto text-accent" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" name="cardName" placeholder="Full name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name (optional)</Label>
                          <Input id="company" name="company" placeholder="Company name" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Business Email</Label>
                        <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Billing Address</Label>
                        <Input id="address" name="address" placeholder="Street address" required />
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" name="country" defaultValue="Canada" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="province">Province</Label>
                          <Input id="province" name="province" placeholder="ON" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" name="city" placeholder="Toronto" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postal">Postal Code</Label>
                          <Input id="postal" name="postal" placeholder="M5V 1A1" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card">Card Details</Label>
                        <Input id="card" placeholder="Card number" required />
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
            </div>
          </div>
        </div>
      </section>
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
