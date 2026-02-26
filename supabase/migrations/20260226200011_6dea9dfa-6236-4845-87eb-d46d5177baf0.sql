
CREATE TABLE public.business_partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_on_card text NOT NULL,
  company_name text,
  email text NOT NULL,
  billing_address text NOT NULL,
  country text NOT NULL DEFAULT 'Canada',
  province text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  payment_status text NOT NULL DEFAULT 'unpaid',
  admin_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.business_partner_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit business partner applications"
  ON public.business_partner_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage business partner applications"
  ON public.business_partner_applications FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_business_partner_applications_updated_at
  BEFORE UPDATE ON public.business_partner_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
