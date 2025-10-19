const base = () =>
  process.env.PAYPAL_MODE === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const client = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;
  const b64 = Buffer.from(client + ':' + secret).toString('base64');
  const res = await fetch(base() + '/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + b64,
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('PayPal token failed: ' + res.status);
  const j: any = await res.json();
  return j.access_token as string;
}

export async function createOrder(totalCents: number, currency: string, description: string) {
  const token = await getAccessToken();
  const res = await fetch(base() + '/v2/checkout/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [{ amount: { currency_code: currency, value: (totalCents / 100).toFixed(2) }, description }],
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Create order failed: ' + res.status);
  const j: any = await res.json();
  return j.id as string;
}

export async function captureOrder(orderId: string) {
  const token = await getAccessToken();
  const res = await fetch(base() + `/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Capture failed: ' + res.status);
  return (await res.json()) as any;
}

export async function verifyWebhookSignature(payload: any, headers: Record<string, string>) {
  const token = await getAccessToken();
  const body = {
    auth_algo: headers['paypal-auth-algo'],
    cert_url: headers['paypal-cert-url'],
    transmission_id: headers['paypal-transmission-id'],
    transmission_sig: headers['paypal-transmission-sig'],
    transmission_time: headers['paypal-transmission-time'],
    webhook_id: process.env.PAYPAL_WEBHOOK_ID,
    webhook_event: payload,
  };
  const res = await fetch(base() + '/v1/notifications/verify-webhook-signature', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Verify signature failed: ' + res.status);
  const j: any = await res.json();
  return j.verification_status === 'SUCCESS';
}
