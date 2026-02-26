import { useEffect, useRef, useCallback, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import type { Tables } from "@/integrations/supabase/types";

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

interface DirectoryMapProps {
  listings: Listing[];
  highlightedId?: string | null;
  onMarkerClick?: (id: string) => void;
  userLocation?: { lat: number; lng: number } | null;
}

export default function DirectoryMap({ listings, highlightedId, onMarkerClick, userLocation }: DirectoryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const clusterRef = useRef<any>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const geoListings = useMemo(() => listings.filter(l => l.latitude && l.longitude), [listings]);

  // Initialize map once
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, { zoomControl: true }).setView([44.0, -80.0], 7);
    mapInstance.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Update markers when listings change
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    // Remove old cluster group
    if (clusterRef.current) {
      map.removeLayer(clusterRef.current);
    }

    const cluster = (L as any).markerClusterGroup({
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: (c: any) => {
        const count = c.getChildCount();
        return L.divIcon({
          html: `<div style="background:hsl(220,50%,15%);color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${count}</div>`,
          className: "custom-cluster",
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        });
      },
    });
    clusterRef.current = cluster;
    markersRef.current = {};

    geoListings.forEach(listing => {
      const color = badgeColors[listing.listing_type] || "#666";
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="background:${color};width:14px;height:14px;border-radius:50%;border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);transition:transform 0.2s"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([listing.latitude!, listing.longitude!], { icon });
      marker.bindPopup(`
        <div style="min-width:180px;font-family:sans-serif">
          <strong style="font-size:14px">${listing.name}</strong><br/>
          <span style="font-size:12px;color:#666">${listing.category}</span><br/>
          <span style="font-size:12px">${listing.city}, ${listing.province}</span><br/>
          <a href="/listing/${listing.id}" style="color:hsl(10,78%,54%);font-size:12px;font-weight:600;text-decoration:none">View Details →</a>
        </div>
      `);
      marker.on("click", () => {
        marker.openPopup();
        onMarkerClick?.(listing.id);
      });

      cluster.addLayer(marker);
      markersRef.current[listing.id] = marker;
    });

    map.addLayer(cluster);

    if (geoListings.length > 0) {
      const bounds = L.latLngBounds(geoListings.map(l => [l.latitude!, l.longitude!]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [geoListings, onMarkerClick]);

  // Highlight marker
  useEffect(() => {
    if (!highlightedId) return;
    const marker = markersRef.current[highlightedId];
    if (marker && mapInstance.current) {
      const latLng = marker.getLatLng();
      mapInstance.current.setView(latLng, Math.max(mapInstance.current.getZoom(), 13), { animate: true });
      marker.openPopup();
    }
  }, [highlightedId]);

  // User location marker
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const icon = L.divIcon({
        className: "user-location-marker",
        html: `<div style="width:18px;height:18px;border-radius:50%;background:hsl(215,90%,55%);border:3px solid white;box-shadow:0 0 0 4px hsla(215,90%,55%,0.3),0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon }).addTo(map);
      userMarkerRef.current.bindPopup("Your location");
    }
  }, [userLocation]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden" />
  );
}
