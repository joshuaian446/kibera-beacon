import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Standard CORS headers for all responses
    const setCors = () => {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
        );
    };

    setCors();

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        return res.status(200).json({
            status: 'ok',
            message: 'Pesapal API is reachable',
            diagnostics: {
                hasConsumerKey: !!process.env.PESAPAL_CONSUMER_KEY,
                hasConsumerSecret: !!process.env.PESAPAL_CONSUMER_SECRET,
                hasBaseUrl: !!process.env.PESAPAL_BASE_URL,
                hasSiteUrl: !!process.env.SITE_URL,
                hasSupabaseUrl: !!process.env.SUPABASE_URL,
                hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
            }
        });
    }

    const { body, query } = req;
    const action = body?.path || query?.path;

    // --- Helpers ---

    async function getPesapalAuth() {
        const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
        const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;
        const baseUrl = process.env.PESAPAL_BASE_URL;

        if (!consumerKey || !consumerSecret || !baseUrl) {
            throw new Error('Missing Pesapal configuration in Environment Variables');
        }

        const response = await fetch(`${baseUrl}/api/Auth/RequestToken`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ consumer_key: consumerKey, consumer_secret: consumerSecret })
        });

        const data = await response.json();
        if (data.error || !data.token) throw new Error(data.message || 'Pesapal Auth Failed');
        return data.token;
    }

    async function registerIpn(token: string) {
        const baseUrl = process.env.PESAPAL_BASE_URL;
        const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, ''); // Remove trailing slash
        const ipnUrl = `${siteUrl}/api/pesapal?path=ipn`;

        const response = await fetch(`${baseUrl}/api/URLRegister/RegisterIPN`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                url: ipnUrl,
                ipn_notification_type: 'POST'
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.message || 'IPN Registration Failed');
        return data.ipn_id;
    }

    // --- Handlers ---

    try {
        if (action === 'submit-order') {
            const { amount, donor_name, donor_email, message } = body;
            const token = await getPesapalAuth();
            const ipnId = await registerIpn(token);
            const baseUrl = process.env.PESAPAL_BASE_URL;
            const merchantReference = crypto.randomUUID();

            // Save to DB
            const { error: dbError } = await (supabase.from('donations') as any).insert({
                donor_name,
                donor_email,
                amount,
                message,
                pesapal_merchant_reference: merchantReference,
                status: 'pending'
            });

            if (dbError) throw dbError;

            const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');
            const payload = {
                id: merchantReference,
                currency: 'KES',
                amount: amount,
                description: `Donation from ${donor_name}`,
                callback_url: `${siteUrl}/thank-you?merchant_reference=${merchantReference}`,
                notification_id: ipnId,
                billing_address: {
                    email_address: donor_email,
                    first_name: donor_name.split(' ')[0],
                    last_name: donor_name.split(' ').slice(1).join(' ') || ''
                }
            };

            const response = await fetch(`${baseUrl}/api/Transactions/SubmitOrderRequest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!data.order_tracking_id) {
                throw new Error(data.message || 'Failed to get order tracking ID from Pesapal');
            }

            // Update DB with order_tracking_id
            await (supabase.from('donations') as any)
                .update({ pesapal_order_tracking_id: data.order_tracking_id })
                .eq('pesapal_merchant_reference', merchantReference);

            return res.status(200).json(data);
        }

        if (action === 'ipn') {
            const { OrderTrackingId, MerchantReference, EventType } = body;

            if (EventType === 'TRANSACTION_COMPLETED') {
                const token = await getPesapalAuth();
                const baseUrl = process.env.PESAPAL_BASE_URL;

                const response = await fetch(`${baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data.payment_status_description === 'Completed') {
                    await (supabase.from('donations') as any)
                        .update({ status: 'completed' })
                        .eq('pesapal_merchant_reference', MerchantReference);
                }
            }

            return res.status(200).json({ status: 'received' });
        }

        return res.status(404).send('Not Found');
    } catch (error: any) {
        console.error('Pesapal API Error:', error);
        setCors();

        let message = error.message || 'Internal Server Error';

        // Specific check for SSL issues common in sandbox environments
        if (error.code === 'CERT_HAS_EXPIRED' || message.includes('certificate has expired')) {
            message = "Pesapal Sandbox SSL Certificate has expired. Please update PESAPAL_BASE_URL to 'https://cybqa.pesapal.com/pesapalv3' in Vercel settings.";
        } else if (message.includes('fetch failed')) {
            message = "Network error: Failed to reach Pesapal. Please check your PESAPAL_BASE_URL.";
        }

        return res.status(error.status || 500).json({
            error: message,
            diagnostics: {
                errorCode: error.code,
                baseUrl: process.env.PESAPAL_BASE_URL
            }
        });
    }
}
