import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [err, setErr] = useState<string | null>(null)

  function enter(role: 'vip' | 'admin') {
    const res = login(name, role)
    if (!res.ok) { setErr(res.error ?? 'Login failed'); return }
    nav(role === 'admin' ? '/admin' : '/')
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
          <h2>Welcome to the crew.</h2>
          <p className="hint">Enter your name, then choose how you’re joining.</p>

          <form onSubmit={(e) => { e.preventDefault(); enter('vip') }}>
            {err && <div className="login-err">{err}</div>}
            <label className="field">
              <span>Your name</span>
              <input value={name} onChange={(e) => { setName(e.target.value); setErr(null) }} placeholder="e.g. Alex" autoFocus />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4 }}>
              <button type="submit" className="btn btn-red">Enter as Guest</button>
              <button type="button" className="btn btn-dark" onClick={() => enter('admin')}>Enter as Organiser</button>
            </div>
          </form>

          <div className="demo-creds">
            <b>Guest</b> — the VIP experience (home, agenda, ticket, book a visit).<br />
            <b>Organiser</b> — the event-control board and guest records.
          </div>
        </div>
      </section>
    </div>
  )
}
