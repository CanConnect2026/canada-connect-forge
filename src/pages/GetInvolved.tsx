import { useState } from "react";
import { CheckCircle2, Send, Heart, PenLine, Megaphone, Users } from "lucide-react";
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

const ways = [
  { icon: Heart, title: "Share your story", desc: "Help others feel less alone by sharing your immigration or integration experience." },
  { icon: PenLine, title: "Write or contribute content", desc: "Articles, guides, opinion pieces, and practical insights that support newcomer life." },
  { icon: Megaphone, title: "Share resources or events", desc: "Help keep the community informed about services, programs, or local opportunities." },
  { icon: Users, title: "Collaborate on projects", desc: "Partner with us on research, campaigns, interviews, or community initiatives." },
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

  const formContent = submitted ? (
    <div className="text-center py-12">
      <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
      <h2 className="font-display text-2xl mb-3">Thanks for Your Interest!</h2>
      <p className="text-muted-foreground leading-relaxed text-sm">
        We've received your contribution interest and will be in touch within a few days. We appreciate your support for the newcomer community.
      </p>
    </div>
  ) : (
    <div>
      <h2 className="text-xl font-display text-foreground mb-1">Ready to Contribute?</h2>
      <p className="text-muted-foreground text-sm mb-5">
        Tell us how you'd like to get involved, and we'll reach out.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
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
  );

  return (
    <div className="bg-background">
      <div className="bg-primary py-16">
        <div className="container">
          <h1 className="text-4xl font-display text-primary-foreground">Get Involved</h1>
          <p className="text-primary-foreground/70 mt-2">CanConnect is community-built — here's how you can take part</p>
        </div>
      </div>

      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Content */}
          <div className="space-y-8">
            <div>
              <p className="text-muted-foreground leading-relaxed">
                CanConnect is built by immigrants, for immigrants. This page is for those who want to give back — whether through experience, skills, or stories that help newcomers navigate life in Canada.
              </p>
            </div>

            {/* Who this is for */}
            <div>
              <h2 className="text-lg font-display text-foreground mb-2">Who this is for</h2>
              <p className="text-muted-foreground text-sm mb-2">You might be a good fit if you are:</p>
              <ul className="text-muted-foreground text-sm space-y-1.5 list-disc list-inside">
                <li>A settled immigrant who wants to share lessons learned</li>
                <li>A community member who wants to support newcomer success</li>
                <li>A writer, researcher, or storyteller interested in migration and belonging</li>
                <li>A service provider or organization looking to share knowledge or collaborate</li>
              </ul>
            </div>

            {/* Ways to get involved */}
            <div>
              <h2 className="text-lg font-display text-foreground mb-3">Ways to get involved</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ways.map((w) => (
                  <div key={w.title} className="p-4 rounded-lg border bg-card">
                    <w.icon className="w-5 h-5 text-accent mb-2" />
                    <h3 className="text-sm font-semibold text-foreground mb-1">{w.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why get involved */}
            <div>
              <h2 className="text-lg font-display text-foreground mb-2">Why get involved?</h2>
              <p className="text-muted-foreground text-sm mb-2">
                Your contribution helps strengthen the ecosystem that newcomers rely on. By getting involved, you help:
              </p>
              <ul className="text-muted-foreground text-sm space-y-1.5 list-disc list-inside">
                <li>Make information more accessible and human</li>
                <li>Build trust through lived experience</li>
                <li>Support newcomers beyond one-on-one help</li>
                <li>Shape a platform designed to grow with the community</li>
              </ul>
            </div>
          </div>

          {/* Right — Form (sticky on desktop) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-card border rounded-xl p-6 lg:p-8">
              {formContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
