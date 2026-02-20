import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Standard CORS headers for all responses
    const setCors = () => {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
        );
    };

    setCors();

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    try {
        const { body, query, method } = req;
        const action = body?.path || query?.path;

        // --- Health check / diagnostics ---
        if (method === "GET") {
            return res.status(200).json({
                status: "ok",
                message: "IntaSend API is reachable",
                diagnostics: {
                    hasPublishableKey: !!process.env.INTASEND_PUBLISHABLE_KEY,
                    hasSecretKey: !!process.env.INTASEND_SECRET_KEY,
                    isSandbox: process.env.INTASEND_IS_SANDBOX === "true",
                    hasSupabaseUrl: !!process.env.SUPABASE_URL,
                    hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
                    nodeVersion: process.version,
                },
            });
        }

        // --- Supabase client ---
        const supabaseUrl = process.env.SUPABASE_URL || "";
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

        if (!supabaseUrl || !supabaseKey) {
            throw new Error("Missing Supabase configuration (URL or Service Role Key)");
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // --- IntaSend helpers ---
        const getIntaSendBaseUrl = () => {
            const isSandbox = process.env.INTASEND_IS_SANDBOX === "true";
            return isSandbox
                ? "https://sandbox.intasend.com"
                : "https://payment.intasend.com";
        };

        const getAuthHeaders = () => {
            const secretKey = process.env.INTASEND_SECRET_KEY;
            if (!secretKey) throw new Error("Missing INTASEND_SECRET_KEY environment variable");
            return {
                "Content-Type": "application/json",
                Authorization: `Bearer ${secretKey}`,
            };
        };

        // Normalise phone number to 254XXXXXXXXX format
        const normalisePhone = (phone: string): string => {
            const digits = phone.replace(/\D/g, "");
            if (digits.startsWith("254") && digits.length === 12) return digits;
            if (digits.startsWith("0") && digits.length === 10) return `254${digits.slice(1)}`;
            if (digits.length === 9) return `254${digits}`;
            throw new Error(
                "Invalid phone number. Use format 07XXXXXXXX or 254XXXXXXXXX."
            );
        };

        // --- Action: submit-order (initiate STK Push) ---
        if (action === "submit-order") {
            const { amount, donor_name, donor_email, phone_number, message } = body;

            if (!amount || !donor_name || !phone_number) {
                return res.status(400).json({
                    error: "Missing required fields: amount, donor_name, phone_number",
                });
            }

            const normalisedPhone = normalisePhone(phone_number);
            const invoiceId = crypto.randomUUID();
            const baseUrl = getIntaSendBaseUrl();

            // Save to Supabase as pending before calling IntaSend
            const { error: dbError } = await (supabase.from("donations") as any).insert({
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
            const stkPayload = {
                amount: parseFloat(amount),
                phone_number: normalisedPhone,
                currency: "KES",
                api_ref: invoiceId,
                narrative: `Donation from ${donor_name}`,
            };

            const stkResponse = await fetch(`${baseUrl}/api/v1/payment/mpesa-stk-push/`, {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(stkPayload),
            });

            const stkData = await stkResponse.json();
            console.log("IntaSend STK Push response:", JSON.stringify(stkData));

            if (!stkResponse.ok || stkData.errors || (!stkData.id && !stkData.invoice)) {
                console.error("STK Push error:", stkData);
                // Clean up the pending record on failure
                await (supabase.from("donations") as any)
                    .delete()
                    .eq("invoice_id", invoiceId);

                const errMsg =
                    stkData?.errors?.detail ||
                    stkData?.detail ||
                    stkData?.message ||
                    "Failed to initiate M-Pesa STK Push. Please try again.";
                return res.status(400).json({ error: errMsg });
            }

            // Update row with the IntaSend-assigned invoice/tracking ID
            const intasendInvoiceId =
                stkData?.invoice?.invoice_id || stkData?.id || invoiceId;

            await (supabase.from("donations") as any)
                .update({ invoice_id: intasendInvoiceId })
                .eq("invoice_id", invoiceId);

            return res.status(200).json({
                success: true,
                invoice_id: intasendInvoiceId,
                message: "STK Push sent. Please check your phone and enter your M-Pesa PIN.",
                state: stkData?.invoice?.state || stkData?.state || "PENDING",
            });
        }

        // --- Action: check-status (poll payment status) ---
        if (action === "check-status") {
            const { invoice_id } = body;

            if (!invoice_id) {
                return res.status(400).json({ error: "Missing invoice_id" });
            }

            const { data, error } = await (supabase.from("donations") as any)
                .select("status")
                .eq("invoice_id", invoice_id)
                .single();

            if (error || !data) {
                return res.status(404).json({ error: "Donation not found" });
            }

            return res.status(200).json({ status: data.status });
        }

        // --- Action: webhook (IntaSend payment notification) ---
        if (action === "webhook" || req.url?.includes("webhook")) {
            // Verify the webhook challenge secret to ensure this is from IntaSend
            const expectedChallenge = process.env.INTASEND_WEBHOOK_CHALLENGE;
            const receivedChallenge =
                req.headers["x-intasend-signature"] ||
                req.headers["x-webhook-challenge"] ||
                body?.challenge;

            if (expectedChallenge && receivedChallenge !== expectedChallenge) {
                console.warn("Webhook challenge mismatch — ignoring request");
                return res.status(401).json({ error: "Unauthorized" });
            }

            const payload = body;
            console.log("IntaSend webhook received:", JSON.stringify(payload));

            // IntaSend webhook payload shape (simplified):
            // { invoice: { invoice_id, state }, ... }
            const invoiceId =
                payload?.invoice?.invoice_id ||
                payload?.invoice_id ||
                payload?.api_ref;

            const state =
                payload?.invoice?.state ||
                payload?.state;

            if (invoiceId && state === "COMPLETE") {
                const { error: updateError } = await (supabase.from("donations") as any)
                    .update({ status: "completed" })
                    .eq("invoice_id", invoiceId);

                if (updateError) {
                    console.error("DB Update Error:", updateError);
                }
            } else if (invoiceId && (state === "FAILED" || state === "CANCELLED")) {
                await (supabase.from("donations") as any)
                    .update({ status: "failed" })
                    .eq("invoice_id", invoiceId);
            }

            // IntaSend expects a 200 response to acknowledge the webhook
            return res.status(200).json({ status: "received" });
        }

        return res.status(404).json({ error: `Unknown action: ${action}` });

    } catch (error: any) {
        console.error("IntaSend API Error:", error);
        setCors();

        let message = error.message || "Internal Server Error";

        if (message.includes("fetch failed") || error.code === "ECONNREFUSED") {
            message = "Network error: Could not reach IntaSend. Please check your environment variables.";
        }

        return res.status(500).json({
            error: message,
            details: process.env.NODE_ENV !== "production" ? error.stack : undefined,
        });
    }
}
