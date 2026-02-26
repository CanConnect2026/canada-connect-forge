
ALTER TABLE public.business_partner_applications
  ADD COLUMN stripe_customer_id text,
  ADD COLUMN stripe_subscription_id text,
  ADD COLUMN subscription_start_date timestamp with time zone,
  ADD COLUMN subscription_renewal_date timestamp with time zone,
  ADD COLUMN is_visible boolean NOT NULL DEFAULT false;

-- Update payment_status to have more granular values
-- Current default is 'unpaid', we'll keep that and add new statuses via application logic
