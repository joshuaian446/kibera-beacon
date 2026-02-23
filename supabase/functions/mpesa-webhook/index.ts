import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload = await req.json();
    console.log("IntaSend webhook received:", JSON.stringify(payload));

    const invoiceId =
      payload?.invoice?.invoice_id || payload?.invoice_id || payload?.api_ref;
    const state = payload?.invoice?.state || payload?.state;

    if (invoiceId && state === "COMPLETE") {
      const { error } = await supabase
        .from("donations")
        .update({ status: "completed" })
        .eq("invoice_id", invoiceId);
      if (error) console.error("DB Update Error:", error);
    } else if (invoiceId && (state === "FAILED" || state === "CANCELLED")) {
      await supabase
        .from("donations")
        .update({ status: "failed" })
        .eq("invoice_id", invoiceId);
    }

    return new Response(
      JSON.stringify({ status: "received" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Webhook Error:", error);
    return new Response(
      JSON.stringify({ error: "Webhook processing failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
