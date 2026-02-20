-- Migration: Update donations table from PesaPal to IntaSend (generic payment gateway)
-- Renames pesapal-specific columns to generic ones, drops the redundant tracking ID column.

-- Step 1: Add the new generic invoice_id column
ALTER TABLE public.donations
    ADD COLUMN IF NOT EXISTS invoice_id TEXT UNIQUE;

-- Step 2: Migrate any existing data (copy old reference into new column)
UPDATE public.donations
SET invoice_id = pesapal_merchant_reference
WHERE invoice_id IS NULL AND pesapal_merchant_reference IS NOT NULL;

-- Step 3: Drop old pesapal-specific columns
ALTER TABLE public.donations
    DROP COLUMN IF EXISTS pesapal_order_tracking_id,
    DROP COLUMN IF EXISTS pesapal_merchant_reference;

-- Step 4: Add a phone_number column (required for M-Pesa STK Push)
ALTER TABLE public.donations
    ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- Step 5: Add a payment_gateway column to track which gateway was used
ALTER TABLE public.donations
    ADD COLUMN IF NOT EXISTS payment_gateway TEXT DEFAULT 'intasend';
