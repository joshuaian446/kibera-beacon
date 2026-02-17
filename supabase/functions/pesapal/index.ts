import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const url = new URL(req.url)
  const path = url.pathname.split('/').pop()

  // --- Helpers ---

  async function getPesapalAuth() {
    const consumerKey = Deno.env.get('PESAPAL_CONSUMER_KEY')
    const consumerSecret = Deno.env.get('PESAPAL_CONSUMER_SECRET')
    const baseUrl = Deno.env.get('PESAPAL_BASE_URL') // https://cybqa.pesapal.com/pesapalv3

    const response = await fetch(`${baseUrl}/api/Auth/RequestToken`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consumer_key: consumerKey, consumer_secret: consumerSecret })
    })

    const data = await response.json()
    if (data.error) throw new Error(data.error.message || 'Pesapal Auth Failed')
    return data.token
  }

  async function registerIpn(token: string) {
    const baseUrl = Deno.env.get('PESAPAL_BASE_URL')
    const ipnUrl = Deno.env.get('SITE_URL') + '/functions/v1/pesapal/ipn'

    // First, check if IPNs are already registered (optional, let's just register every time for simplicity or store it)
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
    })

    const data = await response.json()
    return data.ipn_id
  }

  // --- Handlers ---

  if (path === 'submit-order') {
    try {
      const { amount, donor_name, donor_email, message } = await req.json()
      const token = await getPesapalAuth()
      const ipnId = await registerIpn(token)
      const baseUrl = Deno.env.get('PESAPAL_BASE_URL')
      const merchantReference = crypto.randomUUID()

      // Save to DB first
      const { error: dbError } = await supabase.from('donations').insert({
        donor_name,
        donor_email,
        amount,
        message,
        pesapal_merchant_reference: merchantReference,
        status: 'pending'
      })

      if (dbError) throw dbError

      const payload = {
        id: merchantReference,
        currency: 'KES',
        amount: amount,
        description: `Donation from ${donor_name}`,
        callback_url: `${Deno.env.get('SITE_URL')}/thank-you?merchant_reference=${merchantReference}`,
        notification_id: ipnId,
        billing_address: {
          email_address: donor_email,
          first_name: donor_name.split(' ')[0],
          last_name: donor_name.split(' ').slice(1).join(' ') || ''
        }
      }

      const response = await fetch(`${baseUrl}/api/Transactions/SubmitOrderRequest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      
      // Update DB with order_tracking_id
      await supabase.from('donations')
        .update({ pesapal_order_tracking_id: data.order_tracking_id })
        .eq('pesapal_merchant_reference', merchantReference)

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }
  }

  if (path === 'ipn') {
    try {
      const { OrderTrackingId, MerchantReference, EventType } = await req.json()
      
      if (EventType === 'TRANSACTION_COMPLETED') {
        const token = await getPesapalAuth()
        const baseUrl = Deno.env.get('PESAPAL_BASE_URL')

        // Verify status with Pesapal
        const response = await fetch(`${baseUrl}/api/Transactions/GetTransactionStatus?orderTrackingId=${OrderTrackingId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()

        if (data.payment_status_description === 'Completed') {
          await supabase.from('donations')
            .update({ status: 'completed' })
            .eq('pesapal_merchant_reference', MerchantReference)
        }
      }

      return new Response(JSON.stringify({ status: 'received' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    } catch (error) {
      console.error('IPN Error:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      })
    }
  }

  return new Response("Not Found", { status: 404 })
})
