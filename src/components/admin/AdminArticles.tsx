import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff, Star, Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useArticleCategories, type Article } from "@/hooks/useArticles";

interface ArticleForm {
  title: string;
  slug: string;
  summary: string;
  category: string;
  province: string;
  city: string;
  estimated_read_minutes: number;
  content: string;
  checklist: string;
  featured_image_url: string;
}

const emptyForm: ArticleForm = {
  title: "",
  slug: "",
  summary: "",
  category: "",
  province: "ON",
  city: "",
  estimated_read_minutes: 5,
  content: "",
  checklist: "",
  featured_image_url: "",
};

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminArticles() {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleForm>(emptyForm);
  const { data: categories = [] } = useArticleCategories();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Article[];
    },
  });

  const updateArticle = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Record<string, any> }) => {
      const { error } = await supabase.from("articles").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["featured-articles"] });
      toast({ title: "Updated" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteArticle = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast({ title: "Deleted" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const openCreateDialog = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEditDialog = (article: Article) => {
    setEditingId(article.id);
    setForm({
      title: article.title,
      slug: article.slug,
      summary: article.summary || "",
      category: article.category,
      province: article.province || "ON",
      city: article.city || "",
      estimated_read_minutes: article.estimated_read_minutes || 5,
      content: JSON.stringify(article.content, null, 2),
      checklist: JSON.stringify(article.checklist, null, 2),
      featured_image_url: article.featured_image_url || "",
    });
    setDialogOpen(true);
  };

  const handleSubmitForm = async () => {
    if (!form.title || !form.category) {
      toast({ title: "Missing fields", description: "Title and category are required.", variant: "destructive" });
      return;
    }

    let contentParsed: any[] = [];
    let checklistParsed: any[] = [];
    try {
      contentParsed = form.content ? JSON.parse(form.content) : [];
      checklistParsed = form.checklist ? JSON.parse(form.checklist) : [];
    } catch {
      toast({ title: "Invalid JSON", description: "Content or checklist JSON is invalid.", variant: "destructive" });
      return;
    }

    const slug = form.slug || slugify(form.title);
    const payload = {
      title: form.title,
      slug,
      summary: form.summary || null,
      category: form.category,
      province: form.province || "ON",
      city: form.city || null,
      estimated_read_minutes: form.estimated_read_minutes,
      content: contentParsed,
      checklist: checklistParsed,
      featured_image_url: form.featured_image_url || null,
    };

    try {
      if (editingId) {
        const { error } = await supabase.from("articles").update(payload).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("articles").insert({
          ...payload,
          created_by: user?.id || null,
          is_published: false,
          is_featured: false,
        });
        if (error) throw error;
      }
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["featured-articles"] });
      setDialogOpen(false);
      toast({ title: editingId ? "Guide updated" : "Guide created" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{articles.length} guides total</p>
        <Button size="sm" onClick={openCreateDialog}>
          <Plus className="w-4 h-4 mr-1" /> Add Guide
        </Button>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((a) => (
              <TableRow key={a.id}>
                <TableCell className="font-medium">{a.title}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{a.category}</TableCell>
                <TableCell className="text-sm">{a.city || "—"}</TableCell>
                <TableCell>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${a.is_published ? "bg-badge-free text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {a.is_published ? "Published" : "Draft"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" title={a.is_published ? "Unpublish" : "Publish"}
                      onClick={() => updateArticle.mutate({ id: a.id, updates: { is_published: !a.is_published } })}>
                      {a.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" title={a.is_featured ? "Unfeature" : "Feature"}
                      onClick={() => updateArticle.mutate({ id: a.id, updates: { is_featured: !a.is_featured } })}>
                      <Star className={`w-4 h-4 ${a.is_featured ? "fill-accent text-accent" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit" onClick={() => openEditDialog(a)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete" onClick={() => deleteArticle.mutate(a.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Guide" : "Add New Guide"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: editingId ? f.slug : slugify(e.target.value) }))} />
            </div>
            <div>
              <Label>URL Slug</Label>
              <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} placeholder="auto-generated-from-title" />
            </div>
            <div>
              <Label>Summary (1–2 lines)</Label>
              <Textarea value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>City (optional)</Label>
                <Input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label>Estimated Read Time (minutes)</Label>
              <Input type="number" value={form.estimated_read_minutes} onChange={(e) => setForm((f) => ({ ...f, estimated_read_minutes: parseInt(e.target.value) || 5 }))} />
            </div>
            <div>
              <Label>Featured Image URL</Label>
              <Input value={form.featured_image_url} onChange={(e) => setForm((f) => ({ ...f, featured_image_url: e.target.value }))} placeholder="https://..." />
            </div>
            <div>
              <Label>Content (JSON array of steps)</Label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={8}
                placeholder={`[{"heading": "Step title", "body": "Description", "tip": "Optional tip"}]`}
                className="font-mono text-xs"
              />
            </div>
            <div>
              <Label>Checklist (JSON array)</Label>
              <Textarea
                value={form.checklist}
                onChange={(e) => setForm((f) => ({ ...f, checklist: e.target.value }))}
                rows={4}
                placeholder={`["Item 1", "Item 2"]`}
                className="font-mono text-xs"
              />
            </div>
            <Button onClick={handleSubmitForm} className="w-full">
              {editingId ? "Save Changes" : "Create Guide"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
