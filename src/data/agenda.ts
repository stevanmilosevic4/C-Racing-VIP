// Series agenda — race week at Imola. The A2RL final runs inside the ACI
// Racing Weekend (4–6 Sep): Friday is practice & qualifying for the human
// series, Saturday is the full track-action day ending with our 18:30
// final. Support-series times come from the official circuit timetable.

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
    id: 'friday',
    accent: 'amber',
    dates: 'Friday 4 September 2026',
    title: 'Friday — Practice & Qualifying',
    summary: 'A full day of ACI Racing Weekend track action — free practice and qualifying for the human-driven Italian series. Paddock open to teams 08:00–20:00; administrative checks and scrutineering 09:00–12:00. A great day to soak in the circuit before the big one.',
    tier: 'ACI Racing Weekend · info',
    items: [
      { time: '08:45', what: 'Italian F4 (Series 1) — Free Practice', where: 'until 09:10' },
      { time: '09:20', what: 'Italian F4 (Series 2) — Free Practice', where: 'until 09:45' },
      { time: '09:55', what: 'FIA Formula Regional European Championship — Free Practice', where: 'until 10:45' },
      { time: '10:55', what: 'GT4 Italy Series — Free Practice', where: 'until 11:45' },
      { time: '11:55', what: 'CI Gran Turismo Endurance — Free Practice', where: 'until 12:55' },
      { time: '13:05', what: 'Italian F4 (Series 1) — Free Practice 2', where: 'until 13:30' },
      { time: '13:40', what: 'Italian F4 (Series 2) — Free Practice 2', where: 'until 14:05' },
      { time: '14:15', what: 'GT4 Italy Series — Free Practice 2', where: 'until 15:05' },
      { time: '15:15', what: 'FREC (Group A) — Qualifying 1', where: 'until 15:30' },
      { time: '15:35', what: 'FREC (Group B) — Qualifying 1', where: 'until 15:50' },
      { time: '16:00', what: 'CI Gran Turismo Endurance — Free Practice 2', where: 'until 17:00' },
      { time: '17:10', what: 'Italian F4 (Series 1) — Qualifying', where: 'until 17:25' },
      { time: '17:35', what: 'Italian F4 (Series 2) — Qualifying', where: 'until 17:50' },
      { time: '18:00', what: 'GT4 Italy Series — Qualifying 1', where: 'until 18:15' },
      { time: '18:25', what: 'GT4 Italy Series — Qualifying 2', where: 'until 18:40' },
    ],
  },
  {
    id: 'raceday',
    accent: 'red',
    dates: 'Saturday 5 September 2026',
    title: 'Race Day — Imola Finals',
    summary: 'The main event. Garage tours, paddock access and hospitality run through the day, real racing fills the track from morning, and at 18:30 the A2RL Imola Final goes green — watched from our special VIP lounge.',
    tier: 'Executive / VIP',
    items: [
      { time: 'Daytime', what: 'VIP brunch · garage tours & paddock access', where: 'Constructor hospitality & garage' },
      { time: '08:45', what: 'Italian GT Endurance — Free Practice', where: 'until 09:45' },
      { time: '10:10', what: 'Formula Regional European Championship — Race 1', where: "30' + 1 lap" },
      { time: '11:10', what: 'Italian F4 — Race 1 (Groups B–C)', where: "25' + 1 lap" },
      { time: '12:10', what: 'GT4 Italy Series — Race 1', where: "50' + 1 lap" },
      { time: '13:15', what: 'Break — promotional activity on track', where: 'until 13:45' },
      { time: '14:00', what: 'Italian GT Endurance — Qualifying, six 12-minute sessions', where: 'G1 Q1 14:00 · G2 Q1 14:22 · G1 Q2 14:44 · G2 Q2 15:06 · G1 Q3 15:28 · G2 Q3 15:50' },
      { time: '16:30', what: 'Formula Regional — Race 2', where: "30' + 1 lap" },
      { time: '17:30', what: 'Italian F4 — Race 2 (Groups A–B)', where: "25' + 1 lap" },
      { time: 'Pre-race', what: 'Grid walk & final systems checks', where: 'Starting grid' },
      { time: '18:30', what: 'Lights out — A2RL Imola Final · watched from our special VIP lounge', where: 'A2RL window 18:20–19:20 · Constructor VIP lounge' },
      { time: 'After', what: 'Podium & celebration', where: 'Main straight' },
    ],
  },
  {
    id: 'abudhabi',
    accent: 'green',
    dates: 'October 2026 · date TBC',
    title: 'Abu Dhabi — Series Finale',
    summary: 'The series carries forward to the UAE. Same playbook, same crew — details and save-the-date to follow once the date is confirmed.',
    tier: 'Series continuation',
    items: [
      { time: 'TBC', what: 'Abu Dhabi save-the-date — coming soon', where: 'Yas Marina Circuit (expected)' },
    ],
  },
]
