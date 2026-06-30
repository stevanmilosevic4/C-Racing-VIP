import { TEAMS } from '../data/participants'
import { usePersisted, useToast } from '../hooks'

export default function Predict() {
  const { msg, show } = useToast()
  // store ordered list of team ids
  const [order, setOrder] = usePersisted<string[]>('cxa2rl.predict', TEAMS.map((t) => t.id))

  const teams = order.map((id) => TEAMS.find((t) => t.id === id)!).filter(Boolean)

  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= teams.length) return
    const next = [...order]
    ;[next[i], next[j]] = [next[j], next[i]]
    setOrder(next)
  }
  function reset() { setOrder(TEAMS.map((t) => t.id)); show('Prediction reset') }
  function save() { show('Prediction locked in ✓') }

  return (
    <div className="wrap">
      <div className="eyebrow">Your call</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Predict</h1>
      <p className="page-sub">Order the grid how you think they’ll finish at Imola. Move teams up and down — your prediction is saved on this device.</p>

      <div style={{ display: 'flex', gap: 10, margin: '24px 0' }}>
        <button className="btn btn-red btn-sm" onClick={save}>Lock it in</button>
        <button className="btn btn-ghost btn-sm" onClick={reset}>Reset</button>
      </div>

      <div className="predict-list" style={{ maxWidth: 640 }}>
        {teams.map((tm, i) => (
          <div key={tm.id} className="predict-row">
            <div className={`predict-pos ${i < 3 ? 'p' + (i + 1) : ''}`}>{i + 1}</div>
            <div className="crest" style={{ width: 36, height: 36, borderRadius: 10, background: tm.color, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 13, flex: 'none' }}>{tm.short}</div>
            <div className="pname">{tm.name} <span className="muted" style={{ fontWeight: 600 }}>{tm.flag}</span></div>
            <div className="pmove">
              <button onClick={() => move(i, -1)} disabled={i === 0} title="Up">▲</button>
              <button onClick={() => move(i, 1)} disabled={i === teams.length - 1} title="Down">▼</button>
            </div>
          </div>
        ))}
      </div>

      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
