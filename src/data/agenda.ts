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
    summary: 'Flexible test days at Imola — no fixed timetable. What runs when is decided in the moment, based on how the car is behaving. Tell us which day you\'re coming and how many you are (use Book a Visit), so we can arrange a tour guide for your group.',
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
    summary: 'Second window — same spirit as July: flexible, decided in the moment. More track running as the car is dialled in for the finals; garage and facility tours available every day. Book your day and group size and we\'ll take care of the rest.',
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
    title: 'Finals Week',
    summary: 'Simpler than the testing windows: our static base all week is the garage. A short drive-around (30–60 minutes) may happen before race day, schedule permitting. Final test runs are strictly limited — the car goes out once or twice at most, so catching one is a genuine privilege.',
    tier: 'Executive / VIP',
    items: [
      { time: 'All week', what: 'Garage base — visits, tours & meet the crew', where: 'Constructor garage, Imola paddock' },
      { time: 'If possible', what: 'Drive-around, 30–60 min — before race day', where: 'Circuit · schedule permitting' },
      { time: 'Once or twice', what: 'Final test runs — strict, limited access', where: 'Pit wall · confirmed on the day' },
    ],
  },
  {
    id: 'raceday',
    accent: 'red',
    dates: 'Saturday 5 September 2026',
    title: 'Race Day — Imola Finals',
    summary: 'The main action of the whole summer. Grandstand seats, garage and paddock access, and the autonomous racing finale at the Autodromo. Exact times will follow once A2RL publishes the official race-day schedule.',
    tier: 'Executive / VIP',
    items: [
      { time: 'Morning', what: 'VIP brunch · garage & paddock access', where: 'Constructor hospitality' },
      { time: 'Midday', what: 'Grid walk & final systems checks', where: 'Starting grid' },
      { time: 'Afternoon', what: 'Lights out — A2RL Imola Final', where: 'Autodromo Enzo e Dino Ferrari' },
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
