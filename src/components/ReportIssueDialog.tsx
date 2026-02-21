import { useState } from "react";
import { AlertTriangle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { sendNotification } from "@/hooks/useNotification";
import { useToast } from "@/hooks/use-toast";

interface ReportIssueDialogProps {
  relatedUrl: string;
  relatedListingId?: string;
  relatedEventId?: string;
  trigger?: React.ReactNode;
}

export default function ReportIssueDialog({
  relatedUrl,
  relatedListingId,
  relatedEventId,
  trigger,
}: ReportIssueDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("issue_reports" as any).insert({
        reporter_name: name.trim() || null,
        reporter_email: email.trim() || null,
        issue_description: description.trim(),
        related_url: relatedUrl,
        related_listing_id: relatedListingId || null,
        related_event_id: relatedEventId || null,
      });
      if (error) throw error;

      await sendNotification({
        type: "report_issue",
        data: {
          first_name: name.trim() || undefined,
          email: email.trim() || undefined,
          issue_description: description.trim(),
          related_url: relatedUrl,
        },
      });

      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (v: boolean) => {
    setOpen(v);
    if (!v) {
      setName("");
      setEmail("");
      setDescription("");
      setSubmitted(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
            <AlertTriangle className="w-3.5 h-3.5" /> Report an Issue
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent" /> Report an Issue
          </DialogTitle>
        </DialogHeader>
        {submitted ? (
          <div className="text-center py-6">
            <p className="font-semibold text-foreground">Thank you for reporting this.</p>
            <p className="text-sm text-muted-foreground mt-1">Our team will review it promptly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">
                What's the issue? <span className="text-accent">*</span>
              </label>
              <Textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe the issue (incorrect info, broken link, etc.)"
                maxLength={1000}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  Name <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">
                  Email <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border rounded-md px-3 py-2 text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
              <Send className="w-4 h-4 mr-2" />
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
