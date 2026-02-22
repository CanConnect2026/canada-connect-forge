
-- Add double opt-in columns to newsletter_subscribers
ALTER TABLE public.newsletter_subscribers
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS confirmed_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS confirmation_token uuid DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS ip_address text;

-- Update existing subscribers to confirmed status
UPDATE public.newsletter_subscribers SET status = 'confirmed', confirmed_at = created_at WHERE status = 'pending';

-- Add unique index on confirmation_token
CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_confirmation_token ON public.newsletter_subscribers (confirmation_token);
