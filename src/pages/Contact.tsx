import { useState } from "react";
import { Mail, MapPin, Plus, Handshake, Calendar, Megaphone, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { sendNotification } from "@/hooks/useNotification";
import ReportIssueDialog from "@/components/ReportIssueDialog";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("contact_messages" as any).insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      if (error) throw error;

      await sendNotification({
        type: "contact",
        data: {
          first_name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
      });

      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <div className="bg-primary py-12">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Contact Us</h1>
          <p className="text-primary-foreground/70 mt-2">We'd love to hear from you — whether you're a newcomer or a service provider.</p>
        </div>
      </div>
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — General contact form */}
          <div>
            <h2 className="text-2xl font-display text-foreground mb-2">Send Us a Message</h2>
            <p className="text-sm text-muted-foreground mb-6">We typically respond within 1–2 business days.</p>
            {submitted ? (
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-3" />
                <p className="font-semibold text-foreground">Thanks for reaching out!</p>
                <p className="text-sm text-muted-foreground mt-1">We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Name <span className="text-accent">*</span></label>
                  <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Email <span className="text-accent">*</span></label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Message <span className="text-accent">*</span></label>
                  <textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm resize-none" placeholder="How can we help?" />
                </div>
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}

            {/* Contact Info — below the form */}
            <div className="mt-8">
              <h3 className="text-lg font-display text-foreground mb-4">Contact Information</h3>
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

          {/* Right — Quick links + Advertising + Contact info */}
          <div className="space-y-8">
            {/* Quick Links */}
            <div>
              <h2 className="text-2xl font-display text-foreground mb-4">Quick Links</h2>
              <div className="space-y-3">
                {[
                  { icon: Plus, label: "Get Involved", desc: "Contribute your skills or story", to: "/get-involved" },
                  { icon: Handshake, label: "Suggest a Service", desc: "Help us grow the directory", to: "/suggest" },
                  { icon: Calendar, label: "Submit an Event", desc: "Share a community event", to: "/submit-event" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-secondary transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground block">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Advertising */}
            <Link
              to="/advertise"
              className="flex items-center gap-3 p-4 rounded-lg border border-accent/30 bg-accent/5 hover:bg-accent/10 transition-colors w-full text-left"
            >
              <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <Megaphone className="w-4 h-4 text-accent" />
              </div>
              <div>
                <span className="text-sm font-semibold text-foreground block">Advertise with CanConnect</span>
                <span className="text-xs text-muted-foreground">Reach newcomers across Ontario</span>
              </div>
            </Link>

            {/* Report an Issue */}
            <ReportIssueDialog
              relatedUrl={typeof window !== "undefined" ? window.location.href : "/contact"}
              trigger={
                <button className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-secondary transition-colors w-full text-left">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground block">Report an Issue</span>
                    <span className="text-xs text-muted-foreground">Flag incorrect info or broken links</span>
                  </div>
                </button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
