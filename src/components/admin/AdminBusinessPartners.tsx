import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Application {
  id: string;
  name_on_card: string;
  company_name: string | null;
  email: string;
  billing_address: string;
  country: string;
  province: string;
  city: string;
  postal_code: string;
  status: string;
  payment_status: string;
  admin_notes: string | null;
  created_at: string;
}

export default function AdminBusinessPartners() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["business-partner-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business_partner_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Application[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status, payment_status, adminNotes }: { id: string; status: string; payment_status?: string; adminNotes?: string }) => {
      const updates: Record<string, unknown> = { status };
      if (payment_status) updates.payment_status = payment_status;
      if (adminNotes !== undefined) updates.admin_notes = adminNotes;
      const { error } = await supabase
        .from("business_partner_applications")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["business-partner-applications"] });
      toast({ title: "Application updated" });
      setExpandedId(null);
    },
  });

  const statusColor = (s: string) => {
    if (s === "approved") return "bg-badge-free text-accent-foreground";
    if (s === "rejected") return "bg-badge-paid text-accent-foreground";
    return "bg-muted text-muted-foreground";
  };

  const paymentColor = (s: string) => {
    if (s === "paid") return "bg-badge-free text-accent-foreground";
    return "bg-muted text-muted-foreground";
  };

  if (isLoading) return <p className="text-muted-foreground py-8">Loading applications...</p>;
  if (!applications.length) return <p className="text-muted-foreground py-8">No business partner applications yet.</p>;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <>
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.name_on_card}</TableCell>
                <TableCell>{app.company_name || "—"}</TableCell>
                <TableCell className="text-sm">{app.email}</TableCell>
                <TableCell>
                  <Badge className={statusColor(app.status)}>{app.status}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={paymentColor(app.payment_status)}>{app.payment_status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(app.created_at), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setExpandedId(expandedId === app.id ? null : app.id);
                      setNotes(app.admin_notes || "");
                    }}
                  >
                    {expandedId === app.id ? "Close" : "Review"}
                  </Button>
                </TableCell>
              </TableRow>

              {expandedId === app.id && (
                <TableRow key={`${app.id}-detail`}>
                  <TableCell colSpan={7} className="bg-muted/30 p-4">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                      <div><strong>Address:</strong> {app.billing_address}</div>
                      <div><strong>Location:</strong> {app.city}, {app.province}, {app.country} {app.postal_code}</div>
                    </div>
                    <Textarea
                      placeholder="Admin notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mb-3"
                      rows={2}
                    />
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        onClick={() => updateStatus.mutate({ id: app.id, status: "approved", adminNotes: notes })}
                        disabled={updateStatus.isPending}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateStatus.mutate({ id: app.id, status: "rejected", adminNotes: notes })}
                        disabled={updateStatus.isPending}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus.mutate({ id: app.id, status: app.status, payment_status: "paid", adminNotes: notes })}
                        disabled={updateStatus.isPending}
                      >
                        Mark as Paid
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
