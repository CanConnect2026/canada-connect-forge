import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MessageSquare,
  Link2,
  CalendarPlus,
  Briefcase,
  BadgeCheck,
  Users,
  PartyPopper,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  { icon: Search, label: "Full searchable organization profile" },
  { icon: MessageSquare, label: "Direct inquiries from newcomers" },
  { icon: Link2, label: "Website & social media links" },
  { icon: CalendarPlus, label: "Ability to post events" },
  { icon: Briefcase, label: "Ability to post job & internship opportunities" },
  { icon: BadgeCheck, label: "Verified Community Partner badge" },
  { icon: Users, label: "Access to partner network" },
];

export default function CommunityPartner() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      toast({ title: "Please confirm your organization qualifies.", variant: "destructive" });
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    setLoading(true);
    const { error } = await supabase.from("community_partner_applications").insert({
      organization_name: fd.get("org_name") as string,
      organization_type: fd.get("org_type") as string,
      primary_services: fd.get("primary_services") as string,
      target_communities: fd.get("target_communities") as string,
      website: fd.get("website") as string || null,
      contact_person: fd.get("contact_person") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string || null,
      short_description: fd.get("short_description") as string || null,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
      return;
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center py-16">
        <div className="container max-w-lg text-center space-y-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            <PartyPopper className="h-8 w-8 text-accent" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl">
            Application Submitted Successfully
          </h1>
          <p className="text-muted-foreground">
            Your application has been received. Our team will review your organization.
          </p>
          <p className="text-sm text-muted-foreground">If approved:</p>
          <ul className="text-left max-w-xs mx-auto space-y-2 text-sm text-foreground">
            <li>• Your profile will become visible</li>
            <li>• Your Verified Community Partner badge will be activated</li>
            <li>• You will receive access instructions via email</li>
          </ul>
          <Button asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20 md:py-28">
        <div className="container max-w-3xl text-center space-y-6">
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            Become a Verified Community Partner
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            You provide critical support to newcomers — we help newcomers find you.
            Join the CanConnect ecosystem and increase visibility for the communities you serve.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl space-y-10">
          <h2 className="font-display text-3xl md:text-4xl text-center">
            Why Join as a Community Partner?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, label }) => (
              <Card key={label} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="rounded-lg bg-accent/10 p-2.5 shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-foreground font-medium leading-snug">{label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost */}
      <section className="py-16 md:py-20 bg-section-alt">
        <div className="container max-w-2xl text-center space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Investment
          </p>
          <p className="font-display text-5xl md:text-6xl text-accent">
            FREE <span className="text-2xl text-muted-foreground">for 12 Months</span>
          </p>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            As a mission-driven organization, your visibility should not be limited by cost.
            We offer a complimentary 12-month partnership to support your impact.
          </p>
          <p className="text-xs text-muted-foreground">
            After 12 months, eligibility will be reviewed to determine continued partnership status.
          </p>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 md:py-20">
        <div className="container max-w-2xl space-y-8">
          <h2 className="font-display text-3xl text-center">Apply Now</h2>

          <Card className="border shadow-sm">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="org_name">Organization Name</Label>
                  <Input id="org_name" name="org_name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="org_type">Organization Type</Label>
                  <Select name="org_type" defaultValue="nonprofit">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nonprofit">Nonprofit</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="settlement_agency">Settlement Agency</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary_services">Primary Services</Label>
                  <Input id="primary_services" name="primary_services" placeholder="e.g. Legal aid, language classes" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target_communities">Target Communities Served</Label>
                  <Input id="target_communities" name="target_communities" placeholder="e.g. Syrian refugees, francophone newcomers" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" name="website" type="url" placeholder="https://" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact_person">Contact Person</Label>
                    <Input id="contact_person" name="contact_person" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short_description">Short Description</Label>
                  <Textarea
                    id="short_description"
                    name="short_description"
                    placeholder="Tell us about your organization and how you support newcomers..."
                    rows={4}
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="agree"
                    checked={agreed}
                    onCheckedChange={(v) => setAgreed(v === true)}
                  />
                  <Label htmlFor="agree" className="text-sm leading-snug cursor-pointer">
                    I confirm this organization qualifies as a nonprofit or government entity.
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full text-base" disabled={loading}>
                  {loading ? "Submitting..." : "Apply to Become a Verified Community Partner"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
