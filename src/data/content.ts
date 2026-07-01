// Editorial content: race spotlights, crew, Imola city, F1 history, ticket perks.
// Images are placeholders — drop real photos into /public and set `img` on a spotlight.

export type Spotlight = {
  id: string
  badge: string
  badgeClass: 'tag-red' | 'tag-blue' | 'tag-green' | 'tag-amber'
  title: string
  body: string
  meta: string
  img?: string // optional path under /public, e.g. '/spotlights/yas-2024.jpg'
}

export const SPOTLIGHTS: Spotlight[] = [
  {
    id: 's1',
    badge: 'Season Opener',
    badgeClass: 'tag-red',
    title: 'Yas Marina — the inaugural A2RL race',
    body: 'Eight university teams, no drivers, full-send. The first A2RL race set the benchmark for autonomous wheel-to-wheel racing. Constructor were in the mix.',
    meta: 'Abu Dhabi · 2024',
    img: '/Yas Marina.jpg',
  },
  {
    id: 's2',
    badge: 'Top Speed',
    badgeClass: 'tag-blue',
    title: '300+ km/h, no one behind the wheel',
    body: 'The autonomous land-speed record fell during the series — proof that the cars are getting genuinely, alarmingly fast on the straights.',
    meta: 'Record run · 2024',
    img: '/Formula on track.webp',
  },
  {
    id: 's3',
    badge: 'Wheel-to-wheel',
    badgeClass: 'tag-green',
    title: 'First autonomous overtake under racing conditions',
    body: 'The moment the field stopped doing laps and started racing each other. Software making a real, committed pass at speed.',
    meta: 'Highlight reel',
    img: '/Formula CT.jpg',
  },
  {
    id: 's4',
    badge: 'Constructor',
    badgeClass: 'tag-amber',
    title: 'Constructor University on the grid',
    body: 'The home team\'s run from the garage to the grid — the build, the long nights, and the autonomy stack that puts navy & red on track.',
    meta: 'Behind the scenes',
    img: '/Engineering Garage Formula Poster.png',
  },
]

export type Crew = {
  id: string
  name: string
  role: string
  color: string
  fact: string
}

export const CREW: Crew[] = [
  { id: 'c1', name: 'Bojana', role: 'Series Lead', color: '#0a1733', fact: 'Runs the whole campaign — guest list, outreach, and the final call on everything. Reviews every message before it goes out.' },
  { id: 'c2', name: 'Marco', role: 'Race Engineer', color: '#e23026', fact: 'Talks to the car more than to people. Can read a telemetry trace like a novel and will happily explain every line on a garage tour.' },
  { id: 'c3', name: 'Aiko', role: 'Autonomy Lead', color: '#1e9bf0', fact: 'Owns the perception + planning stack. Believes the best lap is the one the car finds that no human would have dared.' },
  { id: 'c4', name: 'Luca', role: 'Performance & Sim', color: '#16b981', fact: 'Lives in the simulator. Has driven more virtual Imola laps than anyone alive — and the car has driven even more.' },
  { id: 'c5', name: 'Priya', role: 'Systems & Safety', color: '#6a52d1', fact: 'The reason the car stops when it should. Keeps the fail-safes honest and the garage calm under pressure.' },
  { id: 'c6', name: 'Tomas', role: 'Garage & Logistics', color: '#f2a93b', fact: 'Gets the car, the crew, and the freight to the right place at the right time. The unsung MVP of every race weekend.' },
]

export const IMOLA = {
  // Gallery — set `img` to a file in /public (e.g. '/imola-autodromo.jpg') to show a photo.
  gallery: [
    { caption: 'Autodromo Enzo e Dino Ferrari — the main straight on race day', img: '/Autodromo Imola.jpg' },
    { caption: 'Rocca Sforzesca — the medieval fortress in Imola’s old town', img: '/Old town Imola.webp' },
    { caption: 'Bologna — the regional capital, 35 km away', img: '/Emilia Romagna.webp' },
  ],
  intro:
    'Imola sits in the Emilia-Romagna region of northern Italy, on the river Santerno between Bologna and the Adriatic coast. A compact, walkable town of about 70,000, it is known worldwide for one thing above all — its racing circuit — but there is a medieval heart, a Sforza castle, and some of Italy\'s best food waiting just beyond the paddock.',
  facts: [
    { n: '1953', t: 'The circuit opened', d: 'The Autodromo first hosted racing in 1953, named later for Enzo Ferrari and his son Dino.' },
    { n: '~70k', t: 'Population', d: 'A relaxed town that swells with hundreds of thousands of fans on a race weekend.' },
    { n: '4.9 km', t: 'Circuit length', d: 'Anti-clockwise, old-school, and one of the few classic tracks left on the calendar.' },
    { n: '5 zones', t: 'Wine country', d: 'You are in the heart of Sangiovese and Albana di Romagna country.' },
  ],
  todo: [
    { h: 'Rocca Sforzesca', p: 'The 14th-century Sforza fortress in the old town — moat, towers, and a small museum. The medieval counterweight to all that carbon fibre.' },
    { h: 'Walk the old circuit roads', p: 'Tamburello, Villeneuve, the Variante Alta — even off a race weekend you can feel the history walking the parkland the track runs through.' },
    { h: 'Piazza Matteotti & the centro', p: 'Aperitivo in the main square, porticoes, gelato, and the daily rhythm of an Emilian town.' },
    { h: 'Eat Romagnolo', p: 'Piadina flatbread, tortellini in brodo, tagliatelle al ragù, and Sangiovese. This is arguably the best food region in Italy.' },
  ],
  nearby: [
    { city: 'Bologna', dist: '~35 km · 30 min', note: 'The regional capital — porticoes, towers, and the oldest university in the world.' },
    { city: 'Faenza', dist: '~16 km · 15 min', note: 'World-famous for ceramics ("faience" is named after it).' },
    { city: 'Ravenna', dist: '~50 km · 45 min', note: 'Byzantine mosaics, a UNESCO World Heritage city, and Dante\'s tomb.' },
    { city: 'Modena', dist: '~70 km · 50 min', note: 'Balsamic vinegar, Ferrari, Pavarotti, and Osteria Francescana.' },
    { city: 'Florence', dist: '~100 km · 1h', note: 'The Renaissance capital, an easy day trip over the Apennines.' },
  ],
}

export type F1Event = { yr: string; title: string; note: string }
export const F1_HISTORY: F1Event[] = [
  { yr: '1980', title: 'First Italian GP at Imola', note: 'Imola hosted the Italian Grand Prix once, in 1980, before Monza returned to the calendar.' },
  { yr: '1981', title: 'San Marino GP begins', note: 'From 1981 the circuit hosted the San Marino Grand Prix — Italy\'s "second" F1 race, named for the nearby microstate.' },
  { yr: '1994', title: 'A weekend that changed F1', note: 'The darkest weekend in the sport: the loss of Roland Ratzenberger and Ayrton Senna led to sweeping, lasting safety reforms.' },
  { yr: '2006', title: 'End of the San Marino GP', note: 'The last San Marino Grand Prix was held in 2006 before Imola dropped off the calendar.' },
  { yr: '2020', title: 'F1 returns', note: 'Imola came back as the Emilia-Romagna Grand Prix, a fan and driver favourite for its old-school character.' },
  { yr: 'Now', title: 'A modern classic', note: 'One of the last true drivers\' circuits — narrow, fast, unforgiving, and steeped in history. The perfect stage for autonomous racing\'s next chapter.' },
]

export const TICKET_PERKS = [
  'Race-day grandstand VIP seat — main straight',
  'Paddock & pit-lane access pass',
  'Constructor lodge / lounge all weekend',
  'Guided VIP garage tour with the engineers',
  'Constructor VIP dinner (eve of race)',
  'Hospitality — brunch, drinks & catering',
]
