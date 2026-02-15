
-- Create guide categories enum-like approach via text for flexibility
-- Create the articles/guides table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  summary TEXT,
  category TEXT NOT NULL,
  province TEXT DEFAULT 'ON',
  city TEXT,
  estimated_read_minutes INTEGER DEFAULT 5,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  checklist JSONB DEFAULT '[]'::jsonb,
  featured_image_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Anyone can view published articles
CREATE POLICY "Anyone can view published articles"
ON public.articles
FOR SELECT
USING (is_published = true);

-- Admins can manage all articles
CREATE POLICY "Admins can manage articles"
ON public.articles
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for slug lookups
CREATE INDEX idx_articles_slug ON public.articles (slug);
CREATE INDEX idx_articles_category ON public.articles (category);
CREATE INDEX idx_articles_is_published ON public.articles (is_published);

-- Trigger for updated_at
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create article categories table for CMS-managed categories
CREATE TABLE public.article_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.article_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view article categories"
ON public.article_categories
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage article categories"
ON public.article_categories
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed default categories
INSERT INTO public.article_categories (name, slug, icon, sort_order) VALUES
  ('Getting Started in Canada', 'getting-started', 'Compass', 1),
  ('Banking & Finances', 'banking-finances', 'DollarSign', 2),
  ('Housing & Renting', 'housing-renting', 'Home', 3),
  ('Employment & Work', 'employment-work', 'Briefcase', 4),
  ('Immigration & Status', 'immigration-status', 'Scale', 5),
  ('Healthcare', 'healthcare', 'Stethoscope', 6),
  ('Education & Language', 'education-language', 'BookOpen', 7),
  ('Transportation', 'transportation', 'Car', 8),
  ('Family & Children', 'family-children', 'Users', 9),
  ('Daily Life & Essentials', 'daily-life', 'Heart', 10);
