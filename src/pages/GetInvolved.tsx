import { useState } from "react";
import { Heart, MessageSquare, PenLine, Handshake, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const contributionOptions = [
  { id: "story", icon: MessageSquare, title: "Share Your Story", desc: "Your experience can help others navigate their journey." },
  { id: "content", icon: PenLine, title: "Write or Contribute Content", desc: "Help create practical guides, resources, and stories." },
  { id: "resources", icon: Heart, title: "Share Resources or Events", desc: "Know about a helpful service or event? Let us know." },
  { id: "collaborate", icon: Handshake, title: "Collaborate on Projects", desc: "Partner with us to build impactful community initiatives." },
];

export default function GetInvolved() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selected.length === 0) {
      toast({ title: "Please select at least one option", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("contributions" as any).insert({
        name: name.trim(),
        email: email.trim(),
        contribution_types: selected,
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
            <h2 className="font-display text-3xl mb-3">Thank You!</h2>
            <p className="text-muted-foreground">We've received your contribution interest. Our team will be in touch within a few days.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-display text-foreground mb-1">Ready to Contribute?</h1>
            <p className="text-muted-foreground mb-6">CanConnect is community-built. Select one or more ways you'd like to get involved, and we'll reach out.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contribution options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contributionOptions.map(opt => {
                  const isSelected = selected.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggle(opt.id)}
                      className={`text-left rounded-lg border p-4 transition-all ${
                        isSelected
                          ? "border-accent bg-accent/5 ring-1 ring-accent"
                          : "border-border bg-card hover:border-accent/40"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isSelected ? "bg-accent/20" : "bg-accent/10"}`}>
                          <opt.icon className={`w-4 h-4 ${isSelected ? "text-accent" : "text-accent/70"}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground text-sm">{opt.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{opt.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Contact info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Name *</label>
                  <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Email *</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-1">Anything else you'd like to share?</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} className="w-full bg-background border rounded-md px-3 py-2.5 text-sm resize-none" placeholder="Optional" />
              </div>

              <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                <Send className="w-4 h-4 mr-2" />
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
