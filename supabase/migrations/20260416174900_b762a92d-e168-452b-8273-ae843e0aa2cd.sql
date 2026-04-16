-- Add monetization tier (free / featured / premium / spotlight)
ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS monetization_tier text NOT NULL DEFAULT 'free';

-- Add FirstBitesTO eligibility flag
ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS firstbites_eligible boolean NOT NULL DEFAULT false;

-- Optional: constrain tier values
ALTER TABLE public.listings
  ADD CONSTRAINT listings_monetization_tier_check
  CHECK (monetization_tier IN ('free', 'featured', 'premium', 'spotlight'));

-- Helpful index for future FirstBitesTO queries
CREATE INDEX IF NOT EXISTS idx_listings_firstbites_eligible
  ON public.listings (firstbites_eligible)
  WHERE firstbites_eligible = true;