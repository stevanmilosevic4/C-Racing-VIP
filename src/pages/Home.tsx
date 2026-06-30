import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Countdown, { MiniTimer } from '../components/Countdown'
import { EVENT, COUNTDOWN_TARGETS } from '../data/event'
import { SPOTLIGHTS } from '../data/content'
import { PHASES } from '../data/agenda'

export default function Home() {
  const { user } = useAuth()
  const firstName = user?.name.split(' ')[0] ?? 'there'
  const preview = PHASES.slice(0, 3)

  return (
    <div className="wrap">
      {/* HERO */}
      <section className="hero">
        <svg className="speed-lines" viewBox="0 0 1200 400" preserveAspectRatio="none">
          {[60, 120, 180, 240, 300].map((y, i) => (
            <line key={y} x1="0" y1={y} x2="1200" y2={y - 40} stroke={['#1e9bf0', '#e23026', '#ffffff', '#1e9bf0', '#e23026'][i]} strokeWidth="2" opacity="0.18" />
          ))}
        </svg>
        <div className="hero-grid">
          <div>
            <div className="kick">Tuesday · On the road to Imola</div>
            <h1>Hello,<br />{firstName}.</h1>
            <p className="sub">Race day is coming. Here is everything for your trip to Imola and the A2RL autonomous racing finals.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              <Link to="/agenda" className="btn btn-red">View the agenda</Link>
              <Link to="/book" className="btn btn-ghost">Book a garage visit</Link>
            </div>
          </div>

          <div>
            <Countdown target={EVENT.raceDay} title="Kick-off in — Race Day, 5 Sep" />
            <div className="mini-timers">
              {COUNTDOWN_TARGETS.map((t) => (
                <MiniTimer key={t.label} target={t.date} label={t.label} note={t.note} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 25 YEARS BANNER */}
      <div className="uni-banner" style={{ marginTop: 22 }}>
        <div className="yrs">25</div>
        <div>
          <h3>25 Years of Constructor University</h3>
          <p>2026 marks a quarter-century for Constructor University, Bremen — and the home team is on the A2RL grid. The Imola series doubles as our anniversary moment.</p>
        </div>
        <div className="seal">25</div>
      </div>

      {/* SPOTLIGHTS */}
      <div className="section-head">
        <div>
          <div className="eyebrow">Spotlights</div>
          <h2 style={{ marginTop: 8 }}>From the races before</h2>
        </div>
        <span className="label">Photos coming · placeholders for now</span>
      </div>
      <div className="grid cols-4">
        {SPOTLIGHTS.map((s) => (
          <article key={s.id} className="card spot">
            <div className="media" style={s.img ? { backgroundImage: `url(${s.img})`, backgroundSize: 'cover' } : undefined}>
              <span className={`tag ${s.badgeClass} badge`}>{s.badge}</span>
              {!s.img && <span className="ph">Add photo</span>}
            </div>
            <div className="body">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="meta">{s.meta}</div>
            </div>
          </article>
        ))}
      </div>

      {/* AGENDA PREVIEW */}
      <div className="section-head">
        <div>
          <div className="eyebrow">Agenda</div>
          <h2 style={{ marginTop: 8 }}>What happens, day by day</h2>
        </div>
        <Link to="/agenda" className="label" style={{ color: 'var(--blue-dark)' }}>Full agenda →</Link>
      </div>
      <div className="grid cols-3">
        {preview.map((p) => (
          <div key={p.id} className="card" style={{ padding: 20 }}>
            <span className={`tag tag-${p.accent === 'blue' ? 'blue' : p.accent === 'red' ? 'red' : p.accent === 'green' ? 'green' : 'amber'}`}>{p.tier}</span>
            <div className="agenda-date" style={{ marginTop: 14 }}>{p.dates}</div>
            <h3 style={{ fontSize: 20, margin: '6px 0 8px' }}>{p.title}</h3>
            <p className="muted" style={{ fontSize: 13, lineHeight: 1.55 }}>{p.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
