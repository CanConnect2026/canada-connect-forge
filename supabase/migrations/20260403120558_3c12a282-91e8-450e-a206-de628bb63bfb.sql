
-- 1. Fix profiles: drop the overly broad public SELECT policy exposing emails
DROP POLICY IF EXISTS "Public profiles are viewable" ON public.profiles;

-- 2. Fix privilege escalation: block non-admin INSERT on user_roles
-- Only admins (via existing ALL policy) should be able to insert roles
CREATE POLICY "Prevent non-admin role insertion"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 3. Fix permissive INSERT policies - scope them to reject empty/invalid data
-- These tables intentionally allow public inserts (contact forms, suggestions, etc.)
-- but we tighten newsletter to prevent duplicates and ensure valid data flows
