import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSynced, useToast } from '../hooks'
import { logActivity } from '../activity'
import { BOOKINGS_KEY, emailBookingNotification, type BookingRecord } from '../data/bookings'

// Real bookable days (from the series plan): testing 21–27 Jul and
// 2–11 Aug 2026, plus finals week 31 Aug – 4 Sep (garage base; the car
// runs only once or twice, so track action isn't guaranteed).
// Exact daily run-plan is set closer to the date — guests pick a preferred day.
function testingDays(): { id: string; label: string; window: string }[] {
  const days: { id: string; label: string; window: string }[] = []
  const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })
  const push = (y: number, m: number, d: number, window: string) => {
    const date = new Date(Date.UTC(y, m - 1, d))
    days.push({ id: `${y}-${m}-${d}`, label: fmt.format(date), window })
  }
  for (let d = 21; d <= 27; d++) push(2026, 7, d, 'Testing · Window 1')
  for (let d = 2; d <= 11; d++) push(2026, 8, d, 'Testing · Window 2')
  push(2026, 9, 5, 'Race Day') // tours around the finals happen on race day only
  return days
}
const DAYS = testingDays()

// What guests can experience on a testing-day visit.
const ACTIVITIES = [
  'Live viewing of a test run from the pit wall or garage',
  'Guided tour of the garage and workspace',
  'Real-time “what you’re watching” briefing — telemetry in plain language as the car runs',
  'Meet-the-engineers session — a scheduled 20–30 min Q&A between runs',
  'Walkthrough of the live telemetry / visualisation while the car is on track',
  'Briefing on Constructor Racing as a Physical AI platform (for partners / prospective sponsors)',
  'Photo opportunity with the car and team',
]

type Booking = { dayId: string; people: number; activities: string[]; note: string }

export default function BookingPage() {
  const { user } = useAuth()
  const { msg, show } = useToast()
  const [booking, setBooking] = useSynced<Booking | null>(`cxa2rl.booking:${user?.name ?? 'guest'}`, null)
  const [, setAllBookings] = useSynced<BookingRecord[]>(BOOKINGS_KEY, [])
  const [dayId, setDayId] = useState<string>(booking?.dayId ?? '')
  const [people, setPeople] = useState(booking?.people ?? 1)
  const [activities, setActivities] = useState<string[]>(booking?.activities ?? [])
  const [note, setNote] = useState(booking?.note ?? '')

  const day = DAYS.find((d) => d.id === dayId)

  function toggle(a: string) {
    setActivities((cur) => cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a])
  }

  function confirm(e: React.FormEvent) {
    e.preventDefault()
    if (!dayId) { show('Pick a preferred day first'); return }
    setBooking({ dayId, people, activities, note })
    show('Garage visit requested ✓')
    if (user && day) {
      logActivity(user.name, user.role, 'Booked a garage visit', `${day.label} · ${booking ? 'updated' : 'new'}`)
      // central copy for the organisers' Visits board + email notification
      const rec: BookingRecord = {
        guest: user.name, company: user.company ?? '', email: user.email ?? '',
        dayId, day: day.label, window: day.window, people, activities, note,
        ts: Date.now(), status: 'requested',
      }
      setAllBookings((list) => [...(list ?? []).filter((b) => b.guest !== user.name), rec])
      emailBookingNotification(rec)
    }
  }
  function cancel() {
    setBooking(null); setDayId(''); setActivities([]); show('Booking cancelled')
    if (user) {
      setAllBookings((list) => (list ?? []).map((b) => {
        if (b.guest !== user.name || b.status === 'cancelled') return b
        const cancelled: BookingRecord = { ...b, status: 'cancelled', ts: Date.now() }
        emailBookingNotification(cancelled)
        return cancelled
      }))
      logActivity(user.name, user.role, 'Cancelled a garage visit')
    }
  }

  return (
    <div className="wrap">
      <div className="eyebrow">Testing Days</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Book a Visit</h1>
      <p className="page-sub">Come to a relaxed testing day at Imola — watch the car run, meet the engineers, and see the autonomy work up close. Around the finals, garage tours happen on <b>race day itself, Saturday 5 September</b>, before the 18:30 final. Tell us what you’d like to do and your preferred day; we’ll confirm the schedule with you.</p>

      {booking && day && (
        <div className="card" style={{ padding: 18, marginTop: 22, borderLeft: '4px solid var(--green)', display: 'flex', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
          <div>
            <span className="tag tag-green">Requested</span>
            <div style={{ fontWeight: 800, marginTop: 8 }}>{day.label} · {day.window}</div>
            <div className="muted" style={{ fontSize: 13, marginTop: 3 }}>{booking.people} {booking.people > 1 ? 'people' : 'person'} · {booking.activities.length} {booking.activities.length === 1 ? 'activity' : 'activities'} selected</div>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={cancel}>Cancel booking</button>
        </div>
      )}

      <div className="grid cols-2" style={{ marginTop: 26, alignItems: 'start' }}>
        <div>
          <div className="section-head" style={{ marginTop: 0 }}><div><h2 style={{ fontSize: 18 }}>What you’d like to do</h2></div><span className="label">pick any</span></div>
          <div style={{ display: 'grid', gap: 10 }}>
            {ACTIVITIES.map((a) => {
              const on = activities.includes(a)
              return (
                <button type="button" key={a} onClick={() => toggle(a)} className={`activity ${on ? 'on' : ''}`}>
                  <span className="check">{on ? '✓' : ''}</span>
                  <span className="act-label">{a}</span>
                </button>
              )
            })}
          </div>
        </div>

        <form className="card" style={{ padding: 22, position: 'sticky', top: 84 }} onSubmit={confirm}>
          <h2 style={{ fontSize: 18, marginBottom: 16 }}>Your visit</h2>
          <label className="field"><span>Guest</span><input value={user?.name ?? ''} readOnly /></label>
          <label className="field"><span>Preferred day</span>
            <select value={dayId} onChange={(e) => setDayId(e.target.value)}>
              <option value="">Choose a testing day…</option>
              <optgroup label="Testing · Window 1 (21–27 Jul)">
                {DAYS.filter((d) => d.window.endsWith('1')).map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
              </optgroup>
              <optgroup label="Testing · Window 2 (2–11 Aug)">
                {DAYS.filter((d) => d.window.endsWith('2')).map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
              </optgroup>
              <optgroup label="Race Day · Saturday 5 September">
                {DAYS.filter((d) => d.window === 'Race Day').map((d) => <option key={d.id} value={d.id}>{d.label} — tours before the 18:30 final</option>)}
              </optgroup>
            </select>
          </label>
          <label className="field"><span>How many people</span>
            <select value={people} onChange={(e) => setPeople(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <div className="field">
            <span>Chosen activities ({activities.length})</span>
            {activities.length === 0
              ? <div className="muted" style={{ fontSize: 13 }}>None yet — pick from the list on the left.</div>
              : <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{activities.map((a) => <li key={a}>{a.split(' — ')[0]}</li>)}</ul>}
          </div>
          <label className="field"><span>Anything else? (optional)</span><textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Dietary needs, accessibility, questions, partners joining…" /></label>
          <button className="btn btn-red" style={{ width: '100%' }} type="submit">{booking ? 'Update booking' : 'Request visit'}</button>
        </form>
      </div>

      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
