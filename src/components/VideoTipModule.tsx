import { useState } from "react";
import { Play, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

function useActiveVideoTip() {
  return useQuery({
    queryKey: ["video-tips", "active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("video_tips")
        .select("*")
        .eq("is_active", true)
        .order("sort_order")
        .limit(10);
      if (error) throw error;
      if (!data || data.length === 0) return null;
      // Pick one randomly for rotation feel
      const index = Math.floor(Date.now() / (1000 * 60 * 60)) % data.length; // rotates hourly
      return data[index];
    },
    staleTime: 1000 * 60 * 5,
  });
}

function getEmbedUrl(videoUrl: string): string | null {
  // YouTube Shorts or regular YouTube
  const shortsMatch = videoUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}?rel=0&modestbranding=1`;

  const ytMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;

  // Instagram Reels
  const igMatch = videoUrl.match(/instagram\.com\/reel\/([a-zA-Z0-9_-]+)/);
  if (igMatch) return `https://www.instagram.com/reel/${igMatch[1]}/embed`;

  return null;
}

export default function VideoTipModule() {
  const { data: tip } = useActiveVideoTip();
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(!isMobile);
  const [playing, setPlaying] = useState(false);

  if (!tip) return null;

  const embedUrl = getEmbedUrl(tip.video_url);

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      {/* Header */}
      <button
        onClick={() => isMobile && setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-accent/10"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
            <Play className="w-3 h-3 text-accent-foreground fill-current" />
          </div>
          <span className="text-sm font-semibold text-foreground">1-Minute Tip</span>
        </div>
        {isMobile && (
          expanded
            ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {/* Content — collapsible on mobile */}
      {expanded && (
        <div className="p-4">
          {/* Video embed or thumbnail */}
          <div className="relative aspect-[9/16] max-h-[320px] rounded-md overflow-hidden bg-muted mb-3">
            {playing && embedUrl ? (
              <iframe
                src={embedUrl}
                title={tip.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full group"
              >
                {tip.thumbnail_url ? (
                  <img
                    src={tip.thumbnail_url}
                    alt={tip.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
                <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 text-accent-foreground fill-current ml-0.5" />
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Text */}
          <h4 className="text-sm font-semibold text-foreground leading-snug">
            {tip.title}
          </h4>
          {tip.description && (
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-3">
              {tip.description}
            </p>
          )}

          {/* Social CTA */}
          {tip.social_channel_url && (
            <a
              href={tip.social_channel_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-1.5 text-xs font-medium text-accent hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              {tip.social_channel_label || "Follow us for more tips"}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
