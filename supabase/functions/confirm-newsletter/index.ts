import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing token" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find subscriber by token
    const { data: subscriber, error: fetchError } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("confirmation_token", token)
      .single();

    if (fetchError || !subscriber) {
      return new Response(JSON.stringify({ error: "invalid_token" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    if (subscriber.status === "confirmed") {
      return new Response(JSON.stringify({ status: "already_confirmed" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Confirm the subscriber
    const { error: updateError } = await supabase
      .from("newsletter_subscribers")
      .update({
        status: "confirmed",
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", subscriber.id);

    if (updateError) throw updateError;

    // Log welcome email (plug in email provider later)
    const name = subscriber.name || "there";
    console.log(`[EMAIL:USER] To: ${subscriber.email}`);
    console.log(`[EMAIL:USER] Subject: Welcome — we're so glad you're here 💛`);
    console.log(`[EMAIL:USER] Body:
Hi ${name},

You're officially part of the CanConnect community.

We know how overwhelming it can feel to navigate a new country — paperwork, services, programs, questions.

That's why we created this space.

Here's what you can expect:
• Clear, practical updates on immigration and settlement
• Community programs and opportunities
• Resources that are vetted and relevant
• Information that respects your time

Thank you for trusting us with your inbox.

This platform was built for immigrants, by immigrants — and you're now part of that story.

With care,
The CanConnect Team`);

    return new Response(JSON.stringify({ status: "confirmed" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error confirming newsletter:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
