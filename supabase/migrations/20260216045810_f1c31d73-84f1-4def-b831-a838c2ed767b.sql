
-- Newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text DEFAULT 'footer',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage subscribers" ON public.newsletter_subscribers
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Contributions (Get Involved form)
CREATE TABLE public.contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  contribution_types text[] NOT NULL DEFAULT '{}',
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contributions" ON public.contributions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage contributions" ON public.contributions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Advertising inquiries
CREATE TABLE public.advertising_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  budget_range text,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.advertising_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit ad inquiries" ON public.advertising_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage ad inquiries" ON public.advertising_inquiries
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add missing fields to events
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS website text,
  ADD COLUMN IF NOT EXISTS contact_email text,
  ADD COLUMN IF NOT EXISTS contact_phone text,
  ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '{}'::jsonb;
