
-- Drop the overly permissive update policy
DROP POLICY "Service role can update donations" ON public.donations;

-- Restrict update: no one can update via anon key (service role bypasses RLS)
CREATE POLICY "No public updates on donations"
ON public.donations
FOR UPDATE
USING (false);

-- Also restrict delete
CREATE POLICY "No public deletes on donations"
ON public.donations
FOR DELETE
USING (false);
