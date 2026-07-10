// Series agenda — deliberately flexible: testing runs are decided in the
// moment (car readiness, weather), so items carry day-ranges and labels
// instead of clock times. Race day gets exact times once A2RL publishes
// the official schedule.

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
    summary: 'Flexible test days at Imola — no fixed timetable. What runs when is decided in the moment, based on how the car is behaving. Coming by? Let your Constructor contact know which day and how many you are, so a tour guide can be arranged.',
    tier: 'Internal / relaxed',
    items: [
      { time: '21–23 Jul', what: 'Garage days — the car stays inside', where: 'Constructor garage · static work, see the SF23 and the crew up close' },
      { time: 'From 24 Jul', what: 'Track testing begins — watch the car run', where: 'Pit wall · run times decided day by day' },
      { time: 'Any day', what: 'Guided tour — the car, the garage, the facilities around the track', where: 'Imola paddock' },
    ],
  },
  {
    id: 'testing2',
    accent: 'blue',
    dates: '2–11 August 2026',
    title: 'Testing · Window 2',
    summary: 'Second window — same spirit as July: flexible, decided in the moment. More track running as the car is dialled in for the finals; garage and facility tours available every day. Let your Constructor contact know your day and group size and we\'ll take care of the rest.',
    tier: 'Internal / relaxed',
    items: [
      { time: 'Daily', what: 'Garage open — watch the crew at work', where: 'Constructor garage' },
      { time: 'Track days', what: 'Test running — watch from the pit wall', where: 'Timing decided in the moment' },
      { time: 'Any day', what: 'Guided tour — car, garage, facilities', where: 'Imola paddock' },
    ],
  },
  {
    id: 'finals',
    accent: 'amber',
    dates: '31 Aug – 4 Sep 2026',
    title: 'Race Week — Behind the Scenes',
    summary: 'The quiet build-up: the crew moves into the garage and dials the car in for Saturday. This week is heads-down preparation — garage tours and guest visits happen on race day itself, 5 September.',
    tier: 'Team preparation',
    items: [
      { time: '', what: 'The crew preps the car — setup, systems, sim work', where: 'Constructor garage, Imola paddock' },
      { time: '', what: 'Possible short drive-around before race day', where: 'Circuit · schedule permitting' },
      { time: '', what: 'Final test runs — once or twice at most', where: 'Track · timing decided by the team' },
    ],
  },
  {
    id: 'raceday',
    accent: 'red',
    dates: 'Saturday 5 September 2026',
    title: 'Race Day — Imola Finals',
    summary: 'The main action of the whole summer — and the day for everything: garage tours, paddock access, hospitality, and the autonomous racing finale. The circuit runs the ACI Racing Weekend around us, so there\'s real racing on track all day before our 18:30 start.',
    tier: 'Executive / VIP',
    items: [
      { time: 'All day', what: 'ACI Racing Weekend on track — human-driven Italian championship races, watch as you like', where: 'Circuit · info only, no booking needed' },
      { time: 'Daytime', what: 'VIP brunch · garage tours & paddock access', where: 'Constructor hospitality & garage' },
      { time: 'Pre-race', what: 'Grid walk & final systems checks', where: 'Starting grid' },
      { time: '18:30', what: 'Lights out — A2RL Imola Final · watched from our special VIP lounge', where: 'Autodromo Enzo e Dino Ferrari · Constructor VIP lounge' },
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
