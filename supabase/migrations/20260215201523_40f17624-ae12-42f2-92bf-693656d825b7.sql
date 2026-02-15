
-- Add event_status enum
CREATE TYPE public.event_status AS ENUM ('pending', 'approved', 'expired');

-- Add new columns to events table
ALTER TABLE public.events
  ADD COLUMN status public.event_status NOT NULL DEFAULT 'approved',
  ADD COLUMN cost_type text NOT NULL DEFAULT 'Free',
  ADD COLUMN languages text[] NOT NULL DEFAULT '{English}'::text[],
  ADD COLUMN submitted_by_type text NOT NULL DEFAULT 'admin',
  ADD COLUMN latitude double precision,
  ADD COLUMN longitude double precision;

-- Update existing events to 'approved' status (they were already published)
UPDATE public.events SET status = 'approved' WHERE is_published = true;

-- Allow authenticated users to submit events (they go to pending)
CREATE POLICY "Authenticated users can submit events"
ON public.events
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = created_by
  AND status = 'pending'::event_status
  AND is_published = false
);

-- Allow users to view their own pending events
CREATE POLICY "Users can view their own pending events"
ON public.events
FOR SELECT
TO authenticated
USING (auth.uid() = created_by AND status = 'pending'::event_status);
