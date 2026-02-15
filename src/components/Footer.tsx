import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ListingBadge from "./ListingBadge";
import type { BadgeType } from "./ListingBadge";

function useRecentListings() {
  return useQuery({
    queryKey: ["listings", "recent-footer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("id, name, city, listing_type")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(4);
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
        .limit(4);
      if (error) throw error;
      return data;
    },
  });
}

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "X", href: "#", icon: "𝕏" },
  { label: "Instagram", href: "#", icon: "IG" },
  { label: "Facebook", href: "#", icon: "FB" },
  { label: "YouTube", href: "#", icon: "YT" },
  { label: "Pinterest", href: "#", icon: "P" },
];

export default function Footer() {
  const { data: recentListings = [] } = useRecentListings();
  const { data: popularListings = [] } = usePopularListings();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1 — Brand & Trust */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display text-xl mb-2">
              Can<span className="text-accent">Connect</span>
            </h3>
            <p className="text-sm opacity-80 leading-relaxed italic mb-4">
              Created by immigrants, for immigrants.
            </p>
            <p className="text-sm opacity-70 leading-relaxed mb-5">
              Your trusted guide to settling and thriving in Canada.
            </p>
            <ul className="space-y-2 text-sm opacity-80 mb-5">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 opacity-60" />
                Ontario, Canada
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0 opacity-60" />
                info@canconnect.ca
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0 opacity-60" />
                +1 647-782-0023
              </li>
            </ul>
            <div className="flex gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center text-xs font-bold transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-4 opacity-50">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              {[
                { to: "/", label: "Find Services" },
                { to: "/map", label: "Map" },
                { to: "/events", label: "Events" },
                { to: "/how-to", label: "How-To Guides" },
                { to: "/guides", label: "City Guides" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:opacity-100 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Get Involved */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-4 opacity-50">
              Get Involved
            </h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              {[
                { to: "/get-involved", label: "Get Involved" },
                { to: "/submit-event", label: "Add Your Event" },
                { to: "/suggest", label: "Suggest a Service" },
                { to: "/get-involved", label: "Claim a Listing" },
              ].map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="hover:opacity-100 hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Help & Trust */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-4 opacity-50">
              Help & Trust
            </h4>
            <ul className="space-y-2.5 text-sm opacity-80">
              {[
                { to: "/help", label: "Help Centre" },
                { to: "/faq", label: "FAQ" },
                { to: "/how-we-verify", label: "How We Verify" },
                { to: "/about", label: "About Us" },
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

          {/* Column 5 — Discovery */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-4 opacity-50">
              Discover
            </h4>

            {/* Recent Listings */}
            {recentListings.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-wider opacity-40 mb-2">
                  Recently Added
                </p>
                <ul className="space-y-2">
                  {recentListings.map((l) => (
                    <li key={l.id}>
                      <Link
                        to={`/listing/${l.id}`}
                        className="flex items-center justify-between gap-2 text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors"
                      >
                        <span className="truncate">{l.name}</span>
                        <ListingBadge type={l.listing_type as BadgeType} />
                      </Link>
                      <span className="text-xs opacity-40">{l.city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Popular Listings */}
            {popularListings.length > 0 && (
              <div>
                <p className="text-xs font-medium uppercase tracking-wider opacity-40 mb-2">
                  Popular
                </p>
                <ul className="space-y-2">
                  {popularListings.map((l) => (
                    <li key={l.id}>
                      <Link
                        to={`/listing/${l.id}`}
                        className="flex items-center justify-between gap-2 text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors"
                      >
                        <span className="truncate">{l.name}</span>
                        <ListingBadge type={l.listing_type as BadgeType} />
                      </Link>
                      <span className="text-xs opacity-40">{l.city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-foreground/15 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs opacity-50">
          <span>© 2026 CanConnect.ca — All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
