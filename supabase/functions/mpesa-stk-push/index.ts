import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const INTASEND_BASE_URL = "https://payment.intasend.com";

const normalisePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return `254${digits.slice(1)}`;
  if (digits.length === 9) return `254${digits}`;
  throw new Error("Invalid phone number. Use format 07XXXXXXXX or 254XXXXXXXXX.");
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const secretKey = Deno.env.get("INTASEND_SECRET_KEY");
    if (!secretKey) throw new Error("INTASEND_SECRET_KEY is not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { action } = body;

    // --- Submit Order (initiate STK Push) ---
    if (action === "submit-order") {
      const { amount, donor_name, donor_email, phone_number, message } = body;

      if (!amount || !donor_name || !phone_number) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: amount, donor_name, phone_number" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const normalisedPhone = normalisePhone(phone_number);
      const invoiceId = crypto.randomUUID();

      // Save pending donation
      const { error: dbError } = await supabase.from("donations").insert({
        donor_name,
        donor_email: donor_email || null,
        phone_number: normalisedPhone,
        amount: parseFloat(amount),
        message: message || null,
        invoice_id: invoiceId,
        status: "pending",
        payment_gateway: "intasend",
      });

      if (dbError) {
        console.error("DB Insert Error:", dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      // Initiate M-Pesa STK Push via IntaSend
      const stkResponse = await fetch(`https://api.intasend.com/api/v1/payment/mpesa-stk-push/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`,
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          phone_number: normalisedPhone,
          currency: "KES",
          api_ref: invoiceId,
          narrative: `Donation from ${donor_name}`,
        }),
      });

      const stkText = await stkResponse.text();
      console.log("IntaSend STK Push raw response:", stkResponse.status, stkText);
      
      let stkData: any;
      try { stkData = JSON.parse(stkText); } catch { stkData = { raw: stkText }; }

      if (!stkResponse.ok || stkData.errors || (!stkData.id && !stkData.invoice)) {
        // Clean up pending record
        await supabase.from("donations").delete().eq("invoice_id", invoiceId);
        const errMsg =
          stkData?.errors?.detail || stkData?.detail || stkData?.message ||
          JSON.stringify(stkData) ||
          "Failed to initiate M-Pesa STK Push. Please try again.";
        console.error("STK Push failed:", errMsg);
        return new Response(
          JSON.stringify({ error: errMsg }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Update with IntaSend tracking ID
      const intasendInvoiceId = stkData?.invoice?.invoice_id || stkData?.id || invoiceId;
      await supabase
        .from("donations")
        .update({ invoice_id: intasendInvoiceId, intasend_tracking_id: stkData?.id || null })
        .eq("invoice_id", invoiceId);

      return new Response(
        JSON.stringify({
          success: true,
          invoice_id: intasendInvoiceId,
          message: "STK Push sent. Please check your phone and enter your M-Pesa PIN.",
          state: stkData?.invoice?.state || stkData?.state || "PENDING",
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Create Checkout (all payment methods) ---
    if (action === "create-checkout") {
      const { amount, donor_name, donor_email, phone_number, message } = body;

      if (!amount || !donor_name) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: amount, donor_name" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const invoiceId = crypto.randomUUID();
      const publishableKey = Deno.env.get("INTASEND_PUBLISHABLE_KEY");
      if (!publishableKey) throw new Error("INTASEND_PUBLISHABLE_KEY is not configured");

      // Save pending donation
      const { error: dbError } = await supabase.from("donations").insert({
        donor_name,
        donor_email: donor_email || null,
        phone_number: phone_number || null,
        amount: parseFloat(amount),
        message: message || null,
        invoice_id: invoiceId,
        status: "pending",
        payment_gateway: "intasend",
      });

      if (dbError) {
        console.error("DB Insert Error:", dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      // Create checkout via IntaSend API (uses publishable key auth)
      const checkoutResponse = await fetch("https://api.intasend.com/api/v1/checkout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-IntaSend-Public-API-Key": publishableKey,
        },
        body: JSON.stringify({
          public_key: publishableKey,
          amount: parseFloat(amount),
          currency: "KES",
          api_ref: invoiceId,
          first_name: donor_name.split(" ")[0],
          last_name: donor_name.split(" ").slice(1).join(" ") || "-",
          email: donor_email || undefined,
          phone_number: phone_number || undefined,
          comment: message || `Donation from ${donor_name}`,
          redirect_url: body.redirect_url || undefined,
        }),
      });

      const checkoutData = await checkoutResponse.json();
      console.log("IntaSend Checkout response:", JSON.stringify(checkoutData));

      if (!checkoutResponse.ok || !checkoutData.url) {
        await supabase.from("donations").delete().eq("invoice_id", invoiceId);
        const errMsg = checkoutData?.detail || checkoutData?.message || "Failed to create checkout session.";
        return new Response(
          JSON.stringify({ error: errMsg }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Update with IntaSend checkout ID
      await supabase
        .from("donations")
        .update({ intasend_tracking_id: checkoutData.id || null })
        .eq("invoice_id", invoiceId);

      return new Response(
        JSON.stringify({
          success: true,
          invoice_id: invoiceId,
          checkout_url: checkoutData.url,
          checkout_id: checkoutData.id,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // --- Check Status ---
    if (action === "check-status") {
      const { invoice_id } = body;
      if (!invoice_id) {
        return new Response(
          JSON.stringify({ error: "Missing invoice_id" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data, error } = await supabase
        .from("donations")
        .select("status")
        .eq("invoice_id", invoice_id)
        .single();

      if (error || !data) {
        return new Response(
          JSON.stringify({ error: "Donation not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ status: data.status }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Unknown action" }),
      { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("M-Pesa STK Error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
