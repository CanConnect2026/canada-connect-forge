import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  source?: string;
  variant?: "inline" | "card";
  className?: string;
}

export default function NewsletterSignup({ source = "footer", variant = "inline", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers" as any).insert({ email: email.trim(), source });
      if (error) {
        if (error.code === "23505") {
          setSubscribed(true);
          return;
        }
        throw error;
      }
      setSubscribed(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (subscribed) {
    return (
      <div className={`flex items-center gap-2 text-sm ${className}`}>
        <Mail className="w-4 h-4 text-accent" />
        <span className="text-accent font-medium">You're subscribed! 🎉</span>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`bg-card rounded-lg border p-5 ${className}`}>
        <h3 className="font-semibold text-foreground text-sm mb-1">Stay Connected</h3>
        <p className="text-xs text-muted-foreground mb-3">Get monthly tips, events, and resources for newcomers.</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 bg-background border rounded-md px-3 py-2 text-sm outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button type="submit" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
            {loading ? "..." : "Join"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <input
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md px-3 py-2 text-sm outline-none text-primary-foreground placeholder:text-primary-foreground/40"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Button type="submit" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0" disabled={loading}>
        {loading ? "..." : "Subscribe"}
      </Button>
    </form>
  );
}
