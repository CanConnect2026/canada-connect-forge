import { Link } from "react-router-dom";
import { MapPin, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

function useRecentListings() {
  return useQuery({
    queryKey: ["listings", "recent-footer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("id, name, city, listing_type")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });
}

function usePopularListings() {
  return useQuery({
    queryKey: ["listings", "popular-footer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("id, name, city, listing_type")
        .eq("is_published", true)
        .eq("is_featured", true)
        .limit(5);
      if (error) throw error;
      return data;
    },
  });
}

const socialLinks = [
  { label: "LinkedIn", icon: "in" },
  { label: "X", icon: "𝕏" },
  { label: "Instagram", icon: "IG" },
  { label: "Facebook", icon: "FB" },
  { label: "YouTube", icon: "YT" },
  { label: "Pinterest", icon: "P" },
];

export default function Footer() {
  const { data: recentListings = [] } = useRecentListings();
  const { data: popularListings = [] } = usePopularListings();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 — Organization */}
          <div>
            <h3 className="font-display text-xl mb-1.5">
              Can<span className="text-accent">Connect</span>
            </h3>
            <p className="text-sm opacity-70 leading-relaxed mb-5">
              Created by immigrants, for immigrants.
            </p>
            <ul className="space-y-2.5 text-sm opacity-80 mb-6">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 opacity-60" />
                250 Yonge St, Suite 2210, Toronto, ON M5B 2L7
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
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-[10px] font-bold transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-3.5 opacity-50">
              Explore
            </h4>
            <ul className="space-y-2 text-sm opacity-80">
              {[
                { to: "/", label: "Find Services" },
                { to: "/map", label: "Map" },
                { to: "/events", label: "Events" },
                { to: "/how-to", label: "How-To Guides" },
                { to: "/guides", label: "City Guides" },
                { to: "/get-involved", label: "Get Involved" },
                { to: "/about", label: "About Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:opacity-100 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust & Help links */}
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-3.5 mt-6 opacity-50">
              Help & Trust
            </h4>
            <ul className="space-y-2 text-sm opacity-80">
              {[
                { to: "/help", label: "Help Centre" },
                { to: "/faq", label: "FAQ" },
                { to: "/how-we-verify", label: "How We Verify" },
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

          {/* Column 3 — Recent Listings */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-3.5 opacity-50">
              Recent Listings
            </h4>
            {recentListings.length > 0 ? (
              <ul className="space-y-3 text-sm">
                {recentListings.map((l) => (
                  <li key={l.id}>
                    <Link
                      to={`/listing/${l.id}`}
                      className="block opacity-80 hover:opacity-100 hover:text-accent transition-colors"
                    >
                      <span className="block leading-snug">{l.name}</span>
                      <span className="text-xs opacity-50">{l.city}, ON</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm opacity-50">No recent listings yet.</p>
            )}
          </div>

          {/* Column 4 — Popular Listings */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-3.5 opacity-50">
              Popular Services
            </h4>
            {popularListings.length > 0 ? (
              <ul className="space-y-3 text-sm">
                {popularListings.map((l) => (
                  <li key={l.id}>
                    <Link
                      to={`/listing/${l.id}`}
                      className="block opacity-80 hover:opacity-100 hover:text-accent transition-colors"
                    >
                      <span className="block leading-snug">{l.name}</span>
                      <span className="text-xs opacity-50">{l.city}, ON</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/" className="hover:opacity-100 hover:text-accent transition-colors">Browse Services</Link></li>
                <li><Link to="/map" className="hover:opacity-100 hover:text-accent transition-colors">Explore the Map</Link></li>
                <li><Link to="/events" className="hover:opacity-100 hover:text-accent transition-colors">Upcoming Events</Link></li>
              </ul>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/15 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs opacity-50">
          <span>© 2026 CanConnect.ca — All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
