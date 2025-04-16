
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export type PlanTier = 'free' | 'basic' | 'pro';

interface PlanDetails {
  name: string;
  price: number;
  description: string;
  countries: number;
  fallback: number;
}

export const PLAN_DETAILS: Record<PlanTier, PlanDetails> = {
  basic: {
    name: 'Basic Plan',
    price: 10,
    description: 'Unlock 2 countries and PDF downloads',
    countries: 2,
    fallback: 1
  },
  pro: {
    name: 'Pro Plan',
    price: 25,
    description: 'Unlock 5 countries with extended features',
    countries: 5,
    fallback: 2
  },
  free: {
    name: 'Free Tier',
    price: 0,
    description: 'Preview 1 country (read-only)',
    countries: 1,
    fallback: 0
  }
};

export const initiatePayment = async (tier: PlanTier) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-payment', {
      body: { tier }
    });

    if (error) {
      console.error('Payment initiation error:', error);
      toast({
        title: 'Payment Error',
        description: error.message || 'Failed to initiate payment',
        variant: 'destructive'
      });
      return null;
    }

    return data.url as string;
  } catch (err) {
    console.error('Payment error:', err);
    toast({
      title: 'Payment Error',
      description: 'An unexpected error occurred',
      variant: 'destructive'
    });
    return null;
  }
};

export const verifyPaymentSuccess = async (sessionId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('handle-payment-success', {
      body: { session_id: sessionId }
    });

    if (error) {
      console.error('Payment verification error:', error);
      toast({
        title: 'Verification Error',
        description: error.message || 'Failed to verify payment',
        variant: 'destructive'
      });
      return false;
    }

    return data.success as boolean;
  } catch (err) {
    console.error('Verification error:', err);
    toast({
      title: 'Verification Error',
      description: 'An unexpected error occurred',
      variant: 'destructive'
    });
    return false;
  }
};
