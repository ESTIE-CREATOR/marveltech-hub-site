
-- Fix: restrict guest repair inserts to anon+authenticated roles instead of blanket true
DROP POLICY "Anyone can create repair requests" ON public.repair_requests;
CREATE POLICY "Anyone can create repair requests" ON public.repair_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
