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

// Fire-and-forget email notification to the racing inbox, sent by our
// Vercel function via Resend (from the verified weareconstructor.com
// domain). Failures are swallowed — the booking is already saved in the
// backend either way.
export function emailBookingNotification(rec: BookingRecord) {
  fetch('/api/notify-booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rec),
  }).catch(() => { /* backend copy is the source of truth */ })
}
