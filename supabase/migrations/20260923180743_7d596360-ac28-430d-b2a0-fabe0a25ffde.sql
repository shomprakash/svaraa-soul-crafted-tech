CREATE TABLE public.waitlist_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 20),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.waitlist_leads TO anon;
GRANT INSERT ON public.waitlist_leads TO authenticated;
GRANT ALL ON public.waitlist_leads TO service_role;

ALTER TABLE public.waitlist_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
ON public.waitlist_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 2 AND 100
  AND char_length(phone) BETWEEN 7 AND 20
  AND char_length(email) BETWEEN 5 AND 255
);