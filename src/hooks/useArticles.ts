import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  category: string;
  province: string | null;
  city: string | null;
  estimated_read_minutes: number;
  content: any[];
  checklist: any[];
  featured_image_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ArticleCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
}

export function useArticles(filters?: { category?: string; search?: string }) {
  return useQuery({
    queryKey: ["articles", filters],
    queryFn: async () => {
      let query = supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (filters?.category) {
        query = query.eq("category", filters.category);
      }

      const { data, error } = await query;
      if (error) throw error;

      let articles = data as Article[];
      if (filters?.search) {
        const s = filters.search.toLowerCase();
        articles = articles.filter(
          a => a.title.toLowerCase().includes(s) || a.summary?.toLowerCase().includes(s)
        );
      }
      return articles;
    },
  });
}

export function useFeaturedArticles(limit = 3) {
  return useQuery({
    queryKey: ["featured-articles", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .order("updated_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data as Article[];
    },
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      return data as Article;
    },
    enabled: !!slug,
  });
}

export function useRelatedArticles(article: Article | undefined, limit = 3) {
  return useQuery({
    queryKey: ["related-articles", article?.id],
    queryFn: async () => {
      if (!article) return [];
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("is_published", true)
        .eq("category", article.category)
        .neq("id", article.id)
        .order("updated_at", { ascending: false })
        .limit(limit);
      return (data || []) as Article[];
    },
    enabled: !!article,
  });
}

export function useArticleCategories() {
  return useQuery({
    queryKey: ["article-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("article_categories")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as ArticleCategory[];
    },
  });
}
