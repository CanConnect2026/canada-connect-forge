import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sendNotification } from "@/hooks/useNotification";

interface NewsletterSignupProps {
  source?: string;
  variant?: "inline" | "card";
  className?: string;
}

export default function NewsletterSignup({ source = "footer", variant = "inline", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("newsletter_subscribers" as any).insert({
        email: email.trim(),
        name: name.trim() || null,
        source,
        status: "pending",
      });
      if (error) {
        if (error.code === "23505") {
          // Already subscribed — still show the pending message
          setSubmitted(true);
          return;
        }
        throw error;
      }

      await sendNotification({
        type: "newsletter_confirmation",
        data: {
          first_name: name.trim() || undefined,
          email: email.trim(),
        },
      });

      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={`${className}`}>
        <p className="text-accent font-semibold text-sm mb-1">Almost there 💛</p>
        <p className="text-xs opacity-80 leading-relaxed">
          We just sent a confirmation email to your inbox. Click the link inside to complete your subscription.
        </p>
        <p className="text-xs opacity-60 mt-1">
          If you don't see it, check your spam or junk folder.
        </p>
        <p className="text-xs opacity-80 mt-2 font-medium">We're glad you're here.</p>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={`bg-card rounded-lg border p-5 ${className}`}>
        <h3 className="font-semibold text-foreground text-base mb-1">You don't have to figure this out alone.</h3>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          Get trusted updates, resources, and opportunities — built for immigrants, by immigrants.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="Your name (optional)"
            className="w-full bg-background border rounded-md px-3 py-2 text-sm outline-none"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className="flex gap-2">
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
          </div>
        </form>
        <p className="text-[10px] text-muted-foreground mt-2 opacity-60">📩 Monthly. Unsubscribe anytime.</p>
      </div>
    );
  }

  // Footer inline variant
  return (
    <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
      <input
        type="text"
        placeholder="Your name (optional)"
        className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-md px-3 py-2 text-sm outline-none text-primary-foreground placeholder:text-primary-foreground/40"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="your@email.com"
          className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md px-3 py-2 text-sm outline-none text-primary-foreground placeholder:text-primary-foreground/40"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button type="submit" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0" disabled={loading}>
          {loading ? "..." : "Join the Community"}
        </Button>
      </div>
      <p className="text-[10px] text-primary-foreground/40">📩 Monthly. Unsubscribe anytime.</p>
    </form>
  );
}
