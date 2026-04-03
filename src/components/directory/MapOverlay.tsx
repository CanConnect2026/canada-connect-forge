import { X } from "lucide-react";
import DirectoryMap from "@/components/DirectoryMap";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";

interface MapOverlayProps {
  listings: Tables<"listings">[];
  onClose: () => void;
  userLocation?: { lat: number; lng: number } | null;
}

export default function MapOverlay({ listings, onClose, userLocation }: MapOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-4 sm:inset-8 bg-card rounded-2xl border shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-foreground">Map View</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1">
          <DirectoryMap listings={listings} userLocation={userLocation} />
        </div>
      </div>
    </div>
  );
}
