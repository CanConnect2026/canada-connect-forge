import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminClaims() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: claims = [], isLoading } = useQuery({
    queryKey: ["admin-claims"],
    queryFn: async () => {
      const { data, error } = await supabase.from("listing_claims").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateClaim = useMutation({
    mutationFn: async ({ id, status, listingId, userId }: { id: string; status: "approved" | "rejected"; listingId: string; userId: string }) => {
      const { error } = await supabase.from("listing_claims").update({ status }).eq("id", id);
      if (error) throw error;
      if (status === "approved") {
        await supabase.from("listings").update({ claim_status: "approved", claimed_by: userId }).eq("id", listingId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-claims"] });
      queryClient.invalidateQueries({ queryKey: ["admin-listings"] });
      toast({ title: "Claim updated" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      {claims.length === 0 ? (
        <p className="p-6 text-muted-foreground text-center">No claims yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map(c => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.organization_name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{c.contact_email}</TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    c.status === "approved" ? "bg-badge-free text-accent-foreground" :
                    c.status === "rejected" ? "bg-badge-paid text-accent-foreground" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {c.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  {c.status === "pending" && (
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" title="Approve" onClick={() => updateClaim.mutate({ id: c.id, status: "approved", listingId: c.listing_id, userId: c.user_id })}>
                        <Check className="w-4 h-4 text-badge-free" />
                      </Button>
                      <Button size="icon" variant="ghost" title="Reject" onClick={() => updateClaim.mutate({ id: c.id, status: "rejected", listingId: c.listing_id, userId: c.user_id })}>
                        <X className="w-4 h-4 text-badge-paid" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
