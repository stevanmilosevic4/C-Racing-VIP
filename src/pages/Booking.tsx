import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { usePersisted, useToast } from '../hooks'
import { logActivity } from '../activity'

type Slot = { id: string; date: string; window: string; time: string; cap: number }

// Testing-day garage visit slots (relaxed days, Jul/Aug).
const SLOTS: Slot[] = [
  { id: 'w1a', date: 'Tue 21 Jul', window: 'Testing · Window 1', time: '11:30 — Garage tour + autonomy walk-through', cap: 8 },
  { id: 'w1b', date: 'Thu 23 Jul', window: 'Testing · Window 1', time: '14:30 — Watch the test session from the wall', cap: 6 },
  { id: 'w1c', date: 'Sat 25 Jul', window: 'Testing · Window 1', time: '11:30 — Garage tour + engineer Q&A', cap: 8 },
  { id: 'w2a', date: 'Tue 04 Aug', window: 'Testing · Window 2', time: '12:00 — Engineer fireside (the autonomy stack)', cap: 10 },
  { id: 'w2b', date: 'Fri 07 Aug', window: 'Testing · Window 2', time: '15:00 — Extended test running', cap: 6 },
  { id: 'w2c', date: 'Mon 10 Aug', window: 'Testing · Window 2', time: '10:00 — Setup briefing + garage walk', cap: 8 },
]

type Booking = { slotId: string; people: number; interest: string; note: string }

export default function Booking() {
  const { user } = useAuth()
  const { msg, show } = useToast()
  const [booking, setBooking] = usePersisted<Booking | null>('cxa2rl.booking', null)
  const [selected, setSelected] = useState<string | null>(booking?.slotId ?? null)
  const [people, setPeople] = useState(booking?.people ?? 1)
  const [interest, setInterest] = useState(booking?.interest ?? 'See the car run')
  const [note, setNote] = useState(booking?.note ?? '')

  const slot = SLOTS.find((s) => s.id === selected)

  function confirm(e: React.FormEvent) {
    e.preventDefault()
    if (!selected) { show('Pick a slot first'); return }
    setBooking({ slotId: selected, people, interest, note })
    show('Garage visit booked ✓')
    if (user && slot) logActivity(user.name, user.role, 'Booked a garage visit', `${slot.date} · ${booking ? 'updated' : 'new'}`)
  }
  function cancel() { setBooking(null); setSelected(null); show('Booking cancelled') }

  return (
    <div className="wrap">
      <div className="eyebrow">Testing Days</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Book a Visit</h1>
      <p className="page-sub">Come to a relaxed testing day — see the car run, meet the engineers, and get the autonomous-racing walk-through. Pick a slot below.</p>

      {booking && slot && (
        <div className="card" style={{ padding: 18, marginTop: 22, borderLeft: '4px solid var(--green)', display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div>
            <span className="tag tag-green">Booked</span>
            <div style={{ fontWeight: 800, marginTop: 8 }}>{slot.date} · {slot.window}</div>
            <div className="muted" style={{ fontSize: 13, marginTop: 3 }}>{slot.time} · {booking.people} {booking.people > 1 ? 'people' : 'person'} · {booking.interest}</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={cancel}>Cancel booking</button>
        </div>
      )}

      <div className="grid cols-2" style={{ marginTop: 26, alignItems: 'start' }}>
        <div>
          <div className="section-head" style={{ marginTop: 0 }}><div><h2 style={{ fontSize: 18 }}>Available slots</h2></div></div>
          <div style={{ display: 'grid', gap: 12 }}>
            {SLOTS.map((s) => {
              const isSel = selected === s.id
              return (
                <button key={s.id} onClick={() => setSelected(s.id)} className="slot" style={{ textAlign: 'left', cursor: 'pointer', borderColor: isSel ? 'var(--blue)' : 'var(--line)', boxShadow: isSel ? '0 0 0 3px var(--blue-soft)' : 'none', background: '#fff' }}>
                  <div className="when">
                    <b>{s.date} · {s.window}</b>
                    <span>{s.time}</span>
                  </div>
                  <span className="cap">{s.cap} spots</span>
                </button>
              )
            })}
          </div>
        </div>

        <form className="card" style={{ padding: 22 }} onSubmit={confirm}>
          <h2 style={{ fontSize: 18, marginBottom: 16 }}>Your visit</h2>
          <label className="field"><span>Guest</span><input value={user?.name ?? ''} readOnly /></label>
          <label className="field"><span>Selected slot</span><input value={slot ? `${slot.date} · ${slot.time}` : 'None selected yet'} readOnly /></label>
          <label className="field"><span>How many people</span>
            <select value={people} onChange={(e) => setPeople(Number(e.target.value))}>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <label className="field"><span>I’d most like to…</span>
            <select value={interest} onChange={(e) => setInterest(e.target.value)}>
              <option>See the car run</option>
              <option>Talk to the engineers</option>
              <option>Garage / pit-lane tour</option>
              <option>Understand the autonomy stack</option>
            </select>
          </label>
          <label className="field"><span>Anything else? (optional)</span><textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Dietary needs, accessibility, questions…" /></label>
          <button className="btn btn-red" style={{ width: '100%' }} type="submit">{booking ? 'Update booking' : 'Confirm visit'}</button>
        </form>
      </div>

      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
