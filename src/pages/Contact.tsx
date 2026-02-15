import { Mail, MapPin, Plus, Handshake, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

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
          <div>
            <h2 className="text-2xl font-display text-foreground mb-6">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-badge-free/10 border border-badge-free/30 rounded-lg p-6 text-center">
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
