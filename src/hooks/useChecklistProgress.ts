import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useChecklistProgress(userId: string | undefined, streamSlug: string | undefined) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from DB on mount / stream change
  useEffect(() => {
    if (!userId || !streamSlug) {
      setChecked(new Set());
      setLoading(false);
      return;
    }

    setLoading(true);
    supabase
      .from("checklist_progress")
      .select("checked_items")
      .eq("user_id", userId)
      .eq("stream_slug", streamSlug)
      .maybeSingle()
      .then(({ data }) => {
        setChecked(new Set(data?.checked_items ?? []));
        setLoading(false);
      });
  }, [userId, streamSlug]);

  // Persist to DB (debounced)
  const persistToDb = useCallback(
    (items: Set<string>) => {
      if (!userId || !streamSlug) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(async () => {
        const arr = [...items];
        await supabase
          .from("checklist_progress")
          .upsert(
            { user_id: userId, stream_slug: streamSlug, checked_items: arr, updated_at: new Date().toISOString() },
            { onConflict: "user_id,stream_slug" }
          );
      }, 500);
    },
    [userId, streamSlug]
  );

  const toggleItem = useCallback(
    (itemId: string) => {
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) next.delete(itemId);
        else next.add(itemId);
        persistToDb(next);
        return next;
      });
    },
    [persistToDb]
  );

  return { checked, loading, toggleItem };
}
