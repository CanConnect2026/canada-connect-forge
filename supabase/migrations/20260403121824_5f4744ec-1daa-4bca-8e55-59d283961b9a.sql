
-- Drop the existing user SELECT policy
DROP POLICY IF EXISTS "Users can view their own claims" ON public.listing_claims;

-- Create a new policy that still lets users see their own claims
-- but we'll handle admin_notes exclusion at the application level
-- by creating a secure view for user-facing queries
CREATE VIEW public.user_listing_claims WITH (security_barrier = true) AS
SELECT id, listing_id, user_id, status, created_at, updated_at,
       organization_name, contact_email, contact_phone, proof_description
FROM public.listing_claims
WHERE auth.uid() = user_id;

-- Re-add SELECT policy for users (they can still see their rows, but app should use the view)
CREATE POLICY "Users can view their own claims"
ON public.listing_claims
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Grant select on the view
GRANT SELECT ON public.user_listing_claims TO authenticated;
