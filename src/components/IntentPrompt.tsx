import { Leaf, UtensilsCrossed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEngagementTracker } from "@/hooks/useEngagementTracker";
import { useNavigate } from "react-router-dom";

export default function IntentPrompt() {
  const { shouldShowIntentPrompt, setIntent, dismissIntent } = useEngagementTracker();
  const navigate = useNavigate();

  if (!shouldShowIntentPrompt) return null;

  return (
    <section className="bg-muted/60 border-b border-border/40">
      <div className="container py-4 flex flex-col sm:flex-row items-center justify-center gap-3 relative">
        <span className="text-sm text-muted-foreground font-medium">What brings you here today?</span>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="default"
            className="gap-1.5"
            onClick={() => {
              setIntent("newcomer");
              navigate("/directory");
            }}
          >
            <Leaf className="w-3.5 h-3.5" />
            I'm new to Canada
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => {
              setIntent("explorer");
              window.open("https://firstbitesto.com", "_blank", "noopener,noreferrer");
            }}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            I want to explore Toronto
          </Button>
        </div>
        <button
          onClick={dismissIntent}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
