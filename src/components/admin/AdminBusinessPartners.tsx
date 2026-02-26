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
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  subscription_start_date: string | null;
  subscription_renewal_date: string | null;
  is_visible: boolean;
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

  const updateApp = useMutation({
    mutationFn: async (updates: { id: string } & Record<string, unknown>) => {
      const { id, ...fields } = updates;
      const { error } = await supabase
        .from("business_partner_applications")
        .update(fields)
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
    if (s === "active") return "bg-badge-free text-accent-foreground";
    if (s === "cancelled" || s === "rejected") return "bg-badge-paid text-accent-foreground";
    return "bg-muted text-muted-foreground";
  };

  const paymentColor = (s: string) => {
    if (s === "paid") return "bg-badge-free text-accent-foreground";
    if (s === "failed") return "bg-badge-paid text-accent-foreground";
    return "bg-muted text-muted-foreground";
  };

  if (isLoading) return <p className="text-muted-foreground py-8">Loading applications...</p>;
  if (!applications.length) return <p className="text-muted-foreground py-8">No business partner applications yet.</p>;

  return (
    <div className="space-y-4 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Visible</TableHead>
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
                <TableCell>
                  <span className={app.is_visible ? "text-badge-free font-semibold" : "text-muted-foreground"}>
                    {app.is_visible ? "Yes" : "No"}
                  </span>
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
                  <TableCell colSpan={8} className="bg-muted/30 p-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                      <div><strong>Address:</strong> {app.billing_address}</div>
                      <div><strong>Location:</strong> {app.city}, {app.province}, {app.country} {app.postal_code}</div>
                      <div><strong>Stripe Customer:</strong> {app.stripe_customer_id || "—"}</div>
                      <div><strong>Subscription ID:</strong> {app.stripe_subscription_id || "—"}</div>
                      {app.subscription_start_date && (
                        <div><strong>Started:</strong> {format(new Date(app.subscription_start_date), "MMM d, yyyy")}</div>
                      )}
                      {app.subscription_renewal_date && (
                        <div><strong>Renews:</strong> {format(new Date(app.subscription_renewal_date), "MMM d, yyyy")}</div>
                      )}
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
                        onClick={() => updateApp.mutate({
                          id: app.id,
                          status: "active",
                          is_visible: true,
                          admin_notes: notes,
                        })}
                        disabled={updateApp.isPending}
                      >
                        Activate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateApp.mutate({
                          id: app.id,
                          is_visible: !app.is_visible,
                          admin_notes: notes,
                        })}
                        disabled={updateApp.isPending}
                      >
                        {app.is_visible ? "Hide Listing" : "Show Listing"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateApp.mutate({
                          id: app.id,
                          status: "cancelled",
                          is_visible: false,
                          admin_notes: notes,
                        })}
                        disabled={updateApp.isPending}
                      >
                        Cancel / Reject
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
