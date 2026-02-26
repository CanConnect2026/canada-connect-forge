
CREATE TABLE public.community_partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name text NOT NULL,
  organization_type text NOT NULL DEFAULT 'nonprofit',
  primary_services text,
  target_communities text,
  website text,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text,
  short_description text,
  status text NOT NULL DEFAULT 'pending',
  admin_notes text,
  approved_at timestamp with time zone,
  expires_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.community_partner_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit
CREATE POLICY "Anyone can submit community partner applications"
  ON public.community_partner_applications FOR INSERT
  WITH CHECK (true);

-- Admins can manage
CREATE POLICY "Admins can manage community partner applications"
  ON public.community_partner_applications FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_community_partner_applications_updated_at
  BEFORE UPDATE ON public.community_partner_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
