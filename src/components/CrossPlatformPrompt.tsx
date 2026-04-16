import { ArrowRight, X, Leaf, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEngagementTracker } from "@/hooks/useEngagementTracker";

type PromptVariant = "suggest-food" | "suggest-services";

interface CrossPlatformPromptProps {
  variant: PromptVariant;
}

const prompts = {
  "suggest-food": {
    icon: UtensilsCrossed,
    title: "Explore your city",
    text: "Discover food, culture, and local experiences in Toronto.",
    cta: "Explore FirstBitesTO",
    link: "/restaurants",
    dismissType: "service" as const,
  },
  "suggest-services": {
    icon: Leaf,
    title: "New to Canada or settling in Toronto?",
    text: "Discover trusted services, housing, and support resources.",
    cta: "Explore Canada Connect",
    link: "/directory",
    dismissType: "food" as const,
  },
};

export default function CrossPlatformPrompt({ variant }: CrossPlatformPromptProps) {
  const { shouldShowFoodPrompt, shouldShowServicePrompt, dismissPrompt } = useEngagementTracker();
  const config = prompts[variant];

  const shouldShow = variant === "suggest-food" ? shouldShowFoodPrompt : shouldShowServicePrompt;

  if (!shouldShow) return null;

  const Icon = config.icon;

  return (
    <div className="bg-muted/50 border border-border/60 rounded-xl p-5 my-8 relative">
      <button
        onClick={() => dismissPrompt(config.dismissType)}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss suggestion"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-foreground text-sm">{config.title}</h4>
          <p className="text-sm text-muted-foreground mt-0.5">{config.text}</p>
          <Button size="sm" variant="link" className="px-0 mt-1 text-accent gap-1" asChild>
            <Link to={config.link}>
              {config.cta} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
