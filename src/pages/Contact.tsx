import { useState } from "react";
import { Mail, MapPin, Plus, Handshake, Calendar, Megaphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Contact Us</h1>
          <p className="text-primary-foreground/70 mt-2">Let Us Know How We Can Help</p>
        </div>
      </div>
      <div className="container py-16">
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Whether you're a newcomer or a service provider, we'd love to hear from you.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — General contact form */}
          <div>
            <h2 className="text-2xl font-display text-foreground mb-6">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-center">
                <p className="font-semibold text-foreground">Thank you for reaching out!</p>
                <p className="text-sm text-muted-foreground mt-1">We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Name</label>
                  <input required className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Email</label>
                  <input required type="email" className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Message</label>
                  <textarea required rows={5} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm resize-none" />
                </div>
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">Send Message</Button>
              </form>
            )}
          </div>

          {/* Right — Quick links + Advertising + Contact info */}
          <div className="space-y-8">
            {/* Quick Links */}
            <div>
              <h2 className="text-2xl font-display text-foreground mb-4">Quick Links</h2>
              <div className="space-y-3">
                {[
                  { icon: Plus, label: "List Your Business", to: "/get-involved" },
                  { icon: Handshake, label: "Suggest a Service", to: "/suggest" },
                  { icon: Calendar, label: "Submit an Event", to: "/submit-event" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-secondary transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Advertising */}
            <AdvertisingInquiry />

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-display text-foreground mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">info@canconnect.ca</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Address</p>
                    <p className="text-sm text-muted-foreground">250 Yonge St, Suite 2210, Toronto, ON M5B 2L7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvertisingInquiry() {
  const [open, setOpen] = useState(false);
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

  if (!open) {
    return (
      <div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 p-4 rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors w-full text-left"
        >
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
            <Megaphone className="w-4 h-4 text-accent" />
          </div>
          <div>
            <span className="text-sm font-semibold text-foreground block">Advertise with CanConnect</span>
            <span className="text-xs text-muted-foreground">Reach newcomers across Ontario</span>
          </div>
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-center">
        <CheckCircle2 className="w-8 h-8 text-accent mx-auto mb-2" />
        <p className="font-semibold text-foreground text-sm">Inquiry received!</p>
        <p className="text-xs text-muted-foreground mt-1">Our partnerships team will contact you within 2 business days.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border p-5">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="w-4 h-4 text-accent" />
        <h3 className="font-semibold text-foreground text-sm">Advertising Inquiry</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input required placeholder="Company Name *" value={form.company_name} onChange={e => setForm(f => ({ ...f, company_name: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2 text-sm" />
        <input required placeholder="Your Name *" value={form.contact_name} onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2 text-sm" />
        <input required type="email" placeholder="Email *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2 text-sm" />
        <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2 text-sm" />
        <select value={form.budget_range} onChange={e => setForm(f => ({ ...f, budget_range: e.target.value }))} className="w-full bg-background border rounded-md px-3 py-2 text-sm">
          <option value="">Budget Range (optional)</option>
          <option value="Under $500">Under $500</option>
          <option value="$500 - $1,000">$500 – $1,000</option>
          <option value="$1,000 - $5,000">$1,000 – $5,000</option>
          <option value="$5,000+">$5,000+</option>
        </select>
        <textarea placeholder="Tell us about your goals..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3} className="w-full bg-background border rounded-md px-3 py-2 text-sm resize-none" />
        <div className="flex gap-2">
          <Button type="submit" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
            {loading ? "Sending..." : "Submit Inquiry"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
