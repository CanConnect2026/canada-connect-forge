
-- Drop the existing permissive policy
DROP POLICY IF EXISTS "Prevent non-admin role insertion" ON public.user_roles;

-- Recreate as RESTRICTIVE so it cannot be bypassed by other permissive policies
CREATE POLICY "Prevent non-admin role insertion"
ON public.user_roles
AS RESTRICTIVE
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
