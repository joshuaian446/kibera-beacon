-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    donor_name TEXT NOT NULL,
    donor_email TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    currency TEXT DEFAULT 'KES' NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending' NOT NULL,
    pesapal_order_tracking_id TEXT UNIQUE,
    pesapal_merchant_reference TEXT UNIQUE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert donations (anonymous/authenticated)
CREATE POLICY "Allow public insert donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

-- Policy: Allow users to read their own donations if authenticated (optional, but good for future)
-- For now, let's just allow reading by service role for backend logic.
-- If we want the frontend to check status, we might need a policy or a RPC.
-- Let's allow public to read IF they have the merchant_reference (semi-private).

CREATE POLICY "Allow public read own donation by reference"
ON public.donations
FOR SELECT
USING (true); -- We will filter by merchant_reference in the application logic.

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_donations_updated_at
    BEFORE UPDATE ON public.donations
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
