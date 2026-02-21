import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";
import NewsletterSignup from "@/components/NewsletterSignup";
import ReportIssueDialog from "@/components/ReportIssueDialog";
import logoWhite from "@/assets/canconnect-logo-white.png";
import iconWhite from "@/assets/canconnect-icon-white.png";

const socialLinks = [
  { label: "LinkedIn", icon: "in", url: "#" },
  { label: "X", icon: "𝕏", url: "#" },
  { label: "Instagram", icon: "IG", url: "#" },
  { label: "Facebook", icon: "FB", url: "#" },
  { label: "YouTube", icon: "YT", url: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">
          {/* Column 1 — Brand & Contact (wider) */}
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-2.5 mb-1.5">
              <img src={iconWhite} alt="" className="h-9 w-9 object-contain" />
              <span className="text-2xl font-display font-bold tracking-wide text-primary-foreground">CANCONNECT</span>
            </div>
            <p className="text-xs uppercase tracking-[0.15em] font-semibold opacity-70 mb-3">
              Arrive. Connect. Thrive.
            </p>
            <ul className="space-y-2.5 text-sm opacity-80 mb-5">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 opacity-60 mt-0.5" />
                <span>250 Yonge St, Suite 2210,<br />Toronto, ON M5B 2L7</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0 opacity-60" />
                info@canconnect.ca
              </li>
            </ul>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-[10px] font-bold transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-3.5 opacity-50">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              {[
                { to: "/directory", label: "Find Services" },
                { to: "/map", label: "Service Map" },
                { to: "/events", label: "Events" },
                { to: "/how-to", label: "How-To Guides" },
                { to: "/guides", label: "City Guides" },
                { to: "/about", label: "About Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:opacity-100 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contribute */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-3.5 opacity-50">
              Contribute
            </h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              {[
                { to: "/claim", label: "List Your Business" },
                { to: "/get-involved", label: "Get Involved" },
                { to: "/suggest", label: "Suggest a Service" },
                { to: "/submit-event", label: "Submit an Event" },
                { to: "/advertise", label: "Advertise with Us" },
                { to: "/contact", label: "Contact Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:opacity-100 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Help & Trust */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-3.5 opacity-50">
              Help & Trust
            </h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              {[
                { to: "/help", label: "Help Centre" },
                { to: "/faq", label: "FAQ" },
                { to: "/how-we-verify", label: "How We Verify" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:opacity-100 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <ReportIssueDialog
                  relatedUrl={typeof window !== "undefined" ? window.location.href : "/"}
                  trigger={
                    <button className="hover:opacity-100 hover:text-accent transition-colors">
                      Report an Issue
                    </button>
                  }
                />
              </li>
            </ul>
          </div>

          {/* Column 5 — Newsletter */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-3.5 opacity-50">
              Monthly Newsletter
            </h4>
            <p className="text-xs opacity-60 mb-3 leading-relaxed">
              Tips, events, and resources for newcomers — once a month.
            </p>
            <NewsletterSignup source="footer" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/15 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs opacity-50">
          <span>© 2026 CanConnect.ca — All rights reserved. Created by immigrants, for immigrants.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
