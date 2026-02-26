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
  organization_name: string;
  organization_type: string;
  primary_services: string | null;
  target_communities: string | null;
  website: string | null;
  contact_person: string;
  email: string;
  phone: string | null;
  short_description: string | null;
  status: string;
  admin_notes: string | null;
  approved_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export default function AdminCommunityPartners() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const { data: applications = [], isLoading } = useQuery({
    queryKey: ["community-partner-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_partner_applications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Application[];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: string; status: string; adminNotes?: string }) => {
      const updates: Record<string, unknown> = { status };
      if (adminNotes !== undefined) updates.admin_notes = adminNotes;
      if (status === "approved") {
        updates.approved_at = new Date().toISOString();
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        updates.expires_at = expires.toISOString();
      }
      const { error } = await supabase
        .from("community_partner_applications")
        .update(updates)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-partner-applications"] });
      toast({ title: "Application updated" });
      setExpandedId(null);
    },
  });

  const statusColor = (s: string) => {
    if (s === "approved") return "bg-badge-free text-accent-foreground";
    if (s === "rejected") return "bg-badge-paid text-accent-foreground";
    return "bg-muted text-muted-foreground";
  };

  if (isLoading) return <p className="text-muted-foreground py-8">Loading applications...</p>;

  if (!applications.length) return <p className="text-muted-foreground py-8">No applications yet.</p>;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <>
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.organization_name}</TableCell>
                <TableCell className="capitalize">{app.organization_type.replace("_", " ")}</TableCell>
                <TableCell>
                  <div className="text-sm">{app.contact_person}</div>
                  <div className="text-xs text-muted-foreground">{app.email}</div>
                </TableCell>
                <TableCell>
                  <Badge className={statusColor(app.status)}>{app.status}</Badge>
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
                  <TableCell colSpan={6} className="bg-muted/30 p-4">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                      <div><strong>Services:</strong> {app.primary_services || "—"}</div>
                      <div><strong>Communities:</strong> {app.target_communities || "—"}</div>
                      <div><strong>Website:</strong> {app.website ? <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-accent underline">{app.website}</a> : "—"}</div>
                      <div><strong>Phone:</strong> {app.phone || "—"}</div>
                      <div className="sm:col-span-2"><strong>Description:</strong> {app.short_description || "—"}</div>
                      {app.expires_at && (
                        <div><strong>Expires:</strong> {format(new Date(app.expires_at), "MMM d, yyyy")}</div>
                      )}
                    </div>
                    <Textarea
                      placeholder="Admin notes..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="mb-3"
                      rows={2}
                    />
                    <div className="flex gap-2">
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
