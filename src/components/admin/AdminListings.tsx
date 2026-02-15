import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ListingBadge from "@/components/ListingBadge";
import { Check, X, Star, Eye, EyeOff, Shield, ShieldOff, Plus, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminListingForm from "./AdminListingForm";
import { useState } from "react";

export default function AdminListings() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ["admin-listings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("listings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateListing = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, any> }) => {
      const { error } = await supabase.from("listings").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      toast({ title: "Updated" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{listings.length} listings total</p>
        <Button size="sm" onClick={() => { setEditData(null); setFormOpen(true); }}>
          <Plus className="w-4 h-4 mr-1" /> Add Listing
        </Button>
      </div>
      <div className="bg-card rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listings.map(l => (
            <TableRow key={l.id}>
              <TableCell className="font-medium">{l.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{l.category}</TableCell>
              <TableCell className="text-sm">{l.city}</TableCell>
              <TableCell><ListingBadge type={l.listing_type} /></TableCell>
              <TableCell>
                <div className="flex gap-1 text-xs">
                  <span className={`px-2 py-0.5 rounded-full ${l.is_published ? "bg-badge-free text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {l.is_published ? "Published" : "Draft"}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full ${l.verification_status === "verified" ? "bg-badge-free text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {l.verification_status}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    title={l.is_published ? "Unpublish" : "Publish"}
                    onClick={() => updateListing.mutate({ id: l.id, updates: { is_published: !l.is_published } })}
                  >
                    {l.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title={l.is_featured ? "Unfeature" : "Feature"}
                    onClick={() => updateListing.mutate({ id: l.id, updates: { is_featured: !l.is_featured } })}
                  >
                    <Star className={`w-4 h-4 ${l.is_featured ? "fill-accent text-accent" : ""}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title={l.verification_status === "verified" ? "Unverify" : "Verify"}
                    onClick={() => updateListing.mutate({
                      id: l.id,
                      updates: { verification_status: l.verification_status === "verified" ? "unverified" : "verified" },
                    })}
                  >
                  {l.verification_status === "verified" ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" title="Edit" onClick={() => { setEditData(l); setFormOpen(true); }}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
      <AdminListingForm open={formOpen} onOpenChange={setFormOpen} editData={editData} />
    </div>
  );
}
