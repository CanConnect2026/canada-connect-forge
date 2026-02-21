import { useState } from "react";
import { Megaphone, CheckCircle2, BarChart3, Users, Eye, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const benefits = [
  { icon: Users, title: "Reach Newcomers Directly", desc: "Connect with thousands of immigrants actively looking for services across Ontario." },
  { icon: Eye, title: "High-Intent Audience", desc: "Our users are actively searching for support — they're ready to engage with relevant services." },
  { icon: Target, title: "Targeted Visibility", desc: "Your listing appears alongside trusted community resources, building instant credibility." },
  { icon: BarChart3, title: "Transparent Reporting", desc: "Know exactly how your listing is performing with clear metrics and insights." },
];

export default function Advertise() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    budget_range: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("advertising_inquiries" as any).insert({
        company_name: form.company_name.trim(),
        contact_name: form.contact_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        budget_range: form.budget_range || null,
        message: form.message.trim() || null,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background">
      {/* Hero */}
      <div className="bg-primary py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-2">
            <Megaphone className="w-7 h-7 text-accent" />
            <h1 className="text-4xl font-display text-primary-foreground">Advertise with CanConnect</h1>
          </div>
          <p className="text-primary-foreground/70 mt-2 max-w-2xl">
            Put your business in front of newcomers who are actively looking for services and support across Ontario.
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Intro */}
        <div className="max-w-3xl mb-12">
          <p className="text-muted-foreground leading-relaxed mb-4">
            CanConnect is a trusted resource for immigrants navigating life in Canada. Every month, newcomers across Ontario use our directory to find legal help, language classes, career support, housing, and more.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Advertising with us means your business or organization gets seen by people who are actively searching for exactly what you offer — at the moment they need it most.
          </p>
        </div>

        {/* Benefits */}
        <h2 className="text-2xl font-display text-foreground mb-6">Why Advertise with Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-4 p-5 rounded-lg border bg-card">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <b.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-lg">
          <h2 className="text-2xl font-display text-foreground mb-2">Get in Touch</h2>
          <p className="text-sm text-muted-foreground mb-6">Fill out the form below and our partnerships team will reach out within 2 business days.</p>

          {submitted ? (
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-3" />
              <p className="font-semibold text-foreground">Inquiry received!</p>
              <p className="text-sm text-muted-foreground mt-1">Our partnerships team will contact you within 2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Company Name <span className="text-accent">*</span></label>
                <input required value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Your Name <span className="text-accent">*</span></label>
                <input required value={form.contact_name} onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Email <span className="text-accent">*</span></label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Budget Range <span className="text-muted-foreground font-normal">(optional)</span></label>
                <select value={form.budget_range} onChange={e => setForm(f => ({ ...f, budget_range: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm">
                  <option value="">Select...</option>
                  <option value="Under $500">Under $500</option>
                  <option value="$500 - $1,000">$500 – $1,000</option>
                  <option value="$1,000 - $5,000">$1,000 – $5,000</option>
                  <option value="$5,000+">$5,000+</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Tell us about your goals <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={4} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm resize-none" />
              </div>
              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                {loading ? "Sending..." : "Submit Inquiry"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
