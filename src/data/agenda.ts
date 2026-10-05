// Series agenda — the October testing leg at Yas Marina, Abu Dhabi.
// From this window Constructor fields TWO cars. Guests are welcome on any
// test day (a team member accompanies every visit); 11–14 Oct Track Time
// days are the best ones to come. Times are local Abu Dhabi (GST).

export type AgendaItem = { time: string; what: string; where?: string }
export type Phase = {
  id: string
  accent: 'blue' | 'red' | 'green' | 'amber'
  dates: string
  title: string
  summary: string
  tier: string
  items: AgendaItem[]
}

export const PHASES: Phase[] = [
  {
    id: 'setup',
    accent: 'blue',
    dates: 'Mon 5 – Sat 10 October 2026',
    title: 'Setting Up — Garage & First Laps',
    summary: 'The team lands at Yas Marina and builds up to the big week: static preparation days in the garage, the shakedown of the second car, then the move to the track with a pro-driver seminar and the Sim Sprint Final.',
    tier: 'Testing · Yas Marina',
    items: [
      { time: '5–7 Oct', what: 'Static preparation days — garage build-up & systems checks', where: 'Shakedown of the new second car · 6–7 Oct' },
      { time: '8 Oct', what: 'Move to the track — first running', where: 'Seminar & driving coaching with a pro driver' },
      { time: '9–10 Oct', what: 'Static days at the track', where: 'Yas Marina paddock' },
      { time: '10 Oct', what: 'Sim Sprint Final', where: 'Yas Marina' },
    ],
  },
  {
    id: 'tracktime',
    accent: 'red',
    dates: 'Sun 11 – Mon 19 October 2026',
    title: 'Track Time — Two Cars, Best Days to Visit',
    summary: 'The heart of the testing window — and a Constructor first: from 11 October we run TWO cars, with car #8 "Constructor AI" joined by its brand-new sister car. Track sessions run 14:00 to midnight daily. These are the best days to come and see the team at work.',
    tier: 'Guests welcome · book a visit',
    items: [
      { time: '11 Oct', what: 'Both Constructor cars on track together — a first for the team', where: 'Track Time 14:00–00:00' },
      { time: '12–14 Oct', what: 'Track Time — the prime guest & media days', where: 'Daily 14:00–00:00' },
      { time: '15 Oct', what: 'Rest day — no running', where: 'Garage closed' },
      { time: '16–17 Oct', what: 'Track Time continues', where: 'Daily 14:00–00:00' },
      { time: '18 Oct', what: 'Static day — garage work, no track running', where: 'Yas Marina paddock' },
      { time: '19 Oct', what: 'Track Time — final day of the window', where: '14:00–00:00' },
    ],
  },
  {
    id: 'imola',
    accent: 'green',
    dates: 'Completed · 5 September 2026',
    title: 'Imola — The Grand Final',
    summary: 'A2RL\'s international debut at the Autodromo Enzo e Dino Ferrari — and a podium: Constructor finished P2. Thank you for being part of it.',
    tier: 'Season memory · P2 🥈',
    items: [],
  },
]
