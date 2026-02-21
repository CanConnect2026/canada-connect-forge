
-- Contact messages table
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact messages"
ON public.contact_messages FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage contact messages"
ON public.contact_messages FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Issue reports table
CREATE TABLE public.issue_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_name TEXT,
  reporter_email TEXT,
  issue_description TEXT NOT NULL,
  related_url TEXT,
  related_listing_id UUID REFERENCES public.listings(id),
  related_event_id UUID REFERENCES public.events(id),
  status TEXT NOT NULL DEFAULT 'open',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.issue_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit issue reports"
ON public.issue_reports FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage issue reports"
ON public.issue_reports FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add name to newsletter_subscribers for personalized emails
ALTER TABLE public.newsletter_subscribers ADD COLUMN IF NOT EXISTS name TEXT;
