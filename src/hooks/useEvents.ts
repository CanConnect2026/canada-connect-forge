import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  city: string | null;
  category: string | null;
  cost_type: string;
  image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  website?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  social_links?: Record<string, string> | null;
  languages?: string[];
  latitude?: number | null;
  longitude?: number | null;
}

export function useEvents(filters?: { date?: string; city?: string; category?: string; includePast?: boolean }) {
  return useQuery({
    queryKey: ["events", filters],
    queryFn: async () => {
      let query = supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("event_date", { ascending: true });

      // By default, exclude past events unless includePast is true
      if (!filters?.includePast && !filters?.date) {
        const today = new Date().toISOString().split("T")[0];
        query = query.gte("event_date", today);
      }

      if (filters?.date) {
        query = query.eq("event_date", filters.date);
      }
      if (filters?.city) {
        query = query.eq("city", filters.city);
      }
      if (filters?.category) {
        query = query.eq("category", filters.category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Event[];
    },
  });
}

export function useAllEventDates() {
  return useQuery({
    queryKey: ["event-dates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("event_date")
        .eq("is_published", true);
      if (error) throw error;
      const uniqueDates = [...new Set(data.map(e => e.event_date))];
      return uniqueDates;
    },
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as Event;
    },
    enabled: !!id,
  });
}

export function useRelatedEvents(event: Event | undefined, limit = 3) {
  return useQuery({
    queryKey: ["related-events", event?.id],
    queryFn: async () => {
      if (!event) return [];
      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .neq("id", event.id)
        .gte("event_date", new Date().toISOString().split("T")[0])
        .order("event_date", { ascending: true })
        .limit(limit * 3);

      if (!data) return [];

      // Score by city and category match
      const scored = data.map(e => ({
        event: e as Event,
        score: (e.city === event.city ? 2 : 0) + (e.category === event.category ? 1 : 0),
      }));
      scored.sort((a, b) => b.score - a.score);
      return scored.slice(0, limit).map(s => s.event);
    },
    enabled: !!event,
  });
}
