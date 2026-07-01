import { IMOLA, F1_HISTORY } from '../data/content'

export default function Imola() {
  return (
    <div className="wrap">
      <section className="imola-hero">
        <div className="kick" style={{ color: '#1e9bf0', fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', fontSize: 12 }}>Host City</div>
        <h1 style={{ fontSize: 'clamp(38px,7vw,64px)', fontWeight: 900, marginTop: 12 }}>Imola</h1>
        <p style={{ color: 'rgba(255,255,255,.75)', marginTop: 14, maxWidth: 620, lineHeight: 1.65 }}>{IMOLA.intro}</p>
      </section>

      {/* FACTS */}
      <div className="section-head"><div><div className="eyebrow">Interesting facts</div><h2 style={{ marginTop: 8 }}>Know before you go</h2></div></div>
      <div className="grid cols-4">
        {IMOLA.facts.map((f) => (
          <div key={f.t} className="card fact-card">
            <div className="n">{f.n}</div>
            <div className="t">{f.t}</div>
            <div className="d">{f.d}</div>
          </div>
        ))}
      </div>

      {/* PHOTOS placeholder */}
      <div className="section-head"><div><div className="eyebrow">Gallery</div><h2 style={{ marginTop: 8 }}>Imola in pictures</h2></div><span className="label">Add your photos to /public</span></div>
      <div className="grid cols-3">
        {IMOLA.gallery.map((g) => (
          <div key={g.caption} className="card spot">
            <div className="media" style={g.img ? { backgroundImage: `url("${encodeURI(g.img)}")`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}>
              {!g.img && <span className="ph">{g.caption}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* WHAT TO DO */}
      <div className="section-head"><div><div className="eyebrow">What to do</div><h2 style={{ marginTop: 8 }}>Beyond the paddock</h2></div></div>
      <div className="grid cols-2">
        {IMOLA.todo.map((t) => (
          <div key={t.h} className="card todo-card">
            <h3>{t.h}</h3>
            <p>{t.p}</p>
          </div>
        ))}
      </div>

      {/* NEARBY */}
      <div className="section-head"><div><div className="eyebrow">Day trips</div><h2 style={{ marginTop: 8 }}>Cities nearby</h2></div></div>
      <div className="grid cols-2">
        {IMOLA.nearby.map((n) => (
          <div key={n.city} className="nearby">
            <div>
              <b style={{ display: 'block', marginBottom: 3 }}>{n.city}</b>
              <span>{n.note}</span>
            </div>
            <span className="cap" style={{ whiteSpace: 'nowrap', color: 'var(--blue-dark)', fontWeight: 800 }}>{n.dist}</span>
          </div>
        ))}
      </div>

      {/* F1 HISTORY */}
      <div className="section-head"><div><div className="eyebrow">Heritage</div><h2 style={{ marginTop: 8 }}>Formula 1 at Imola</h2></div></div>
      <div className="card" style={{ padding: '8px 24px' }}>
        {F1_HISTORY.map((e) => (
          <div key={e.yr} className="f1-row">
            <div className="yr">{e.yr}</div>
            <div className="ev">
              <b>{e.title}</b>
              <p>{e.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
