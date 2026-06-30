// Series agenda — four phases from the project plan.
// Testing days → Finals week → Race day → Abu Dhabi.

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
    id: 'testing1',
    accent: 'blue',
    dates: '21–27 July 2026',
    title: 'Testing · Window 1',
    summary: 'Relaxed garage days at Imola. See the car run, meet the engineers, and get an autonomous-racing primer. Open invite, low-key.',
    tier: 'Internal / relaxed',
    items: [
      { time: '10:00', what: 'Garage open · car reveal', where: 'Constructor garage, Imola paddock' },
      { time: '11:30', what: 'Guided garage tour + autonomy walk-through', where: 'Pit lane' },
      { time: '13:00', what: 'Light lunch with the engineering crew', where: 'Hospitality' },
      { time: '14:30', what: 'Live test session — watch from the wall', where: 'Pit wall' },
    ],
  },
  {
    id: 'testing2',
    accent: 'blue',
    dates: '2–11 August 2026',
    title: 'Testing · Window 2',
    summary: 'Second testing window — more track time, deeper engineering Q&A, and content capture as the car is dialled in for the finals.',
    tier: 'Internal / relaxed',
    items: [
      { time: '10:00', what: 'Garage open · setup briefing', where: 'Constructor garage' },
      { time: '12:00', what: 'Engineer fireside — the autonomy stack', where: 'Hospitality' },
      { time: '15:00', what: 'Extended test running', where: 'Full circuit' },
    ],
  },
  {
    id: 'finals',
    accent: 'amber',
    dates: '31 Aug – 4 Sep 2026',
    title: 'Finals Week — VIP Experience',
    summary: 'The curated, invite-only build-up. Lodge/lounge access, guided VIP garage tours, and the Constructor dinner the evening before the race.',
    tier: 'Executive / VIP',
    items: [
      { time: 'Thu', what: 'VIP arrivals · lodge & lounge check-in', where: 'Constructor Lodge, Imola' },
      { time: 'Fri 16:00', what: 'VIP guided garage tour + qualifying watch', where: 'Paddock' },
      { time: 'Fri 20:00', what: 'Constructor VIP dinner', where: 'Private venue, Imola hills' },
    ],
  },
  {
    id: 'raceday',
    accent: 'red',
    dates: 'Saturday 5 September 2026',
    title: 'Race Day — Imola Finals',
    summary: 'The headline moment. Grandstand VIP seats, paddock access, and the autonomous racing finale at the Autodromo.',
    tier: 'Executive / VIP',
    items: [
      { time: '11:00', what: 'VIP brunch + paddock access', where: 'Constructor hospitality' },
      { time: '13:30', what: 'Grid walk & final systems checks', where: 'Starting grid' },
      { time: '15:00', what: 'Lights out — A2RL Imola Final', where: 'Autodromo Enzo e Dino Ferrari' },
      { time: '17:30', what: 'Podium & celebration', where: 'Main straight' },
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
