import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PartyPopper, ExternalLink, Edit } from "lucide-react";

export default function PartnerSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

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
          <Button variant="outline" asChild>
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
