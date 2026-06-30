// A2RL participating teams — seeded from the inaugural 2024 grid at Yas Marina.
// Constructor University is the host brand's own entry (formerly Jacobs University Bremen).
// Edit / extend this list as the 2026 Imola grid is confirmed.

export type Team = {
  id: string
  name: string
  short: string
  country: string
  flag: string
  university: string
  color: string
  est: string
  lastYear: string
  drivers: string // AI stack / lead
  blurb: string
}

export const TEAMS: Team[] = [
  {
    id: 'constructor',
    name: 'Constructor University',
    short: 'CU',
    country: 'Germany',
    flag: '🇩🇪',
    university: 'Constructor University, Bremen',
    color: '#e23026',
    est: '2001',
    lastYear: '5th',
    drivers: 'First-ever autonomous overtake',
    blurb: 'The home team. Constructor University (formerly Jacobs University Bremen) marks 25 years in 2026 and brings its own autonomy stack to the grid — research-led, full-stack, and unmistakably navy & red.',
  },
  {
    id: 'tum',
    name: 'TUM Autonomous Motorsport',
    short: 'TUM',
    country: 'Germany',
    flag: '🇩🇪',
    university: 'Technical University of Munich',
    color: '#0b63c4',
    est: '2018',
    lastYear: '1st 🏆',
    drivers: 'Defending champions',
    blurb: 'Reigning A2RL champions and Indy Autonomous Challenge veterans. The benchmark for the field — clinical, fast, and very hard to beat on a flying lap.',
  },
  {
    id: 'polimove',
    name: 'PoliMOVE-MSU',
    short: 'PM',
    country: 'Italy / USA',
    flag: '🇮🇹',
    university: 'Politecnico di Milano + Michigan State',
    color: '#13a89e',
    est: '2021',
    lastYear: '2nd',
    drivers: 'Top-speed record holders',
    blurb: 'Holders of the autonomous land-speed record (>309 km/h). On home Italian soil at Imola, expect PoliMOVE to push the absolute pace.',
  },
  {
    id: 'unimore',
    name: 'Unimore Racing',
    short: 'UR',
    country: 'Italy',
    flag: '🇮🇹',
    university: 'University of Modena & Reggio Emilia',
    color: '#f2a93b',
    est: '2022',
    lastYear: '4th',
    drivers: 'AImotion lab',
    blurb: 'Emilia-Romagna locals from Modena — a stone\'s throw from the circuit. Strong on perception and the spiritual home crowd favourite in the valley.',
  },
  {
    id: 'kaist',
    name: 'KAIST',
    short: 'KA',
    country: 'South Korea',
    flag: '🇰🇷',
    university: 'Korea Advanced Institute of Science & Tech',
    color: '#6a52d1',
    est: '2020',
    lastYear: '3rd',
    drivers: 'Save Lab',
    blurb: 'Methodical and consistent, KAIST converts clean laps into points. A podium threat whenever the conditions get tricky.',
  },
  {
    id: 'flyeagle',
    name: 'Fly Eagle',
    short: 'FE',
    country: 'China',
    flag: '🇨🇳',
    university: 'Beijing Institute of Technology',
    color: '#16b981',
    est: '2023',
    lastYear: '6th',
    drivers: 'BIT autonomy group',
    blurb: 'Aggressive newcomers with rapid year-on-year gains. The team most likely to spring a surprise on race day.',
  },
  {
    id: 'code19',
    name: 'Code19 Racing',
    short: 'C19',
    country: 'USA',
    flag: '🇺🇸',
    university: 'Independent (North America)',
    color: '#1e9bf0',
    est: '2021',
    lastYear: '7th',
    drivers: 'Indie autonomy collective',
    blurb: 'An independent collective punching above its weight. Lean, scrappy, and a fan favourite for the underdog story.',
  },
  {
    id: 'tii',
    name: 'TII EuroRacing',
    short: 'TII',
    country: 'UAE / Italy',
    flag: '🇦🇪',
    university: 'Technology Innovation Institute',
    color: '#0b1e3d',
    est: '2022',
    lastYear: '8th',
    drivers: 'A2RL host programme',
    blurb: 'Backed by the A2RL host institute, blending UAE ambition with European racing know-how. The bridge between Imola and the Abu Dhabi finale.',
  },
]
