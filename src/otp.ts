// Email sign-in codes, sent by our Vercel serverless function
// (/api/send-code) via Resend, from a2rl@weareconstructor.com.
// The code never reaches the browser: the server returns a signed
// token, and /api/verify-code checks code+token together.
//
// If the backend isn't available (local dev, or RESEND_API_KEY not set
// on Vercel), sign-in falls back to direct entry so nobody gets locked out.

export type SendResult =
  | { status: 'sent'; token: string; expires: number }
  | { status: 'unconfigured' }
  | { status: 'error' }

export async function requestCode(email: string, name: string): Promise<SendResult> {
  try {
    const res = await fetch('/api/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name }),
    })
    if (res.status === 404 || res.status === 501) return { status: 'unconfigured' }
    if (!res.ok) return { status: 'error' }
    const { token, expires } = await res.json()
    return { status: 'sent', token, expires }
  } catch {
    return { status: 'unconfigured' } // no backend reachable (e.g. local dev)
  }
}

export async function verifyCode(email: string, code: string, token: string, expires: number): Promise<'ok' | 'wrong' | 'expired' | 'error'> {
  try {
    const res = await fetch('/api/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, token, expires }),
    })
    if (res.ok) return 'ok'
    if (res.status === 401) return 'wrong'
    if (res.status === 410) return 'expired'
    return 'error'
  } catch {
    return 'error'
  }
}
