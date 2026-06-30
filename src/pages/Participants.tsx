import { TEAMS } from '../data/participants'

export default function Participants() {
  return (
    <div className="wrap">
      <div className="eyebrow">The Grid</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Participants</h1>
      <p className="page-sub">The A2RL teams — seeded from last year’s grid. We’ll confirm the full 2026 Imola line-up as entries are locked.</p>

      <div className="grid cols-3" style={{ marginTop: 30 }}>
        {TEAMS.map((tm) => (
          <article key={tm.id} className="card team">
            <div className="top" style={{ background: `linear-gradient(135deg, ${tm.color}, ${shade(tm.color)})` }}>
              <div className="crest">{tm.short}</div>
              <div>
                <h3>{tm.name}</h3>
                <div className="country">{tm.flag} {tm.country}</div>
              </div>
            </div>
            <div className="body">
              <div className="stat-row"><span>University</span><b style={{ textAlign: 'right' }}>{tm.university}</b></div>
              <div className="stat-row"><span>Established</span><b>{tm.est}</b></div>
              <div className="stat-row"><span>Last season</span><b>{tm.lastYear}</b></div>
              <div className="stat-row"><span>Note</span><b style={{ textAlign: 'right' }}>{tm.drivers}</b></div>
              <p className="blurb">{tm.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

// darken a hex colour for the gradient end
function shade(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const r = Math.max(0, (n >> 16) - 40)
  const g = Math.max(0, ((n >> 8) & 255) - 30)
  const b = Math.max(0, (n & 255) - 30)
  return `rgb(${r},${g},${b})`
}
