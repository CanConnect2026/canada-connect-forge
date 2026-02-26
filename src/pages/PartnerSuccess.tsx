import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PartyPopper, ExternalLink, Settings, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function PartnerSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loadingPortal, setLoadingPortal] = useState(false);

  const handleManageSubscription = async () => {
    setLoadingPortal(true);
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data?.error || "Could not open subscription portal");
      }
    } catch (err: any) {
      console.error("Portal error:", err);
      toast.error(err.message || "Failed to open subscription management");
    } finally {
      setLoadingPortal(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center py-16">
      <div className="container max-w-lg text-center space-y-8">
        <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
          <PartyPopper className="h-8 w-8 text-accent" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl">
          Congratulations — Your Profile Is Now Active
        </h1>
        <p className="text-muted-foreground">
          Your Verified Partner listing is live and searchable inside CanConnect.
          You will receive a confirmation email with next steps.
        </p>

        <ul className="text-left max-w-xs mx-auto space-y-2 text-sm text-foreground">
          <li>• Your listing is now publicly visible</li>
          <li>• Verified Partner badge is active</li>
          <li>• You can receive direct inquiries</li>
          <li>• Post events & promotions anytime</li>
          <li>• Subscription renews automatically each year</li>
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild>
            <Link to="/directory">
              <ExternalLink className="h-4 w-4 mr-1" /> View My Listing
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={handleManageSubscription}
            disabled={loadingPortal}
          >
            {loadingPortal ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Settings className="h-4 w-4 mr-1" />
            )}
            Manage Subscription
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Update your payment method, change plans, or cancel anytime through the secure portal.
        </p>
      </div>
    </main>
  );
}
