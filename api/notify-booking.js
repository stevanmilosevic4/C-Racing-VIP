// Vercel serverless function: emails garage-visit booking notifications to
// the racing inbox via Resend, from the verified weareconstructor.com domain.
// The booking itself is already saved in the backend before this is called —
// the email is a courtesy copy, so failures are non-fatal.

const FROM = 'Constructor Racing · A2RL Imola <a2rl@weareconstructor.com>'
const TO = 'autonomousracing@constructor.org'

const esc = (s) => String(s ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' })
  const key = process.env.RESEND_API_KEY
  if (!key) return res.status(501).json({ error: 'email not configured' })

  const b = req.body ?? {}
  if (typeof b.guest !== 'string' || !b.guest.trim() || typeof b.day !== 'string') {
    return res.status(400).json({ error: 'bad request' })
  }
  const cancelled = b.status === 'cancelled'
  const rows = [
    ['Guest', b.guest],
    ['Company', b.company || '—'],
    ['Email', b.email || '—'],
    ['Day', `${b.day} (${b.window || ''})`],
    ['People', String(b.people ?? '—')],
    ['Activities', Array.isArray(b.activities) && b.activities.length ? b.activities.join(' • ') : '—'],
    ['Note', b.note || '—'],
    ['Status', cancelled ? 'CANCELLED' : 'Requested'],
  ]

  const send = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: b.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) ? b.email : undefined,
      subject: `[A2RL Imola] Garage visit ${cancelled ? 'CANCELLED' : 'request'} — ${b.guest.trim()} · ${b.day}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `
        <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:520px">
          <h2 style="color:#0a1733;margin:0 0 4px">Garage visit ${cancelled ? '<span style="color:#e23026">cancelled</span>' : 'request'}</h2>
          <p style="color:#667;margin:0 0 14px;font-size:13px">Also visible live on the admin Visits board.</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px">
            ${rows.map(([k, v]) => `<tr><td style="padding:7px 12px 7px 0;color:#889;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:7px 0;font-weight:600;color:#0a1733">${esc(v)}</td></tr>`).join('')}
          </table>
        </div>`,
    }),
  })

  if (!send.ok) {
    console.error('resend booking notify error', send.status, await send.text().catch(() => ''))
    return res.status(502).json({ error: 'send failed' })
  }
  return res.status(200).json({ ok: true })
}
