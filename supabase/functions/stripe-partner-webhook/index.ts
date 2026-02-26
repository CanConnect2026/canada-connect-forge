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

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
    const sig = req.headers.get("stripe-signature");
    if (!sig) throw new Error("No stripe-signature header");

    const body = await req.text();
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");

    const event = await stripe.webhooks.constructEventAsync(body, sig, webhookSecret);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    console.log(`[WEBHOOK] Event: ${event.type}`);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const applicationId = session.metadata?.application_id;
        const customerId = session.customer as string;

        if (applicationId) {
          // Get the subscription details
          const subscriptionId = session.subscription as string;
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          await supabase
            .from("business_partner_applications")
            .update({
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              payment_status: "paid",
              status: "active",
              is_visible: true,
              subscription_start_date: new Date(subscription.current_period_start * 1000).toISOString(),
              subscription_renewal_date: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq("id", applicationId);

          console.log(`[WEBHOOK] Application ${applicationId} activated`);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        await supabase
          .from("business_partner_applications")
          .update({ payment_status: "failed" })
          .eq("stripe_customer_id", customerId);

        console.log(`[WEBHOOK] Payment failed for customer ${customerId}`);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        await supabase
          .from("business_partner_applications")
          .update({
            status: "cancelled",
            payment_status: "cancelled",
            is_visible: false,
          })
          .eq("stripe_customer_id", customerId);

        console.log(`[WEBHOOK] Subscription cancelled for customer ${customerId}`);
        break;
      }

      case "invoice.payment_succeeded": {
        // Handle renewal
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        const subscriptionId = invoice.subscription as string;

        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          await supabase
            .from("business_partner_applications")
            .update({
              payment_status: "paid",
              status: "active",
              is_visible: true,
              subscription_renewal_date: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq("stripe_customer_id", customerId);
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[WEBHOOK] Error: ${msg}`);
    return new Response(JSON.stringify({ error: msg }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
