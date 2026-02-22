import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "loading" | "confirmed" | "already_confirmed" | "error";

export default function ConfirmNewsletter() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const confirm = async () => {
      try {
        const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
        const res = await fetch(
          `https://${projectId}.supabase.co/functions/v1/confirm-newsletter?token=${token}`,
          {
            headers: {
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            },
          }
        );
        const data = await res.json();

        if (res.ok && (data.status === "confirmed" || data.status === "already_confirmed")) {
          setStatus(data.status);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    confirm();
  }, [token]);

  return (
    <div className="bg-background min-h-[60vh] flex items-center justify-center">
      <div className="container max-w-lg text-center py-20">
        {status === "loading" && (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 text-accent mx-auto animate-spin" />
            <p className="text-muted-foreground">Confirming your subscription…</p>
          </div>
        )}

        {(status === "confirmed" || status === "already_confirmed") && (
          <div className="space-y-4">
            <CheckCircle className="w-16 h-16 text-accent mx-auto" />
            <h1 className="text-2xl font-display text-foreground">
              You're officially part of the community 💛
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Thank you for confirming your subscription. You'll now receive monthly updates with resources, events, and opportunities — built for immigrants, by immigrants.
            </p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-display text-foreground">
              This link has expired
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              This confirmation link is no longer valid. Please subscribe again to receive our updates.
            </p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4">
              <Link to="/">Subscribe Again</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
