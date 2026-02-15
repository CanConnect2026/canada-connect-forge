import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Contact Us</h1>
          <p className="text-primary-foreground/70 mt-2">We'd love to hear from you. Reach out anytime.</p>
        </div>
      </div>
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-display text-foreground mb-6">Get in Touch</h2>
            {submitted ? (
              <div className="bg-badge-free/10 border border-badge-free/30 rounded-lg p-6 text-center">
                <p className="font-semibold text-foreground">Thank you for reaching out!</p>
                <p className="text-sm text-muted-foreground mt-1">We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
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
          <div className="space-y-6">
            <h2 className="text-2xl font-display text-foreground mb-6">Contact Information</h2>
            {[
              { icon: Mail, label: "Email", value: "info@canconnect.ca" },
              { icon: Phone, label: "Phone", value: "+1 647-782-0023" },
              { icon: MapPin, label: "Location", value: "Ontario, Canada" },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
