ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS cuisine text,
  ADD COLUMN IF NOT EXISTS neighborhood text,
  ADD COLUMN IF NOT EXISTS price_range text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS owner_name text,
  ADD COLUMN IF NOT EXISTS owner_home_country text,
  ADD COLUMN IF NOT EXISTS owner_story text,
  ADD COLUMN IF NOT EXISTS halal boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS kosher boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS vegan_friendly boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS vegetarian_friendly boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS google_places_id text;

-- Unique slug when present (allows multiple NULLs)
CREATE UNIQUE INDEX IF NOT EXISTS idx_listings_slug_unique
  ON public.listings (slug)
  WHERE slug IS NOT NULL;

-- Helpful index for cuisine browsing
CREATE INDEX IF NOT EXISTS idx_listings_cuisine
  ON public.listings (cuisine)
  WHERE cuisine IS NOT NULL;