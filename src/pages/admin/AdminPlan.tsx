import { MILESTONES, DECISIONS } from '../../data/tasks'

export default function AdminPlan() {
  return (
    <div className="wrap">
      <div className="eyebrow">Organizer</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Milestones</h1>
      <p className="page-sub">The critical path and the open decisions that gate it — straight from the series tracker.</p>

      <div className="section-head"><div><h2 style={{ fontSize: 20 }}>Timeline & critical path</h2></div></div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead><tr><th>By when</th><th>Milestone</th><th>Phase</th></tr></thead>
          <tbody>
            {MILESTONES.map((m, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 800, whiteSpace: 'nowrap', color: 'var(--blue-dark)' }}>{m.when}</td>
                <td>{m.what}</td>
                <td className="muted" style={{ whiteSpace: 'nowrap' }}>{m.phase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-head"><div><h2 style={{ fontSize: 20 }}>Open decisions</h2></div></div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead><tr><th>Decision</th><th>Owner</th><th>Needed by</th><th>Status</th><th>Notes</th></tr></thead>
          <tbody>
            {DECISIONS.map((d, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{d.decision}</td>
                <td className="muted">{d.owner}</td>
                <td style={{ fontWeight: 800, whiteSpace: 'nowrap' }}>{d.by}</td>
                <td><span className={`st ${d.status}`}>{d.status}</span></td>
                <td className="muted" style={{ fontSize: 13 }}>{d.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
