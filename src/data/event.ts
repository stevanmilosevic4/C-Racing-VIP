// Core event dates for the A2RL Imola series.
// Times are local to Imola (CEST, UTC+2). Used by countdowns across the app.

export const EVENT = {
  series: 'A2RL Autonomous Racing — Imola Series',
  partner: 'Constructor × A2RL',
  circuit: 'Autodromo Enzo e Dino Ferrari',
  city: 'Imola, Emilia-Romagna, Italy',
  // Headline race day — Saturday 5 September 2026, 15:00 local
  raceDay: '2026-09-05T15:00:00+02:00',
  // Testing windows (relaxed garage days)
  testing1Start: '2026-07-21T09:00:00+02:00',
  testing2Start: '2026-08-02T09:00:00+02:00',
  // Abu Dhabi leg — October (date TBC), placeholder mid-October
  abuDhabi: '2026-10-17T16:00:00+04:00',
  vipCapacity: 16,
} as const

export type CountdownTarget = { label: string; date: string; note: string }

export const COUNTDOWN_TARGETS: CountdownTarget[] = [
  { label: 'Testing · Window 1', date: EVENT.testing1Start, note: '21–27 Jul · Imola' },
  { label: 'Testing · Window 2', date: EVENT.testing2Start, note: '2–11 Aug · Imola' },
]
