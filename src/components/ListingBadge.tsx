import { cn } from "@/lib/utils";

export type BadgeType = "free" | "nonprofit" | "paid";

const badgeConfig: Record<BadgeType, { label: string; className: string }> = {
  free: { label: "FREE", className: "bg-badge-free text-accent-foreground" },
  nonprofit: { label: "NON-PROFIT", className: "bg-badge-nonprofit text-accent-foreground" },
  paid: { label: "PAID", className: "bg-badge-paid text-accent-foreground" },
};

export default function ListingBadge({ type }: { type: BadgeType }) {
  const config = badgeConfig[type];
  return (
    <span className={cn("inline-block px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide", config.className)}>
      {config.label}
    </span>
  );
}
