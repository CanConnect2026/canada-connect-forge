import {
  Users, Scale, Home, Briefcase, BookOpen,
  Heart, DollarSign, ShoppingBag, Globe, AlertTriangle,
} from "lucide-react";

const categoryIcons = [
  { name: "Settlement & Newcomer Services", icon: Users },
  { name: "Immigration & Legal Support", icon: Scale },
  { name: "Housing & Shelter", icon: Home },
  { name: "Employment & Career Support", icon: Briefcase },
  { name: "Language & Education", icon: BookOpen },
  { name: "Health & Wellness", icon: Heart },
  { name: "Financial Services & Support", icon: DollarSign },
  { name: "Food & Clothing Support", icon: ShoppingBag },
  { name: "Community & Cultural Organizations", icon: Globe },
  { name: "Crisis & Emergency Help", icon: AlertTriangle },
];

interface CategoryBrowseProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export default function CategoryBrowse({ selectedCategory, onCategoryChange, categoryCounts }: CategoryBrowseProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {categoryIcons.map(({ name, icon: Icon }) => {
        const isActive = selectedCategory === name;
        const count = categoryCounts[name] || 0;
        return (
          <button
            key={name}
            onClick={() => onCategoryChange(isActive ? "" : name)}
            className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
              isActive
                ? "bg-accent/10 border-accent text-accent shadow-sm"
                : "bg-card border-border text-foreground hover:border-accent/30"
            }`}
          >
            <Icon className={`w-6 h-6 mb-2 ${isActive ? "text-accent" : "text-muted-foreground"}`} />
            <span className="text-xs font-medium leading-tight line-clamp-2">{name.split(" & ")[0]}</span>
            {count > 0 && (
              <span className="text-[10px] text-muted-foreground mt-1">{count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
