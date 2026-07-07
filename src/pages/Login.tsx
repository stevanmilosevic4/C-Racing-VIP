import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import { requestCode, verifyCode } from '../otp'

const MAX_ATTEMPTS = 5
const RESEND_COOLDOWN_S = 30

export default function Login() {
  const { loginGuest, loginAdmin } = useAuth()
  const nav = useNavigate()
  const [mode, setMode] = useState<'guest' | 'verify' | 'code'>('guest')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [otp, setOtp] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const pending = useRef<{ token: string; expires: number; attempts: number } | null>(null)

  function startCooldown() {
    setCooldown(RESEND_COOLDOWN_S)
    const id = setInterval(() => setCooldown((c) => { if (c <= 1) { clearInterval(id); return 0 } return c - 1 }), 1000)
  }

  async function submitGuest(e: React.FormEvent) {
    e.preventDefault()
    const n = name.trim(), c = company.trim(), m = email.trim()
    if (!n) { setErr('Please enter your full name.'); return }
    if (!c) { setErr('Please enter your company.'); return }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) { setErr('Please enter a valid email address.'); return }

    setBusy(true)
    const sent = await requestCode(m, n)
    setBusy(false)
    if (sent.status === 'unconfigured') {
      // Email backend not live yet → sign straight in (pre-launch mode).
      const res = loginGuest({ name: n, company: c, email: m })
      if (!res.ok) { setErr(res.error ?? 'Sign-in failed'); return }
      nav('/')
      return
    }
    if (sent.status === 'error') { setErr('We couldn\'t send the email — check the address and try again.'); return }
    pending.current = { token: sent.token, expires: sent.expires, attempts: 0 }
    setOtp(''); setErr(null); setMode('verify'); startCooldown()
  }

  async function submitOtp(e: React.FormEvent) {
    e.preventDefault()
    const p = pending.current
    if (!p || Date.now() > p.expires) { setErr('That code has expired — send a new one.'); return }
    if (p.attempts >= MAX_ATTEMPTS) { setErr('Too many tries — send a new code.'); return }
    p.attempts++
    setBusy(true)
    const result = await verifyCode(email.trim(), otp.trim(), p.token, p.expires)
    setBusy(false)
    if (result === 'wrong') { setErr('That code doesn\'t match — check the email and try again.'); return }
    if (result === 'expired') { setErr('That code has expired — send a new one.'); return }
    if (result === 'error') { setErr('Something hiccuped — try again.'); return }
    pending.current = null
    const res = loginGuest({ name, company, email })
    if (!res.ok) { setErr(res.error ?? 'Sign-in failed'); return }
    nav('/')
  }

  async function resend() {
    if (cooldown > 0 || busy) return
    setBusy(true)
    const sent = await requestCode(email.trim(), name.trim())
    setBusy(false)
    if (sent.status !== 'sent') { setErr('Couldn\'t resend — try again in a moment.'); return }
    pending.current = { token: sent.token, expires: sent.expires, attempts: 0 }
    setErr(null); startCooldown()
  }

  function submitCode(e: React.FormEvent) {
    e.preventDefault()
    const res = loginAdmin(name, code)
    if (!res.ok) { setErr(res.error ?? 'Sign-in failed'); return }
    nav('/admin')
  }

  return (
    <div className="login-screen">
      <aside className="login-aside">
        <div className="brand" style={{ color: '#fff' }}>
          <Logo size={26} onDark />
          <small style={{ color: 'rgba(255,255,255,.55)', borderLeft: '1px solid rgba(255,255,255,.25)', paddingLeft: 12 }}>× A2RL</small>
        </div>
        <div>
          <div className="kick" style={{ color: '#1e9bf0', fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', fontSize: 12 }}>Private Crew · By Invitation</div>
          <h1 style={{ marginTop: 14 }}>Autonomous racing,<br />Imola → Abu Dhabi.</h1>
          <p className="lead">Your VIP home for the A2RL series — countdown, agenda, garage visits, the teams, and race day at the Autodromo Enzo e Dino Ferrari.</p>
          <div className="pills">
            <span className="pill">Testing · Jul & Aug</span>
            <span className="pill">Finals · 5 Sep</span>
            <span className="pill">Abu Dhabi · Oct</span>
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 13 }}>Constructing the future · constructor.org</div>
      </aside>

      <section className="login-main">
        <div className="login-box">
          <div className="private">● Members only</div>

          {mode === 'guest' && (
            <>
              <h2>Welcome to the crew.</h2>
              <p className="hint">Tell us who you are — we'll email you a sign-in code.</p>

              <form onSubmit={submitGuest}>
                {err && <div className="login-err">{err}</div>}
                <label className="field">
                  <span>Full name</span>
                  <input value={name} onChange={(e) => { setName(e.target.value); setErr(null) }} placeholder="e.g. Alex Rossi" autoFocus />
                </label>
                <label className="field">
                  <span>Company</span>
                  <input value={company} onChange={(e) => { setCompany(e.target.value); setErr(null) }} placeholder="e.g. Constructor Group" />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErr(null) }} placeholder="you@company.com" />
                </label>
                <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: 4 }} disabled={busy}>
                  {busy ? 'Sending…' : 'Enter'}
                </button>
              </form>

              <div className="demo-creds">
                Your details stay with the organising team only — they're used for gate lists, tour-guide
                planning and race-week updates.
              </div>

              <button className="login-alt" onClick={() => { setMode('code'); setErr(null) }}>
                I have an access code →
              </button>
            </>
          )}

          {mode === 'verify' && (
            <>
              <h2>Check your email.</h2>
              <p className="hint">We sent a 6-digit code to <b>{email.trim()}</b>. It's valid for 10 minutes.</p>

              <form onSubmit={submitOtp}>
                {err && <div className="login-err">{err}</div>}
                <label className="field">
                  <span>Sign-in code</span>
                  <input
                    value={otp}
                    onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '').slice(0, 6)); setErr(null) }}
                    placeholder="123456"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    autoFocus
                    style={{ letterSpacing: '.35em', fontWeight: 800, fontSize: 20, textAlign: 'center' }}
                  />
                </label>
                <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: 4 }} disabled={otp.length !== 6}>
                  Verify & enter
                </button>
              </form>

              <div className="demo-creds">
                Nothing arriving? Check your spam folder{cooldown > 0 ? ` — or resend in ${cooldown}s` : ''}.
              </div>

              <button className="login-alt" onClick={resend} disabled={cooldown > 0 || busy}>
                {busy ? 'Sending…' : cooldown > 0 ? `Resend code (${cooldown}s)` : 'Resend code'}
              </button>
              <button className="login-alt" onClick={() => { setMode('guest'); setErr(null) }}>
                ← Wrong email? Go back
              </button>
            </>
          )}

          {mode === 'code' && (
            <>
              <h2>Access code</h2>
              <p className="hint">For the organising team — enter your name and the code.</p>

              <form onSubmit={submitCode}>
                {err && <div className="login-err">{err}</div>}
                <label className="field">
                  <span>Your name</span>
                  <input value={name} onChange={(e) => { setName(e.target.value); setErr(null) }} placeholder="e.g. Stevan" autoFocus />
                </label>
                <label className="field">
                  <span>Access code</span>
                  <input type="password" value={code} onChange={(e) => { setCode(e.target.value); setErr(null) }} placeholder="••••••••••••" />
                </label>
                <button type="submit" className="btn btn-dark" style={{ width: '100%', marginTop: 4 }}>Enter as Organiser</button>
              </form>

              <button className="login-alt" onClick={() => { setMode('guest'); setErr(null) }}>
                ← Back to guest sign-in
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
