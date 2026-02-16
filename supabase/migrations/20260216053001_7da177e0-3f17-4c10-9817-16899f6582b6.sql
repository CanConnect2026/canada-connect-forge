
-- Fix events defaults to require admin approval
ALTER TABLE public.events ALTER COLUMN is_published SET DEFAULT false;
ALTER TABLE public.events ALTER COLUMN status SET DEFAULT 'pending';
