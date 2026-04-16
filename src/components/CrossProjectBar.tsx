import { ExternalLink } from "lucide-react";

export default function CrossProjectBar() {
  return (
    <div className="bg-accent/10 border-b border-accent/20 text-xs py-1.5">
      <div className="container flex items-center justify-between gap-4">
        <span className="text-muted-foreground hidden sm:inline">
          Part of the <span className="font-semibold text-foreground">CanConnect Newcomer Ecosystem</span>
        </span>
        <a
          href="https://taste-to-trails.lovable.app"
          className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline ml-auto"
        >
          🥘 Explore Toronto Food
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
