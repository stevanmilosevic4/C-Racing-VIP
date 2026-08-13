import { useState } from 'react'
import { GUESTS, type Guest } from '../../data/tasks'
import { EVENT } from '../../data/event'
import { useSynced, useToast } from '../../hooks'
import { HOTELS_KEY, type HotelRecord } from '../../data/hotels'

const TIERS = ['Organiser', 'VIP', 'Public']
const STATUSES = ['Confirmed', 'Invited', 'Pending']

function tierClass(tier: string) {
  return tier === 'VIP' ? 'tag-red' : tier === 'Organiser' ? 'tag-navy' : 'tag-blue'
}

export default function AdminGuests() {
  const { msg, show } = useToast()
  const [guests, setGuests] = useSynced<Guest[]>('cxa2rl.guests', GUESTS)
  const [hotels] = useSynced<Record<string, HotelRecord>>(HOTELS_KEY, {})
  const hotelRows = Object.values(hotels ?? {}).sort((a, b) => b.ts - a.ts)
  const [name, setName] = useState('')
  const [dept, setDept] = useState('')
  const [tier, setTier] = useState('VIP')
  const [status, setStatus] = useState('Invited')

  const vip = guests.filter((g) => g.tier === 'VIP').length
  const confirmed = guests.filter((g) => g.status === 'Confirmed').length

  function addGuest(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) { show('Enter a name first'); return }
    setGuests((gs) => [...gs, { name: name.trim(), dept: dept.trim() || '—', tier, status }])
    setName(''); setDept(''); show('Guest added ✓')
  }
  function remove(i: number) {
    setGuests((gs) => gs.filter((_, idx) => idx !== i))
    show('Guest removed')
  }
  function reset() { setGuests(GUESTS); show('Guest list reset') }

  return (
    <div className="wrap">
      <div className="eyebrow">Organizer</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Guest Records</h1>
      <p className="page-sub">{guests.length} {guests.length === 1 ? 'person' : 'people'} · VIP capacity is {EVENT.vipCapacity}. Add guests below — trigger a suite/lodge booking if confirmed VIPs exceed {EVENT.vipCapacity}.</p>

      <div className="stat-cards" style={{ marginTop: 24 }}>
        <div className="stat-card"><div className="num">{guests.length}</div><div className="cap">On the list</div></div>
        <div className="stat-card"><div className="num">{vip}/{EVENT.vipCapacity}</div><div className="cap">VIP allocated</div></div>
        <div className="stat-card"><div className="num">{confirmed}</div><div className="cap">Confirmed</div></div>
        <div className="stat-card"><div className="num">{guests.filter((g) => g.status === 'Pending').length}</div><div className="cap">Pending</div></div>
      </div>

      {/* Add guest */}
      <form className="board-toolbar" onSubmit={addGuest} style={{ marginTop: 20 }}>
        <input style={{ flex: 2, minWidth: 150 }} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input style={{ flex: 2, minWidth: 150 }} placeholder="Office / role (optional)" value={dept} onChange={(e) => setDept(e.target.value)} />
        <select value={tier} onChange={(e) => setTier(e.target.value)}>{TIERS.map((t) => <option key={t}>{t}</option>)}</select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select>
        <button className="btn btn-blue btn-sm" type="submit">Add guest</button>
        <button className="btn btn-ghost btn-sm" type="button" onClick={reset}>Reset</button>
      </form>

      <div style={{ marginTop: 18, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Office / role</th><th>Tier</th><th>RSVP</th><th></th></tr>
          </thead>
          <tbody>
            {guests.map((g, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{g.name}</td>
                <td className="muted">{g.dept}</td>
                <td><span className={`tag ${tierClass(g.tier)}`}>{g.tier}</span></td>
                <td><span className={`st ${g.status}`}>{g.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button className="icon-btn" title="Remove" onClick={() => remove(i)} style={{ width: 30, height: 30 }}>✕</button>
                </td>
              </tr>
            ))}
            {guests.length === 0 && <tr><td colSpan={5} className="muted" style={{ textAlign: 'center', padding: 30 }}>No guests yet — add the first above.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* GUEST HOTELS — answers from the sign-in hotel popup */}
      <div className="section-head"><div><div className="eyebrow">Stay</div><h2 style={{ marginTop: 8 }}>Guest hotels</h2></div></div>
      {hotelRows.length === 0 ? (
        <p className="muted" style={{ fontSize: 14 }}>No answers yet — guests are asked about their hotel when they sign in.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead><tr><th>Guest</th><th>Hotel</th><th>Answered</th></tr></thead>
            <tbody>
              {hotelRows.map((h) => (
                <tr key={h.guest}>
                  <td><b>{h.guest}</b><div className="muted" style={{ fontSize: 12 }}>{[h.company, h.email].filter(Boolean).join(' · ') || '—'}</div></td>
                  <td>{h.hasHotel ? <b>{h.hotelName}</b> : <span className="tag tag-amber">No hotel yet</span>}</td>
                  <td className="muted" style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(h.ts))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
