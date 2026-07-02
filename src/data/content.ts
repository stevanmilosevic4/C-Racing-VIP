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
  { id: 'c1', name: 'Ilya Shimchik', role: 'Team Principal', color: '#0a1733', fact: 'Leads Constructor Racing — strategy, the crew, and the calls that count trackside.' },
  { id: 'c2', name: 'Alexander Buyval', role: 'Sr. Autonomous Driving Engineer', color: '#db4e3d', fact: 'Senior engineer on the autonomy stack — the perception, planning and control that put the car on the limit.' },
  { id: 'c3', name: 'Maksim Filipenko', role: 'Sr. Autonomous Driving Engineer', color: '#008ce2', fact: 'Builds and tunes the driving software that reads the track and commits to the racing line.' },
  { id: 'c4', name: 'Maksim Liubimov', role: 'Sr. Autonomous Driving Engineer', color: '#16b981', fact: 'Works across perception and planning — turning sensor data into fast, repeatable laps.' },
  { id: 'c5', name: 'Ruslan Mustafin', role: 'Sr. Autonomous Driving Engineer', color: '#6a52d1', fact: 'On the senior engineering crew keeping the car quick and the fail-safes honest.' },
  { id: 'c6', name: 'Vladislav Sarzheniuk', role: 'Sr. Autonomous Driving Engineer', color: '#f2a93b', fact: 'Senior autonomy engineer — long hours in the sim and at the pit wall dialling in pace.' },
  { id: 'c7', name: 'Giorgi Ambokadze', role: 'Autonomous Driving Engineer · Intern', color: '#0b63c4', fact: 'Rising talent on the autonomy team, shipping real code onto a race car.' },
  { id: 'c8', name: 'Gazanfar Babayev', role: 'Autonomous Driving Engineer · Intern', color: '#13a89e', fact: 'Learning fast between the garage and the simulator on the driving team.' },
  { id: 'c9', name: 'Danila Buival', role: 'Autonomous Driving Engineer · Intern', color: '#b73a2b', fact: 'On the team building the future of autonomous racing, one lap at a time.' },
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
