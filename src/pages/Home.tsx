import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Countdown, { MiniTimer } from '../components/Countdown'
import Gallery from '../components/Gallery'
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
        <img className="cu-logo" src="/cu-25-white.png" alt="Constructor University · 25 Years" />
        <div className="uni-copy">
          <div className="uni-eyebrow">Constructor University · Bremen · Est. 2001</div>
          <h3>Celebrating 25 years of Constructor University.</h3>
          <p>For twenty-five years, Constructor University in Bremen has brought <b>physics, computer science, engineering and business</b> together on one international, English-language campus — teaching across disciplines and turning research into real-world impact. A quarter-century on, the mission holds: educate boldly, research fearlessly, and keep <b>constructing the future</b>. From the lab bench to the paddock, that same spirit now powers our A2RL autonomous racing team.</p>
          <div className="uni-rank">Ranked <b>#1 private university in Germany</b> and among the world’s <b>top 25%</b> <span>·</span> Times Higher Education</div>
        </div>
        <div className="seal">25</div>
      </div>

      {/* SPOTLIGHTS */}
      <div className="section-head">
        <div>
          <div className="eyebrow">Spotlights</div>
          <h2 style={{ marginTop: 8 }}>From the races before</h2>
        </div>
        <span className="label">Real shots from Yas Marina</span>
      </div>
      <div className="grid cols-4">
        {SPOTLIGHTS.map((s) => (
          <article key={s.id} className="card spot">
            <div className="media" style={s.img ? { backgroundImage: `url("${encodeURI(s.img)}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
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

      {/* WATCH — the story of P2 at the inaugural race */}
      <div className="section-head">
        <div>
          <div className="eyebrow">Watch</div>
          <h2 style={{ marginTop: 8 }}>P2 at the first-ever A2RL race</h2>
        </div>
      </div>
      <div className="grid cols-2" style={{ alignItems: 'center' }}>
        <div className="video-frame">
          <iframe
            src="https://www.youtube-nocookie.com/embed/hzUvM25_dCU"
            title="Constructor got 2nd place at the A2RL"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="card pad">
          <h3>How it happened</h3>
          <p className="blurb">
            Yas Marina, April 2024 — the first autonomous formula race in history, and Constructor's
            car crossed the line second, pulling off the first-ever autonomous overtake on an F1
            circuit on the way. This is that story, told by the team. Imola is the next chapter.
          </p>
        </div>
      </div>

      {/* PHOTO GALLERY */}
      <div className="section-head">
        <div>
          <div className="eyebrow">Gallery</div>
          <h2 style={{ marginTop: 8 }}>From the paddock</h2>
        </div>
        <span className="label">scroll →</span>
      </div>
      <Gallery />

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
