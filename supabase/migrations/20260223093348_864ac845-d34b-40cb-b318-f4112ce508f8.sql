
-- Create donations table for M-Pesa STK Push payments
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  phone_number TEXT,
  amount NUMERIC NOT NULL,
  message TEXT,
  invoice_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_gateway TEXT DEFAULT 'intasend',
  intasend_tracking_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Public insert policy (anyone can donate without auth)
CREATE POLICY "Anyone can create donations"
ON public.donations
FOR INSERT
WITH CHECK (true);

-- Public select policy (for checking donation status by invoice_id)
CREATE POLICY "Anyone can view donations by invoice_id"
ON public.donations
FOR SELECT
USING (true);

-- Service role can update (for webhook status updates)
CREATE POLICY "Service role can update donations"
ON public.donations
FOR UPDATE
USING (true);

-- Create index on invoice_id for quick lookups
CREATE INDEX idx_donations_invoice_id ON public.donations (invoice_id);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
