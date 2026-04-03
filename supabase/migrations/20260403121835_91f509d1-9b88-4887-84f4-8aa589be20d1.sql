
-- Drop and recreate with security_invoker to fix the linter error
DROP VIEW IF EXISTS public.user_listing_claims;

CREATE VIEW public.user_listing_claims WITH (security_invoker = true) AS
SELECT id, listing_id, user_id, status, created_at, updated_at,
       organization_name, contact_email, contact_phone, proof_description
FROM public.listing_claims
WHERE auth.uid() = user_id;

GRANT SELECT ON public.user_listing_claims TO authenticated;
