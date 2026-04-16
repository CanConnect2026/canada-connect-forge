ALTER TABLE public.listings ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.events   ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}';

CREATE INDEX IF NOT EXISTS listings_tags_gin_idx ON public.listings USING gin (tags);
CREATE INDEX IF NOT EXISTS events_tags_gin_idx   ON public.events   USING gin (tags);
CREATE INDEX IF NOT EXISTS articles_tags_gin_idx ON public.articles USING gin (tags);

UPDATE public.listings
SET tags = ARRAY(SELECT DISTINCT unnest(tags || ARRAY['food']))
WHERE category = 'Restaurants' AND NOT ('food' = ANY(tags));

COMMENT ON COLUMN public.listings.tags IS
  'Curation tags. Canonical: food, settlement, newcomer, culture, neighbourhood, services, featured, events.';
COMMENT ON COLUMN public.events.tags IS
  'Curation tags. Canonical: food, settlement, newcomer, culture, neighbourhood, services, featured, events.';
COMMENT ON COLUMN public.articles.tags IS
  'Curation tags. Canonical: food, settlement, newcomer, culture, neighbourhood, services, featured, events.';