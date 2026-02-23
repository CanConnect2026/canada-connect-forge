import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.3";
import { Resend } from "npm:resend@6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ADMIN_EMAIL = "admin@canconnect.ca";
const FROM_EMAIL = "CanConnect <noreply@canconnect.ca>";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface EmailPayload {
  type: string;
  data: Record<string, string | undefined>;
}

// ── HubSpot helper ──────────────────────────────────────────────────────
async function syncToHubSpot(email: string, firstName?: string): Promise<void> {
  const token = Deno.env.get("HUBSPOT_ACCESS_TOKEN");
  if (!token) {
    console.warn("[HubSpot] HUBSPOT_ACCESS_TOKEN not configured, skipping sync");
    return;
  }

  const properties: Record<string, string> = { email };
  if (firstName) properties.firstname = firstName;

  const createRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) {
    console.log("[HubSpot] Contact created:", email);
    return;
  }

  const createBody = await createRes.json();

  if (createRes.status === 409) {
    const existingId = createBody?.message?.match(/Existing ID: (\d+)/)?.[1];
    if (existingId) {
      const updateRes = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ properties }),
      });
      const updateBody = await updateRes.text();
      if (updateRes.ok) {
        console.log("[HubSpot] Contact updated:", email);
      } else {
        console.error("[HubSpot] Failed to update contact:", updateRes.status, updateBody);
      }
    } else {
      console.warn("[HubSpot] Contact exists but couldn't extract ID:", JSON.stringify(createBody));
    }
    return;
  }

  console.error("[HubSpot] Failed to create contact:", createRes.status, JSON.stringify(createBody));
}

// ── Send email via Resend ───────────────────────────────────────────────
async function sendEmail(to: string, subject: string, body: string): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    // Convert plain text body to simple HTML
    const html = body
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .split("\n")
      .map(line => line.trim() === "" ? "<br>" : `<p style="margin:0 0 4px 0;">${line}</p>`)
      .join("");

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.6;">${html}</div>`,
    });

    if (error) {
      console.error("[Resend] Error:", error);
      return { success: false, error: error.message };
    }

    console.log("[Resend] Email sent:", data?.id, "to:", to);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[Resend] Exception:", err);
    return { success: false, error: String(err) };
  }
}

// ── Email templates ─────────────────────────────────────────────────────

function getUserEmail(type: string, data: Record<string, string | undefined>): { subject: string; body: string } | null {
  const name = data.first_name || "there";

  switch (type) {
    case "newsletter_confirmation":
      return {
        subject: "One more step to join CanConnect 💛",
        body: `Hi ${name},\n\nThank you for signing up.\n\nBefore we start sending you updates, we just need you to confirm your email address.\n\nClick the link below to complete your subscription:\n\n[Confirm My Subscription]\n\nCanConnect was created to make it easier for immigrants and newcomers to find trusted services, programs, and community support across Ontario.\n\nWe're building this together — and we're grateful you're here.\n\nIf you didn't request this, you can safely ignore this email.\n\nWarmly,\nThe CanConnect Team`,
      };
    case "add_service":
      return {
        subject: "We've received your service submission",
        body: `Hi ${name},\n\nThank you for submitting your organization to CanConnect.\n\nOur team will review your listing to ensure everything is accurate and aligned with our guidelines. If we need any clarification, we'll reach out.\n\nOnce approved, your service will be published in the directory.\n\nWe appreciate the work you're doing to support newcomers in Ontario.\n\nWarmly,\nThe CanConnect Team`,
      };
    case "add_event":
      return {
        subject: "Your event has been submitted",
        body: `Hi ${name},\n\nThank you for submitting your event to CanConnect.\n\nOur team may review the details before publishing. If anything is needed, we'll reach out.\n\nWe're grateful you're helping keep the community informed and connected.\n\nWarmly,\nThe CanConnect Team`,
      };
    case "get_involved":
      return {
        subject: "Thanks for your interest in getting involved",
        body: `Hi ${name},\n\nThank you for reaching out and expressing interest in getting involved with CanConnect.\n\nWe're building this platform in collaboration with community members, partners, and organizations. A member of our team will review your message and follow up shortly.\n\nWe appreciate your willingness to contribute.\n\nWarmly,\nThe CanConnect Team`,
      };
    case "advertise":
      return {
        subject: "We've received your advertising inquiry",
        body: `Hi ${name},\n\nThank you for your interest in advertising with CanConnect.\n\nOur team will review your inquiry and follow up with next steps, including available options and pricing.\n\nWe appreciate your interest in supporting newcomer communities across Ontario.\n\nWarmly,\nThe CanConnect Team`,
      };
    case "contact":
      return {
        subject: "We've received your message",
        body: `Hi ${name},\n\nThank you for contacting CanConnect.\n\nWe've received your message and a member of our team will respond as soon as possible.\n\nWe appreciate you taking the time to reach out.\n\nWarmly,\nThe CanConnect Team`,
      };
    case "report_issue":
      return {
        subject: "Thank you for reporting this",
        body: `Hi ${name},\n\nThank you for flagging this issue.\n\nOur team will review it promptly to ensure the platform remains accurate and trustworthy.\n\nWe appreciate your help in keeping CanConnect reliable for the community.\n\nWarmly,\nThe CanConnect Team`,
      };
    default:
      return null;
  }
}

function getAdminEmail(type: string, data: Record<string, string | undefined>): { subject: string; body: string } | null {
  switch (type) {
    case "add_service":
      return {
        subject: "New Service Submission Pending Review",
        body: `A new service listing has been submitted.\n\nOrganization Name: ${data.organization_name || "N/A"}\nSubmitted By: ${data.first_name || "N/A"}\nEmail: ${data.email || "N/A"}\n\nPlease log in to review and approve the submission.`,
      };
    case "add_event":
      return {
        subject: "New Event Submission",
        body: `A new event has been submitted to the platform.\n\nEvent Name: ${data.event_name || "N/A"}\nOrganization: ${data.organization_name || "N/A"}\nDate: ${data.event_date || "N/A"}\nSubmitted By: ${data.first_name || "N/A"}\n\nPlease review and publish according to moderation settings.`,
      };
    case "get_involved":
      return {
        subject: "New Get Involved Submission",
        body: `A new "Get Involved" inquiry has been received.\n\nName: ${data.first_name || "N/A"}\nEmail: ${data.email || "N/A"}\nDetails: ${data.message || "N/A"}\n\nPlease review and follow up.`,
      };
    case "advertise":
      return {
        subject: "New Advertising Inquiry",
        body: `A new advertising request has been submitted.\n\nName: ${data.first_name || "N/A"}\nOrganization: ${data.organization_name || "N/A"}\nEmail: ${data.email || "N/A"}\nDetails: ${data.message || "N/A"}\n\nPlease review and respond.`,
      };
    case "contact":
      return {
        subject: "New Contact Form Submission",
        body: `A new message has been received via the Contact Us form.\n\nName: ${data.first_name || "N/A"}\nEmail: ${data.email || "N/A"}\nMessage: ${data.message || "N/A"}\n\nPlease review and respond.`,
      };
    case "report_issue":
      return {
        subject: "Issue Reported on Platform",
        body: `An issue has been reported.\n\nReported By: ${data.first_name || "Anonymous"}\nEmail: ${data.email || "Not provided"}\nDetails: ${data.issue_description || "N/A"}\nRelated Listing/Event: ${data.related_url || "N/A"}\n\nPlease review and take appropriate action.`,
      };
    default:
      return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data }: EmailPayload = await req.json();

    if (!type || !data) {
      throw new Error("Missing type or data");
    }

    const userEmail = getUserEmail(type, data);
    const adminEmail = getAdminEmail(type, data);

    const results: Record<string, unknown> = {};

    // ── Sync to HubSpot for newsletter signups ──
    if (type === "newsletter_confirmation" && data.email) {
      try {
        await syncToHubSpot(data.email, data.first_name);
        results.hubspot = { status: "synced" };
      } catch (err) {
        console.error("[HubSpot] Sync error:", err);
        results.hubspot = { status: "error", message: String(err) };
      }
    }

    // ── Send user email via Resend ──
    if (userEmail && data.email) {
      const result = await sendEmail(data.email, userEmail.subject, userEmail.body);
      results.user_email = { to: data.email, subject: userEmail.subject, ...result };
    }

    // ── Send admin email via Resend ──
    if (adminEmail) {
      const result = await sendEmail(ADMIN_EMAIL, adminEmail.subject, adminEmail.body);
      results.admin_email = { to: ADMIN_EMAIL, subject: adminEmail.subject, ...result };
    }

    return new Response(JSON.stringify({ success: true, results }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
