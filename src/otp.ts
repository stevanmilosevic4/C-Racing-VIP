// Email verification codes for guest sign-in, sent via EmailJS
// (https://www.emailjs.com — free tier, no server needed).
//
// Configure in Vercel → Project → Settings → Environment Variables
// (and locally in .env.local):
//   VITE_EMAILJS_SERVICE_ID   — from EmailJS → Email Services
//   VITE_EMAILJS_TEMPLATE_ID  — from EmailJS → Email Templates
//   VITE_EMAILJS_PUBLIC_KEY   — from EmailJS → Account → General
//
// The template should use {{to_email}} as the recipient and include
// {{to_name}} and {{code}} in the body.
//
// While these are unset, guest sign-in skips verification (straight in),
// so the site keeps working before the email service is connected.

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

export const otpConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

export function makeCode(): string {
  const buf = new Uint32Array(1)
  crypto.getRandomValues(buf)
  return String(buf[0] % 1_000_000).padStart(6, '0')
}

export async function sendCode(toEmail: string, toName: string, code: string): Promise<boolean> {
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: { to_email: toEmail, to_name: toName, code },
      }),
    })
    return res.ok
  } catch {
    return false
  }
}
