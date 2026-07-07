import { PHASES } from '../data/agenda'

export default function Agenda() {
  return (
    <div className="wrap">
      <div className="eyebrow">Series Agenda</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Agenda</h1>
      <p className="page-sub">From relaxed testing days to the Imola finals — and on to Abu Dhabi. Deliberately flexible: test runs are decided in the moment, so there are no fixed timestamps. Pick your day, tell us how many you are via <b>Book a Visit</b>, and we'll arrange your tour guide.</p>

      <div className="photo-band">
        <img src="/gallery/971.jpg" alt="The pit lane at dusk" loading="lazy" />
        <div className="pb-cap">Pit lane, lights on — where every agenda item below actually happens.</div>
      </div>

      <div className="agenda-layout">
        <div>
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

        {/* the car keeps you company down the whole agenda */}
        <aside className="agenda-side">
          <figure className="lab-item">
            <img src="/gallery/631.jpg" alt="" loading="lazy" />
            <figcaption>Car #8 — the sensor pod where a driver's head would be</figcaption>
          </figure>
          <figure className="lab-item">
            <img src="/gallery/1301.jpg" alt="" loading="lazy" />
            <figcaption>On the grid — moments before the cars are on their own</figcaption>
          </figure>
          <figure className="lab-item">
            <img src="/gallery/AR1.jpeg" alt="" loading="lazy" />
            <figcaption>Rolling out — pit lane, race night</figcaption>
          </figure>
        </aside>
      </div>
    </div>
  )
}
