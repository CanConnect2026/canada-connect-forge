import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

interface ClaimFormProps {
  listingId: string;
  listingName: string;
  onClose: () => void;
}

export default function ClaimForm({ listingId, listingName, onClose }: ClaimFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    organization_name: listingName,
    contact_email: user?.email || "",
    contact_phone: "",
    proof_description: "",
  });

  if (!user) {
    return (
      <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-lg border p-6 max-w-md w-full shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl text-foreground">Sign In Required</h2>
            <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
          </div>
          <p className="text-muted-foreground text-sm mb-4">You need to be signed in to claim a listing.</p>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from("listing_claims").insert({
        listing_id: listingId,
        user_id: user.id,
        organization_name: form.organization_name,
        contact_email: form.contact_email,
        contact_phone: form.contact_phone || null,
        proof_description: form.proof_description || null,
      });
      if (error) throw error;
      toast({ title: "Claim Submitted", description: "Your claim is under review. We'll be in touch!" });
      onClose();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-foreground">Claim This Listing</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Only non-profit organizations can claim listings. Our team will review your submission.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Organization Name</label>
            <Input value={form.organization_name} onChange={e => setForm(f => ({ ...f, organization_name: e.target.value }))} required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Contact Email</label>
            <Input type="email" value={form.contact_email} onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))} required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Contact Phone (optional)</label>
            <Input value={form.contact_phone} onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Proof / Description</label>
            <textarea
              className="w-full bg-background border rounded-md px-3 py-2 text-sm min-h-[80px] outline-none focus:ring-2 focus:ring-ring"
              placeholder="Describe your role in the organization and provide any relevant links or details..."
              value={form.proof_description}
              onChange={e => setForm(f => ({ ...f, proof_description: e.target.value }))}
            />
          </div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
            {loading ? "Submitting..." : "Submit Claim"}
          </Button>
        </form>
      </div>
    </div>
  );
}
