import { supabase } from "@/integrations/supabase/client";

interface NotificationData {
  type: string;
  data: Record<string, string | undefined>;
}

export async function sendNotification(payload: NotificationData): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke("send-notification", {
      body: payload,
    });
    if (error) {
      console.error("Notification error:", error);
    }
  } catch (err) {
    // Fire-and-forget — don't block the UI
    console.error("Failed to send notification:", err);
  }
}
