import { CREW } from '../data/content'

export default function Crew() {
  return (
    <div className="wrap">
      <div className="eyebrow">The People</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Crew</h1>
      <p className="page-sub">The Constructor team behind the car — the people you’ll meet in the garage. A few small facts about each.</p>

      <div className="grid cols-3" style={{ marginTop: 30 }}>
        {CREW.map((c) => (
          <article key={c.id} className="card crew-card">
            <div className="crew-ava" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)` }}>{c.name.slice(0, 1)}</div>
            <h3>{c.name}</h3>
            <div className="role">{c.role}</div>
            <p className="fact">{c.fact}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
