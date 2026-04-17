import { Link } from "react-router-dom";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  href: string;
  /** Optional action verb shown on hover (e.g. "Find", "Access", "Learn"). Defaults to "Find". */
  action?: string;
}

export default function CategoryCard({ icon: Icon, title, count, href, action = "Find" }: CategoryCardProps) {
  return (
    <Link
      to={href}
      className="group relative flex flex-col items-start text-left p-5 sm:p-6 bg-card rounded-2xl border border-border/60 hover:shadow-lg hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 min-h-[160px]"
    >
      <div className="flex items-center justify-between w-full mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/15 to-accent-gold/10 flex items-center justify-center group-hover:from-accent/25 group-hover:to-accent-gold/20 transition-all duration-300">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
      </div>
      <h3 className="font-semibold text-sm text-foreground leading-snug mb-1">{title}</h3>
      <div className="mt-auto flex items-center gap-2 text-xs">
        <span className="text-accent-secondary font-medium">{count} services</span>
        <span className="text-muted-foreground/40">·</span>
        <span className="text-muted-foreground group-hover:text-accent transition-colors">{action}</span>
      </div>
    </Link>
  );
}
