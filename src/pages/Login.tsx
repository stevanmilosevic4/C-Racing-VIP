import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

export default function Login() {
  const { loginGuest, loginAdmin } = useAuth()
  const nav = useNavigate()
  const [mode, setMode] = useState<'guest' | 'code'>('guest')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [err, setErr] = useState<string | null>(null)

  function submitGuest(e: React.FormEvent) {
    e.preventDefault()
    const res = loginGuest({ name, company, email })
    if (!res.ok) { setErr(res.error ?? 'Sign-in failed'); return }
    nav('/')
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

          {mode === 'guest' ? (
            <>
              <h2>Welcome to the crew.</h2>
              <p className="hint">Tell us who you are and you're in.</p>

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
                <button type="submit" className="btn btn-red" style={{ width: '100%', marginTop: 4 }}>Enter</button>
              </form>

              <div className="demo-creds">
                Your details stay with the organising team only — they're used for gate lists, tour-guide
                planning and race-week updates.
              </div>

              <button className="login-alt" onClick={() => { setMode('code'); setErr(null) }}>
                I have an access code →
              </button>
            </>
          ) : (
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
