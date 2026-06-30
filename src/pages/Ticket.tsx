import { useAuth } from '../context/AuthContext'
import { EVENT } from '../data/event'
import { TICKET_PERKS } from '../data/content'

// Deterministic faux-QR from a seed string — purely decorative.
const N = 21
function QR({ seed }: { seed: string }) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0 }
  const isFinder = (x: number, y: number) => {
    const inBox = (ox: number, oy: number) => x >= ox && x < ox + 7 && y >= oy && y < oy + 7
    for (const [ox, oy] of [[0, 0], [N - 7, 0], [0, N - 7]] as const) {
      if (inBox(ox, oy)) {
        const dx = x - ox, dy = y - oy
        const ring = dx === 0 || dx === 6 || dy === 0 || dy === 6
        const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4
        return ring || core
      }
    }
    return null
  }
  const cells: { x: number; y: number }[] = []
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const f = isFinder(x, y)
    if (f !== null) { if (f) cells.push({ x, y }); continue }
    h = (Math.imul(h, 1103515245) + 12345) & 0x7fffffff
    if ((h >> 16) % 2 === 0) cells.push({ x, y })
  }
  return (
    <svg viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges">
      {cells.map((c, i) => <rect key={i} x={c.x} y={c.y} width="1" height="1" fill="#0a1733" />)}
    </svg>
  )
}

export default function Ticket() {
  const { user } = useAuth()
  const name = user?.name ?? 'Guest'
  const ref = 'CX-' + name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4).padEnd(4, 'X') + '-26'

  return (
    <div className="wrap">
      <div className="eyebrow">Race Day Pass</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Ticket</h1>
      <p className="page-sub">Your VIP credential for the A2RL Imola finals. Show this at the paddock gate on race day.</p>

      <div className="grid cols-2" style={{ marginTop: 30, alignItems: 'start' }}>
        <div className="ticket">
          <div className="tk-top">
            <div>
              <div style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: '#1e9bf0', fontWeight: 800 }}>Constructor × A2RL · VIP</div>
              <div style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>Imola Finals</div>
            </div>
            <span className="tag tag-red">VIP</span>
          </div>
          <div className="tk-mid">
            <div className="tk-cell"><div className="l">Guest</div><div className="v">{name}</div></div>
            <div className="tk-cell"><div className="l">Date</div><div className="v">Sat 5 Sep</div></div>
            <div className="tk-cell"><div className="l">Gate</div><div className="v">15:00</div></div>
            <div className="tk-cell"><div className="l">Venue</div><div className="v" style={{ fontSize: 14 }}>Autodromo Enzo e Dino Ferrari</div></div>
            <div className="tk-cell"><div className="l">Access</div><div className="v" style={{ fontSize: 14 }}>Paddock · Grandstand · Lodge</div></div>
            <div className="tk-cell"><div className="l">Seat</div><div className="v">Main straight</div></div>
          </div>
          <div className="tk-perf">
            <div>
              <div style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,.55)', fontWeight: 800 }}>Reference</div>
              <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: '.06em', marginTop: 5 }}>{ref}</div>
              <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 12, marginTop: 6 }}>{EVENT.vipCapacity} VIP passes · invite-only</div>
            </div>
            <div className="qr"><QR seed={ref} /></div>
          </div>
        </div>

        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontSize: 18 }}>What your pass includes</h3>
          <div style={{ marginTop: 12 }}>
            {TICKET_PERKS.map((p) => (
              <div className="perk" key={p}>
                <span className="dot">✓</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--blue-soft)', borderRadius: 10, fontSize: 13, color: 'var(--blue-dark)', fontWeight: 600 }}>
            Keep this screen handy on race day — your reference and QR are your entry.
          </div>
        </div>
      </div>
    </div>
  )
}
