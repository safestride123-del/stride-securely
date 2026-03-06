
-- Fix permissive INSERT policy on danger_reports
DROP POLICY "Authenticated users can insert reports" ON public.danger_reports;
CREATE POLICY "Authenticated users can insert own reports" ON public.danger_reports FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
