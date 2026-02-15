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
      className="group flex flex-col items-center text-center p-6 bg-card rounded-lg border hover:shadow-md hover:border-accent/30 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      <span className="text-xs text-muted-foreground mt-1">{count} services</span>
    </Link>
  );
}
