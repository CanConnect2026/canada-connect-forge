import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const LISTING_CATEGORIES = [
  "Settlement", "Employment", "Legal", "Housing", "Community",
  "Education", "Healthcare", "Language", "Cultural", "Financial", "Other",
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: any;
}

export default function AdminListingForm({ open, onOpenChange, editData }: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(() => ({
    name: editData?.name || "",
    description_en: editData?.description_en || "",
    category: editData?.category || "",
    city: editData?.city || "Toronto",
    province: editData?.province || "ON",
    full_address: editData?.full_address || "",
    phone: editData?.phone || "",
    email: editData?.email || "",
    website: editData?.website || "",
    listing_type: editData?.listing_type || "free",
    languages_served: (editData?.languages_served || ["English"]).join(", "),
    services_provided: (editData?.services_provided || []).join(", "),
    pricing_info: editData?.pricing_info || "",
  }));

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.city) {
      toast({ title: "Missing fields", description: "Name, category, and city are required.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        description_en: form.description_en || null,
        category: form.category,
        city: form.city,
        province: form.province,
        full_address: form.full_address || null,
        phone: form.phone || null,
        email: form.email || null,
        website: form.website || null,
        listing_type: form.listing_type as "free" | "nonprofit" | "paid",
        languages_served: form.languages_served.split(",").map(l => l.trim()).filter(Boolean),
        services_provided: form.services_provided.split(",").map(s => s.trim()).filter(Boolean),
        pricing_info: form.pricing_info || null,
      };

      if (editData?.id) {
        const { error } = await supabase.from("listings").update(payload).eq("id", editData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("listings").insert({
          ...payload,
          is_published: true,
          verification_status: "verified" as const,
        });
        if (error) throw error;
      }

      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      onOpenChange(false);
      toast({ title: editData ? "Listing updated" : "Listing created" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Edit Listing" : "Add New Listing"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label>Organization Name *</Label>
            <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {LISTING_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Listing Type</Label>
              <Select value={form.listing_type} onValueChange={v => setForm(f => ({ ...f, listing_type: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="nonprofit">Non-Profit</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>City *</Label>
              <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
            </div>
            <div>
              <Label>Province</Label>
              <Input value={form.province} onChange={e => setForm(f => ({ ...f, province: e.target.value }))} />
            </div>
          </div>
          <div>
            <Label>Full Address</Label>
            <Input value={form.full_address} onChange={e => setForm(f => ({ ...f, full_address: e.target.value }))} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Phone</Label>
              <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <Label>Website</Label>
              <Input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} />
            </div>
          </div>
          <div>
            <Label>Languages Served</Label>
            <Input value={form.languages_served} onChange={e => setForm(f => ({ ...f, languages_served: e.target.value }))} placeholder="English, French" />
          </div>
          <div>
            <Label>Services Provided</Label>
            <Input value={form.services_provided} onChange={e => setForm(f => ({ ...f, services_provided: e.target.value }))} placeholder="Settlement, Language Training, Job Placement" />
          </div>
          <div>
            <Label>Pricing Info</Label>
            <Input value={form.pricing_info} onChange={e => setForm(f => ({ ...f, pricing_info: e.target.value }))} placeholder="Free for eligible newcomers" />
          </div>
          <Button onClick={handleSubmit} className="w-full" disabled={saving}>
            {saving ? "Saving..." : editData ? "Save Changes" : "Create Listing"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
