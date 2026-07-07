// A2RL 2026 — the real Imola field (announced 29 June 2026).
// Up to five SF23-based autonomous cars race at the Autodromo on 5 September:
// TUM, PoliMOVE and Unimore qualified via their 2025 season; Kinetiz and
// Constructor Racing battle through the qualification events for the
// remaining grid spots. The season concludes at Yas Marina, Abu Dhabi.

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
    name: 'Constructor Racing',
    short: 'CR',
    country: 'Germany',
    flag: '🇩🇪',
    university: 'Constructor University, Bremen',
    color: '#e23026',
    est: '2018',
    lastYear: '6th · Grand Final',
    drivers: 'Roborace champions · P2 in A2RL Season 1',
    blurb: 'The home team — with the longest autonomous-racing pedigree on the grid: racing since 2018, champions of Roborace in 2022, P2 in A2RL\'s inaugural 2024 race with the first-ever autonomous overtake on an F1 circuit, then taken out of last season\'s six-car Grand Final by contact from behind. Imola, in the university\'s 25th-anniversary year, is the rematch.',
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
    drivers: 'Two-time champions · qualified',
    blurb: 'Back-to-back A2RL champions — winners of the inaugural 2024 race and the 2025 six-car Grand Final — and Indy Autonomous Challenge veterans. The benchmark for the field: clinical, fast, and very hard to beat on a flying lap.',
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
    lastYear: '3rd 🥉',
    drivers: 'Speed-record holders · qualified',
    blurb: 'Holders of the autonomous land-speed record (>309 km/h) and podium finishers in last season\'s Grand Final. On home Italian soil at Imola, expect PoliMOVE to push the absolute pace.',
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
    lastYear: 'Grand Final · DNF',
    drivers: 'Qualified · home-soil favourites',
    blurb: 'Emilia-Romagna locals from Modena — a stone\'s throw from the circuit, and qualified for Imola on their 2025 season. Bold on the brakes (ask Constructor about lap 12 of the Grand Final) and the home crowd favourite in the valley.',
  },
  {
    id: 'kinetiz',
    name: 'Kinetiz',
    short: 'KZ',
    country: 'UAE',
    flag: '🇦🇪',
    university: 'Independent (UAE)',
    color: '#6a52d1',
    est: '2025',
    lastYear: '4th',
    drivers: 'Fighting for an Imola grid spot',
    blurb: 'The UAE\'s own entry and the fastest-rising newcomer — fourth in last season\'s Grand Final after recovering from a spin on cold tyres. Battling Constructor through qualification for the final places on the Imola grid.',
  },
]
