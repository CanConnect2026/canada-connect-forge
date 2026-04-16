-- Add slug and description columns
ALTER TABLE public.restaurants
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS description text;

-- Populate slugs from names
UPDATE public.restaurants
SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Add unique constraint
CREATE UNIQUE INDEX IF NOT EXISTS idx_restaurants_slug ON public.restaurants (slug);