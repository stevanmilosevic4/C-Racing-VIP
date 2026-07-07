// Vercel serverless function: verifies a sign-in code against the HMAC
// token issued by /api/send-code. Stateless — nothing stored server-side.

import { createHmac, timingSafeEqual } from 'node:crypto'

function sign(email, code, expires, secret) {
  return createHmac('sha256', secret).update(`${email.toLowerCase().trim()}|${code}|${expires}`).digest('hex')
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' })
  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(501).json({ error: 'email not configured' })

  const { email, code, token, expires } = req.body ?? {}
  if (typeof email !== 'string' || typeof code !== 'string' || typeof token !== 'string' || typeof expires !== 'number') {
    return res.status(400).json({ error: 'bad request' })
  }
  if (Date.now() > expires) return res.status(410).json({ error: 'expired' })

  const expected = sign(email, code.trim(), expires, process.env.OTP_SECRET || key)
  const a = Buffer.from(expected, 'hex')
  const b = Buffer.from(token, 'hex')
  const ok = a.length === b.length && timingSafeEqual(a, b)
  if (!ok) return res.status(401).json({ error: 'wrong code' })
  return res.status(200).json({ ok: true })
}
