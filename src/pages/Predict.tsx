import { TEAMS } from '../data/participants'
import { useSynced, useToast } from '../hooks'
import { useAuth } from '../context/AuthContext'
import { logActivity } from '../activity'

const MEDAL = ['🥇', '🥈', '🥉']
const POS_CLASS = ['p1', 'p2', 'p3']

export default function Predict() {
  const { msg, show } = useToast()
  const { user } = useAuth()
  const uk = user?.name ?? 'guest'
  // per-user, synced to the backend so a VIP's bet follows them across devices
  const [order, setOrder] = useSynced<string[]>(`cxa2rl.predict:${uk}`, TEAMS.map((t) => t.id))
  const [locked, setLocked] = useSynced<boolean>(`cxa2rl.predictLocked:${uk}`, false)

  const teams = order.map((id) => TEAMS.find((t) => t.id === id)!).filter(Boolean)
  const podium = teams.slice(0, 3)

  function move(i: number, dir: -1 | 1) {
    if (locked) return
    const j = i + dir
    if (j < 0 || j >= teams.length) return
    const next = [...order]
    ;[next[i], next[j]] = [next[j], next[i]]
    setOrder(next)
  }
  function reset() { setOrder(TEAMS.map((t) => t.id)); setLocked(false); show('Bet cleared') }
  function lock() {
    setLocked(true); show('Bet locked in ✓')
    if (user) logActivity(user.name, user.role, 'Locked in podium bet', `P1 ${podium[0]?.name ?? ''}`)
  }
  function edit() { setLocked(false); show('Bet unlocked — make your changes') }

  return (
    <div className="wrap">
      <div className="eyebrow">Podium Bet · Bragging rights only</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Place Your Bet</h1>
      <p className="page-sub">
        Who crosses the line first at Imola? Call the full finishing order — drag the teams into the order you
        back them to finish. Lock it in before lights-out on race day and we’ll see how sharp your instincts are.
        No money, no stakes — just paddock glory.
      </p>

      {/* BET SLIP — your podium */}
      <div className="betslip">
        <div className="betslip-head">
          <span>🏆 Your podium call</span>
          <span className={`betslip-status ${locked ? 'on' : ''}`}>{locked ? '● Locked in' : '○ Not locked'}</span>
        </div>
        <div className="podium-cards">
          {podium.map((tm, i) => (
            <div key={tm.id} className={`podium-card ${POS_CLASS[i]}`}>
              <div className="pc-medal">{MEDAL[i]}</div>
              <div className="pc-crest" style={{ background: tm.color }}>{tm.short}</div>
              <div className="pc-name">{tm.name}</div>
              <div className="pc-pos">P{i + 1} {tm.flag}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          {locked
            ? <button className="btn btn-dark btn-sm" onClick={edit}>Edit bet</button>
            : <button className="btn btn-red btn-sm" onClick={lock}>Lock in my bet</button>}
          <button className="btn btn-ghost btn-sm" onClick={reset}>Clear</button>
        </div>
      </div>

      {/* FULL ORDER */}
      <div className="section-head"><div><h2 style={{ fontSize: 18 }}>Full finishing order</h2></div>
        <span className="label">{locked ? 'Locked — tap “Edit bet” to change' : 'Use the arrows to rank all teams'}</span>
      </div>
      <div className="predict-list" style={{ maxWidth: 640, opacity: locked ? 0.75 : 1 }}>
        {teams.map((tm, i) => (
          <div key={tm.id} className="predict-row">
            <div className={`predict-pos ${i < 3 ? POS_CLASS[i] : ''}`}>{i + 1}</div>
            <div className="crest" style={{ width: 36, height: 36, borderRadius: 10, background: tm.color, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 13, flex: 'none' }}>{tm.short}</div>
            <div className="pname">{tm.name} <span className="muted" style={{ fontWeight: 600 }}>{tm.flag}</span></div>
            <div className="pmove">
              <button onClick={() => move(i, -1)} disabled={locked || i === 0} title="Up">▲</button>
              <button onClick={() => move(i, 1)} disabled={locked || i === teams.length - 1} title="Down">▼</button>
            </div>
          </div>
        ))}
      </div>

      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
