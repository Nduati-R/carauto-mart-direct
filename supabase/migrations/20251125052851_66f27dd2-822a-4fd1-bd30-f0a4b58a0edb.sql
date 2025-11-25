-- Create enum for payment status
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');

-- Create enum for installment plan status
CREATE TYPE public.installment_status AS ENUM ('active', 'completed', 'defaulted', 'cancelled');

-- Create installment_plans table
CREATE TABLE public.installment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_id TEXT NOT NULL,
  vehicle_name TEXT NOT NULL,
  total_amount DECIMAL(12, 2) NOT NULL,
  down_payment DECIMAL(12, 2) NOT NULL,
  remaining_amount DECIMAL(12, 2) NOT NULL,
  monthly_payment DECIMAL(12, 2) NOT NULL,
  number_of_months INTEGER NOT NULL,
  status installment_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create installment_payments table
CREATE TABLE public.installment_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  installment_plan_id UUID NOT NULL REFERENCES public.installment_plans(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  phone_number TEXT NOT NULL,
  mpesa_receipt_number TEXT,
  mpesa_transaction_id TEXT,
  checkout_request_id TEXT,
  status payment_status NOT NULL DEFAULT 'pending',
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.installment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installment_payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for installment_plans
CREATE POLICY "Users can view their own installment plans"
  ON public.installment_plans
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own installment plans"
  ON public.installment_plans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own installment plans"
  ON public.installment_plans
  FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for installment_payments
CREATE POLICY "Users can view their own payments"
  ON public.installment_payments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments"
  ON public.installment_payments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_installment_plans_user_id ON public.installment_plans(user_id);
CREATE INDEX idx_installment_plans_status ON public.installment_plans(status);
CREATE INDEX idx_installment_payments_plan_id ON public.installment_payments(installment_plan_id);
CREATE INDEX idx_installment_payments_user_id ON public.installment_payments(user_id);
CREATE INDEX idx_installment_payments_status ON public.installment_payments(status);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_installment_plans
  BEFORE UPDATE ON public.installment_plans
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_installment_payments
  BEFORE UPDATE ON public.installment_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();