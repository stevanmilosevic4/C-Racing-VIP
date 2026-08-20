// Race-weekend agenda — the official ACI Racing Weekend timetable for
// Friday 4 and Saturday 5 September, with the A2RL finals slot on Saturday
// evening. All times local to Imola (CEST).

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
    title: 'Practice & Qualifying',
    summary: 'The racing weekend spins up: free practice and qualifying all day across the ACI series. Administrative checks and scrutineering run 09:00–12:00; the paddock is open to teams 08:00–20:00.',
    tier: 'Race weekend · Day 1',
    items: [
      { time: '08:45–09:10', what: 'Italian F4 (Series 1) — Free Practice' },
      { time: '09:20–09:45', what: 'Italian F4 (Series 2) — Free Practice' },
      { time: '09:55–10:45', what: 'FIA Formula Regional European Championship — Free Practice' },
      { time: '10:55–11:45', what: 'GT4 Italy Series — Free Practice' },
      { time: '11:55–12:55', what: 'CI Gran Turismo Endurance — Free Practice' },
      { time: '13:05–13:30', what: 'Italian F4 (Series 1) — Free Practice 2' },
      { time: '13:40–14:05', what: 'Italian F4 (Series 2) — Free Practice 2' },
      { time: '14:15–15:05', what: 'GT4 Italy Series — Free Practice 2' },
      { time: '15:15–15:30', what: 'FREC (Group A) — Qualifying 1' },
      { time: '15:35–15:50', what: 'FREC (Group B) — Qualifying 1' },
      { time: '16:00–17:00', what: 'CI Gran Turismo Endurance — Free Practice 2' },
      { time: '17:10–17:25', what: 'Italian F4 (Series 1) — Qualifying' },
      { time: '17:35–17:50', what: 'Italian F4 (Series 2) — Qualifying' },
      { time: '18:00–18:15', what: 'GT4 Italy Series — Qualifying 1' },
      { time: '18:25–18:40', what: 'GT4 Italy Series — Qualifying 2' },
    ],
  },
  {
    id: 'raceday',
    accent: 'red',
    dates: 'Saturday 5 September 2026',
    title: 'Race Day — Imola Finals',
    summary: 'The main day: garage tours, paddock access, hospitality — with real racing on track all day before our A2RL finals slot at 18:20. Watch it all from the Constructor VIP lounge.',
    tier: 'Executive / VIP',
    items: [
      { time: 'Daytime', what: 'VIP brunch · garage tours & paddock access', where: 'Constructor hospitality & garage' },
      { time: '08:45–09:45', what: 'Italian GT Endurance — Free Practice' },
      { time: '10:10', what: 'Formula Regional European Championship — Race 1 (30\' + 1 lap)' },
      { time: '11:10', what: 'Italian F4 — Race 1 (Groups B–C, 25\' + 1 lap)' },
      { time: '12:10', what: 'GT4 Italy Series — Race 1 (50\' + 1 lap)' },
      { time: '13:15–13:45', what: 'Break — promotional activity on track' },
      { time: '14:00–16:02', what: 'Italian GT Endurance — Qualifying (six 12-minute group sessions)' },
      { time: '16:30', what: 'Formula Regional — Race 2 (30\' + 1 lap)' },
      { time: '17:30', what: 'Italian F4 — Race 2 (Groups A–B, 25\' + 1 lap)' },
      { time: 'Pre-race', what: 'Grid walk & final systems checks', where: 'Starting grid' },
      { time: '18:20–19:20', what: 'A2RL — the autonomous racing finals · lights out 18:30', where: 'Autodromo Enzo e Dino Ferrari · Constructor VIP lounge' },
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
