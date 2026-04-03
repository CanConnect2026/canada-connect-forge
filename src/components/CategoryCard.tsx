import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  count: number;
  href: string;
}

export default function CategoryCard({ icon: Icon, title, count, href }: CategoryCardProps) {
  return (
    <Link
      to={href}
      className="group flex flex-col items-center text-center p-6 bg-card rounded-xl border border-border/60 hover:shadow-lg hover:border-accent/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/15 to-accent-gold/10 flex items-center justify-center mb-4 group-hover:from-accent/25 group-hover:to-accent-gold/20 transition-all duration-300 group-hover:scale-110">
        <Icon className="w-7 h-7 text-accent" />
      </div>
      <h3 className="font-semibold text-sm text-foreground leading-tight">{title}</h3>
      <span className="text-xs text-accent-secondary font-medium mt-1.5">{count} services</span>
    </Link>
  );
}
