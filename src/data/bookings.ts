// Central registry of garage-visit requests — one shared, synced list that
// the admin Visits page reads. Each guest has at most one live request
// (keyed by guest name); cancelling marks it rather than deleting, so the
// organisers see the change.

export type BookingRecord = {
  guest: string
  company: string
  email: string
  dayId: string
  day: string      // human label, e.g. "Tue 21 Jul"
  window: string   // "Testing · Window 1"
  people: number
  activities: string[]
  note: string
  ts: number
  status: 'requested' | 'cancelled'
}

export const BOOKINGS_KEY = 'cxa2rl.bookings'

// Fire-and-forget email notification to the racing inbox. Uses FormSubmit's
// AJAX endpoint (no account needed). Failures are swallowed — the booking
// is already saved in the backend either way.
export function emailBookingNotification(rec: BookingRecord) {
  fetch('https://formsubmit.co/ajax/autonomousracing@constructor.org', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `[A2RL Imola] Garage visit ${rec.status === 'cancelled' ? 'CANCELLED' : 'request'} — ${rec.guest} · ${rec.day}`,
      _template: 'table',
      Guest: rec.guest,
      Company: rec.company || '—',
      Email: rec.email || '—',
      Day: `${rec.day} (${rec.window})`,
      People: String(rec.people),
      Activities: rec.activities.length ? rec.activities.join(' • ') : '—',
      Note: rec.note || '—',
      Status: rec.status,
    }),
  }).catch(() => { /* backend copy is the source of truth */ })
}
