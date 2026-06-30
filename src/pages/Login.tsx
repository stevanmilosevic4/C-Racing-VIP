import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [err, setErr] = useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const res = login(name, code)
    if (!res.ok) { setErr(res.error ?? 'Login failed'); return }
    nav('/')
  }

  return (
    <div className="login-screen">
      <aside className="login-aside">
        <div className="brand" style={{ color: '#fff' }}>
          <Logo />
          <small style={{ color: 'rgba(255,255,255,.6)' }}>Constructor × A2RL</small>
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
          <p className="hint">Enter your name and the access code from your invitation.</p>

          <form onSubmit={submit}>
            {err && <div className="login-err">{err}</div>}
            <label className="field">
              <span>Your name</span>
              <input value={name} onChange={(e) => { setName(e.target.value); setErr(null) }} placeholder="e.g. Öznur" autoFocus />
            </label>
            <label className="field">
              <span>Access code</span>
              <input value={code} onChange={(e) => { setCode(e.target.value); setErr(null) }} placeholder="From your invite" />
            </label>
            <button className="btn btn-red" style={{ width: '100%' }} type="submit">Enter the paddock →</button>
          </form>

          <div className="demo-creds">
            <div><b>Demo access</b></div>
            VIP guest — code <code>IMOLA26</code><br />
            Organizer (admin) — code <code>CONTROL26</code>
          </div>
        </div>
      </section>
    </div>
  )
}
