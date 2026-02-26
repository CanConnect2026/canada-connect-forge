import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    console.log(`[CUSTOMER-PORTAL] User authenticated: ${user.email}`);

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Find stripe customer by email
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    // Also check if there's a partner application with a stripe_customer_id
    let customerId: string | undefined;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    } else {
      // Try looking up via the business_partner_applications table
      const { data: app } = await supabaseClient
        .from("business_partner_applications")
        .select("stripe_customer_id")
        .eq("email", user.email)
        .not("stripe_customer_id", "is", null)
        .limit(1)
        .single();

      if (app?.stripe_customer_id) {
        customerId = app.stripe_customer_id;
      }
    }

    if (!customerId) {
      throw new Error("No Stripe customer found. You may not have an active subscription.");
    }

    console.log(`[CUSTOMER-PORTAL] Found Stripe customer: ${customerId}`);

    const origin = req.headers.get("origin") || "https://canada-connect-forge.lovable.app";
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/partner-success`,
    });

    console.log(`[CUSTOMER-PORTAL] Portal session created: ${portalSession.id}`);

    return new Response(JSON.stringify({ url: portalSession.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[CUSTOMER-PORTAL] Error: ${errorMessage}`);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
