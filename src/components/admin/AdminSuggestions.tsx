import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminSuggestions() {
  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["admin-suggestions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("suggested_services").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      {suggestions.length === 0 ? (
        <p className="p-6 text-muted-foreground text-center">No suggestions yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suggestions.map(s => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.organization_name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{s.category || "—"}</TableCell>
                <TableCell className="text-sm">{s.city || "—"}</TableCell>
                <TableCell>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{s.status}</span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
