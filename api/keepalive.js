// Daily keepalive ping so the free-tier Supabase project never pauses
// (it pauses after 7 days without API activity). Wired to a Vercel cron
// in vercel.json. Uses the same env vars the frontend build uses.

export default async function handler(req, res) {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return res.status(501).json({ error: 'supabase not configured' })
  try {
    const r = await fetch(`${url}/rest/v1/app_state?select=key&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    })
    return res.status(200).json({ ok: r.ok, status: r.status, at: new Date().toISOString() })
  } catch (e) {
    return res.status(502).json({ ok: false, error: String(e).slice(0, 200) })
  }
}
