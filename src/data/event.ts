// Core event dates for the A2RL series — now the Abu Dhabi testing leg at
// Yas Marina. Times are local to Abu Dhabi (GST, UTC+4) unless noted.
// Used by countdowns across the app.

export const EVENT = {
  series: 'A2RL Autonomous Racing — Abu Dhabi',
  partner: 'Constructor × A2RL',
  circuit: 'Yas Marina Circuit',
  city: 'Abu Dhabi, United Arab Emirates',
  // Imola final — kept for the record (Saturday 5 September 2026, 18:30 CEST)
  imolaFinal: '2026-09-05T18:30:00+02:00',
  // October testing: static setup from 5 Oct, on track from 8 Oct, and the
  // headline moment — both Constructor cars on track together — from 11 Oct.
  testingStart: '2026-10-08T10:00:00+04:00',
  twoCars: '2026-10-11T14:00:00+04:00',
  testingEnd: '2026-10-19T23:59:00+04:00',
  // Headline date for the home-page hero countdown
  raceDay: '2026-10-11T14:00:00+04:00',
  vipCapacity: 16,
} as const

export type CountdownTarget = { label: string; date: string; note: string }

export const COUNTDOWN_TARGETS: CountdownTarget[] = [
  { label: 'On track at Yas Marina', date: EVENT.testingStart, note: 'Thu 8 Oct · track phase begins' },
  { label: 'Two cars on track', date: EVENT.twoCars, note: 'Sun 11 Oct · a Constructor first' },
]
