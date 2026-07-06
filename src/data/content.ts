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
    title: 'First autonomous overtake on an F1 circuit',
    body: 'Inaugural race, Yas Marina 2024: Constructor\'s car commits to the pass at speed and makes history — the first autonomous overtake on an F1 circuit, en route to P2 in the league\'s first-ever race.',
    meta: 'Constructor Racing · Yas Marina · 2024',
    img: '/gallery/AR3.jpeg',
  },
  {
    id: 's4',
    badge: 'Constructor',
    badgeClass: 'tag-amber',
    title: 'Constructor University on the grid',
    body: 'The build, the long nights, and the autonomy stack that took navy & red to P2 in the league\'s first season and the six-car Grand Final in its second. Next stop: Imola.',
    meta: 'Behind the scenes',
    img: '/gallery/741.jpg',
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
  { yr: '2020', title: 'F1 returns', note: 'Imola came back as the Emilia-Romagna Grand Prix — a fan and driver favourite for its old-school character — and ran every season through 2025.' },
  { yr: '2025', title: 'The last Grand Prix (for now)', note: 'The May 2025 Emilia-Romagna GP proved to be the final F1 race at Imola: the circuit dropped off the 2026 calendar, its slot taken by the new Madrid street race.' },
  { yr: '2026', title: 'The big comeback — autonomous racing', note: 'Top-level racing returns to the Santerno valley: the A2RL autonomous racing series brings its testing days and finals to Imola. A historic circuit opens a brand-new chapter — no one behind the wheel.' },
]

// Constructor's road in autonomous racing — shown below the crew.
export type RacingMilestone = { yr: string; title: string; note: string }
export const CONSTRUCTOR_RACING_HISTORY: RacingMilestone[] = [
  { yr: '2020', title: 'Roborace roots', note: 'Before A2RL existed, the team (racing then as Acronis Rolos) fought at the front of Roborace\'s Season Beta — and was leading the series when it folded. The autonomous-racing pedigree starts here, not last week.' },
  { yr: '2024', title: 'A2RL is born — P2, and the first overtake', note: 'The Abu Dhabi Autonomous Racing League runs its first race at Yas Marina — full-size Super Formula cars, 250+ km/h, nobody driving. Constructor finishes second, 27 seconds behind the winner, and pulls off the first-ever autonomous overtake on an F1 circuit along the way.' },
  { yr: '2025', title: 'The world-first six-car Grand Final', note: 'Constructor Racing makes the grid for the largest autonomous race ever run — six driverless SF23s wheel-to-wheel at Yas Marina, in front of a full house. Only a handful of teams on the planet have ever done this. Ours is one of them.' },
  { yr: '2025', title: 'Taken out, not beaten', note: 'Racing hard in the Grand Final, the car is hit from behind mid-corner by a rival attempting an overtake — both cars out on the spot, through no fault of the Constructor stack. The pace was real; the finish never came. That one still stings in the garage.' },
  { yr: '2026', title: 'Imola — unfinished business', note: 'A2RL goes international for the first time, and Constructor arrives at the Autodromo fighting through qualification for a place on the grid — in the university\'s 25th-anniversary year. Testing in July and August. Finals, 5 September. Be there for the rematch.' },
]

export const TICKET_PERKS = [
  'Race-day grandstand VIP seat — main straight',
  'Paddock & pit-lane access pass',
  'Guided VIP garage tour with the engineers',
  'Constructor VIP dinner (eve of race)',
  'Hospitality — brunch, drinks & catering',
]
