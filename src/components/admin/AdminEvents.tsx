import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, X, Star, Eye, EyeOff, Plus, Pencil, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { EVENT_CATEGORIES } from "@/data/eventCategories";
import { format } from "date-fns";

interface EventForm {
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location: string;
  city: string;
  category: string;
  cost_type: string;
  languages: string;
  image_url: string;
}

const emptyForm: EventForm = {
  title: "",
  description: "",
  event_date: "",
  start_time: "",
  end_time: "",
  location: "",
  city: "Toronto",
  category: "",
  cost_type: "Free",
  languages: "English",
  image_url: "",
};

export default function AdminEvents() {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateEvent = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, any> }) => {
      const { error } = await supabase.from("events").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({ title: "Updated" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const handleApprove = (id: string) => {
    updateEvent.mutate({ id, updates: { status: "approved", is_published: true } });
  };

  const handleReject = (id: string) => {
    updateEvent.mutate({ id, updates: { status: "expired", is_published: false } });
  };

  const openCreateDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setDialogOpen(true);
  };

  const openEditDialog = (event: any) => {
    setEditingId(event.id);
    setForm({
      title: event.title || "",
      description: event.description || "",
      event_date: event.event_date || "",
      start_time: event.start_time || "",
      end_time: event.end_time || "",
      location: event.location || "",
      city: event.city || "Toronto",
      category: event.category || "",
      cost_type: event.cost_type || "Free",
      languages: (event.languages || ["English"]).join(", "),
      image_url: event.image_url || "",
    });
    setImageFile(null);
    setDialogOpen(true);
  };

  const handleSubmitForm = async () => {
    if (!form.title || !form.event_date || !form.category) {
      toast({ title: "Missing fields", description: "Title, date, and category are required.", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      let image_url = form.image_url;

      if (imageFile && user) {
        const ext = imageFile.name.split(".").pop();
        const path = `admin/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("event-images").upload(path, imageFile);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("event-images").getPublicUrl(path);
        image_url = urlData.publicUrl;
      }

      const langs = form.languages.split(",").map(l => l.trim()).filter(Boolean);
      const payload = {
        title: form.title,
        description: form.description || null,
        event_date: form.event_date,
        start_time: form.start_time || null,
        end_time: form.end_time || null,
        location: form.location || null,
        city: form.city,
        category: form.category,
        cost_type: form.cost_type,
        languages: langs.length ? langs : ["English"],
        image_url: image_url || null,
      };

      if (editingId) {
        const { error } = await supabase.from("events").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert({
          ...payload,
          created_by: user?.id || null,
          submitted_by_type: "admin",
          status: "approved",
          is_published: true,
        });
        if (error) throw error;
      }

      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setDialogOpen(false);
      toast({ title: editingId ? "Event updated" : "Event created" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-secondary text-secondary-foreground",
      approved: "bg-badge-free text-accent-foreground",
      expired: "bg-muted text-muted-foreground",
    };
    return <span className={`px-2 py-0.5 rounded-full text-xs ${colors[status] || colors.expired}`}>{status}</span>;
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{events.length} events total</p>
        <Button size="sm" onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-1" /> Add Event
        </Button>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((e: any) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.title}</TableCell>
                <TableCell className="text-sm">{e.event_date}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{e.category || "—"}</TableCell>
                <TableCell className="text-sm">{e.city}</TableCell>
                <TableCell>{statusBadge(e.status)}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{e.submitted_by_type || "admin"}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {e.status === "pending" && (
                      <>
                        <Button variant="ghost" size="icon" title="Approve" onClick={() => handleApprove(e.id)}>
                          <Check className="w-4 h-4 text-accent" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Reject" onClick={() => handleReject(e.id)}>
                          <X className="w-4 h-4 text-destructive" />
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon" title={e.is_published ? "Unpublish" : "Publish"}
                      onClick={() => updateEvent.mutate({ id: e.id, updates: { is_published: !e.is_published, status: !e.is_published ? "approved" : "expired" } })}>
                      {e.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" title={e.is_featured ? "Unfeature" : "Feature"}
                      onClick={() => updateEvent.mutate({ id: e.id, updates: { is_featured: !e.is_featured } })}>
                      <Star className={`w-4 h-4 ${e.is_featured ? "fill-accent text-accent" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit" onClick={() => openEditDialog(e)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {EVENT_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>City</Label>
                <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Date *</Label>
                <Input type="date" value={form.event_date} onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))} />
              </div>
              <div>
                <Label>Start Time</Label>
                <Input type="time" value={form.start_time} onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))} />
              </div>
              <div>
                <Label>End Time</Label>
                <Input type="time" value={form.end_time} onChange={e => setForm(f => ({ ...f, end_time: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label>Location / Venue</Label>
              <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Cost</Label>
                <Select value={form.cost_type} onValueChange={v => setForm(f => ({ ...f, cost_type: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Languages</Label>
                <Input value={form.languages} onChange={e => setForm(f => ({ ...f, languages: e.target.value }))} placeholder="English, French" />
              </div>
            </div>
            <div>
              <Label>Event Image</Label>
              <label className="flex items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-accent transition-colors bg-muted/30 mt-1">
                <Upload className="w-5 h-5 text-muted-foreground mr-2" />
                <span className="text-sm text-muted-foreground">{imageFile ? imageFile.name : "Upload image"}</span>
                <input type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files?.[0] || null)} />
              </label>
              {form.image_url && !imageFile && (
                <img src={form.image_url} alt="Current" className="mt-2 h-24 rounded object-cover" />
              )}
            </div>
            <Button onClick={handleSubmitForm} className="w-full" disabled={uploading}>
              {uploading ? "Saving..." : editingId ? "Save Changes" : "Create Event"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
