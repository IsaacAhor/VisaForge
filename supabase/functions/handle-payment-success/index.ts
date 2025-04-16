
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.1.1';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TIER_CONFIG = {
  'basic': {
    currentCountries: 2,
    fallbackCountries: 1
  },
  'pro': {
    currentCountries: 5,
    fallbackCountries: 2
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get session ID from request
    const { session_id } = await req.json();
    
    if (!session_id) {
      return new Response(JSON.stringify({ error: 'Session ID is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });
    
    // Get session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (!session || session.payment_status !== 'paid') {
      return new Response(JSON.stringify({ error: 'Payment not completed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Extract user ID and tier from session metadata
    const userId = session.metadata?.user_id;
    const tier = session.metadata?.tier;
    
    if (!userId || !tier) {
      return new Response(JSON.stringify({ error: 'Invalid session metadata' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Initialize Supabase admin client to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );
    
    // Update payment record to completed
    await supabaseAdmin
      .from('payments')
      .update({ 
        status: 'completed',
        stripe_payment_id: session.payment_intent,
        updated_at: new Date().toISOString()
      })
      .eq('stripe_session_id', session_id);
    
    // Update user profile with new tier
    const tierConfig = TIER_CONFIG[tier];
    
    await supabaseAdmin
      .from('profiles')
      .update({ 
        tier: tier,
        current_countries: tierConfig.currentCountries,
        fallback_countries: tierConfig.fallbackCountries,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);
    
    return new Response(JSON.stringify({ 
      success: true,
      tier: tier,
      currentCountries: tierConfig.currentCountries,
      fallbackCountries: tierConfig.fallbackCountries
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
