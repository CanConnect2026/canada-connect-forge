import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Tables } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

type Listing = Tables<"listings">;

const badgeColors: Record<string, string> = {
  free: "#2a9d5c",
  nonprofit: "#3b82f6",
  paid: "#dc2626",
};

export default function ListingsMap({ listings }: { listings: Listing[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstance.current) {
      mapInstance.current.remove();
    }

    const map = L.map(mapRef.current).setView([43.7, -79.4], 12);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const geoListings = listings.filter(l => l.latitude && l.longitude);

    geoListings.forEach(listing => {
      const color = badgeColors[listing.listing_type] || "#666";
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background:${color};width:12px;height:12px;border-radius:50%;border:2px solid white;box-shadow:0 2px 4px rgba(0,0,0,0.3)"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const marker = L.marker([listing.latitude!, listing.longitude!], { icon }).addTo(map);
      marker.bindPopup(`
        <div style="min-width:200px">
          <strong>${listing.name}</strong><br/>
          <span style="font-size:12px;color:#666">${listing.category}</span><br/>
          <span style="font-size:12px">${listing.city}, ${listing.province}</span><br/>
          <a href="/listing/${listing.id}" style="color:#e8523a;font-size:12px;font-weight:600">View Details →</a>
        </div>
      `);
      marker.on("click", () => marker.openPopup());
    });

    if (geoListings.length > 0) {
      const bounds = L.latLngBounds(geoListings.map(l => [l.latitude!, l.longitude!]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [listings, navigate]);

  return (
    <div ref={mapRef} className="w-full h-[600px] rounded-lg border overflow-hidden" />
  );
}
