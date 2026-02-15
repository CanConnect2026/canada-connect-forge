
-- Drop the overly permissive policy
DROP POLICY "Anyone can submit suggestions" ON public.suggested_services;

-- Re-create with a more specific check (allow authenticated users to submit, and anonymous with required fields)
CREATE POLICY "Authenticated users can submit suggestions" ON public.suggested_services 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = submitted_by);

-- Allow anonymous submissions (submitted_by will be null)
CREATE POLICY "Anonymous users can submit suggestions" ON public.suggested_services 
FOR INSERT 
TO anon
WITH CHECK (submitted_by IS NULL);
