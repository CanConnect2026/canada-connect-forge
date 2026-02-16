import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const contributionOptions = [
  { id: "story", label: "Share Your Story" },
  { id: "content", label: "Write or Contribute Content" },
  { id: "resources", label: "Share Resources or Events" },
  { id: "collaborate", label: "Collaborate on Projects" },
  { id: "other", label: "Other" },
];

export default function GetInvolved() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      toast({ title: "Please select how you'd like to help", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("contributions" as any).insert({
        name: name.trim(),
        email: email.trim(),
        contribution_types: [selected],
        message: message.trim() || null,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <div className="container py-10">
        {submitted ? (
          <div className="max-w-lg mx-auto text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
            <h2 className="font-display text-3xl mb-3">Thanks for Your Interest!</h2>
            <p className="text-muted-foreground leading-relaxed">
              We've received your contribution interest and will be in touch within a few days. We appreciate your support for the newcomer community.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-display text-foreground mb-1">Ready to Contribute?</h1>
            <p className="text-muted-foreground mb-6">
              CanConnect is community-built. Let us know how you'd like to get involved, and we'll reach out.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contribution dropdown */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1">How would you like to help? <span className="text-accent">*</span></label>
                <Select value={selected} onValueChange={setSelected}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {contributionOptions.map(opt => (
                      <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Contact info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Name <span className="text-accent">*</span></label>
                  <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Email <span className="text-accent">*</span></label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" placeholder="your@email.com" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Anything else you'd like to share? <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm resize-none" placeholder="Tell us a bit about yourself or your ideas..." />
              </div>

              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Submitting..." : "Send My Interest"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
