import { PHASES } from '../data/agenda'

export default function Agenda() {
  return (
    <div className="wrap">
      <div className="eyebrow">Series Agenda</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Agenda</h1>
      <p className="page-sub">From relaxed testing days to the Imola finals — and on to Abu Dhabi. All times local; long legs are approximate.</p>

      <div style={{ marginTop: 34, maxWidth: 760 }}>
        {PHASES.map((p) => (
          <div key={p.id} className={`agenda-phase ${p.accent}`}>
            <div className="agenda-date">{p.dates}</div>
            <h3>{p.title}</h3>
            <span className={`tag tag-${p.accent === 'blue' ? 'blue' : p.accent === 'red' ? 'red' : p.accent === 'green' ? 'green' : 'amber'}`} style={{ marginTop: 8 }}>{p.tier}</span>
            <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, margin: '12px 0 4px' }}>{p.summary}</p>
            <div className="agenda-items">
              {p.items.map((it, i) => (
                <div className="agenda-item" key={i}>
                  <div className="time">{it.time}</div>
                  <div>
                    <div className="what">{it.what}</div>
                    {it.where && <div className="where">{it.where}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
