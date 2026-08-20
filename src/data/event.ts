// Core event dates for the A2RL Imola series.
// Times are local to Imola (CEST, UTC+2). Used by countdowns across the app.

export const EVENT = {
  series: 'A2RL Autonomous Racing — Imola Series',
  partner: 'Constructor × A2RL',
  circuit: 'Autodromo Enzo e Dino Ferrari',
  city: 'Imola, Emilia-Romagna, Italy',
  // Headline race day — Saturday 5 September 2026, race start 18:30 local (confirmed)
  raceDay: '2026-09-05T18:30:00+02:00',
  // Testing windows (relaxed garage days)
  testing1Start: '2026-07-21T09:00:00+02:00',
  testing2Start: '2026-08-02T09:00:00+02:00',
  // Abu Dhabi leg — October (date TBC), placeholder mid-October
  abuDhabi: '2026-10-17T16:00:00+04:00',
  vipCapacity: 16,
} as const

export type CountdownTarget = { label: string; date: string; note: string }

export const COUNTDOWN_TARGETS: CountdownTarget[] = [
  { label: 'Practice & Qualifying', date: '2026-09-04T08:45:00+02:00', note: 'Fri 4 Sep · Imola' },
  { label: 'A2RL Imola Final', date: EVENT.raceDay, note: 'Sat 5 Sep · 18:30' },
]
