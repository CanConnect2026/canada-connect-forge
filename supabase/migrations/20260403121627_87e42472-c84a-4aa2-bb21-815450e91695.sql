
-- Add explicit SELECT policy restricting reads to admins only
CREATE POLICY "Only admins can view community partner applications"
ON public.community_partner_applications
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
