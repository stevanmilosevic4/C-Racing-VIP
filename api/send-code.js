// Vercel serverless function: emails a 6-digit sign-in code via Resend,
// from the verified weareconstructor.com domain. Stateless verification:
// we return an HMAC token binding (email, code, expiry); /api/verify-code
// checks it. The code itself never reaches the browser.
//
// Requires the RESEND_API_KEY environment variable (Vercel → Settings →
// Environment Variables). Without it this responds 501 and the app falls
// back to direct sign-in.

import { createHmac, randomInt } from 'node:crypto'

const FROM = 'Constructor Racing · A2RL Imola <a2rl@weareconstructor.com>'
const REPLY_TO = 'autonomousracing@constructor.org'
const TTL_MS = 10 * 60 * 1000

export function sign(email, code, expires, secret) {
  return createHmac('sha256', secret).update(`${email.toLowerCase().trim()}|${code}|${expires}`).digest('hex')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' })
  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(501).json({ error: 'email not configured' })

  const { email, name } = req.body ?? {}
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'invalid email' })
  }
  const safeName = (typeof name === 'string' ? name : '').trim().slice(0, 80) || 'there'

  const code = String(randomInt(0, 1_000_000)).padStart(6, '0')
  const expires = Date.now() + TTL_MS
  const token = sign(email, code, expires, process.env.OTP_SECRET || key)

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [email.trim()],
      reply_to: REPLY_TO,
      subject: `${code} is your A2RL Imola sign-in code`,
      html: `
        <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:480px;margin:0 auto;padding:8px">
          <div style="background:#0a1733;border-radius:14px;padding:28px;color:#fff;text-align:center">
            <div style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#7fb7ff;font-weight:700">Constructor × A2RL · Imola</div>
            <p style="color:rgba(255,255,255,.8);margin:18px 0 6px">Hi ${safeName.replace(/[<>&]/g, '')}, your sign-in code is</p>
            <div style="font-size:40px;font-weight:900;letter-spacing:.18em;margin:6px 0 10px">${code}</div>
            <p style="color:rgba(255,255,255,.55);font-size:13px;margin:0">Valid for 10 minutes. If you didn't request it, ignore this email.</p>
          </div>
          <p style="color:#8a94a6;font-size:12px;text-align:center;margin-top:14px">Constructor Racing · the A2RL Imola Series · a2rl.weareconstructor.com</p>
        </div>`,
    }),
  })

  if (!send.ok) {
    const detail = await send.text().catch(() => '')
    console.error('resend error', send.status, detail)
    return res.status(502).json({ error: 'send failed' })
  }
  return res.status(200).json({ token, expires })
}
