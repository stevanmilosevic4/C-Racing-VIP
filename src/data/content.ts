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
    img: '/gallery/1011.jpg',
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
    body: 'The build, the long nights, and the autonomy stack that took navy & red to P2 in the league\'s first season and the six-car Grand Final in its second — and to Imola for A2RL\'s international debut. Next stop: home again, Yas Marina.',
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
  photo?: string // headshot under /public/crew
}

export const CREW: Crew[] = [
  { id: 'c1', name: 'Ilya Shimchik', role: 'Team Principal', color: '#0a1733', photo: '/crew/ilya.jpg', fact: 'Leads Constructor Racing — strategy, the crew, and the calls that count trackside.' },
  { id: 'c10', name: 'Andreas Birk', role: 'Research Lead · Professor, Constructor University', color: '#0b63c4', photo: '/crew/birk.jpg', fact: 'Professor at Constructor University in Bremen — the bridge between the campus robotics labs and the pit lane, leading the research behind the racing stack.' },
  { id: 'c2', name: 'Alexander Buyval', role: 'Sr. Autonomous Driving Engineer', color: '#db4e3d', photo: '/crew/buyval.jpg', fact: 'Senior engineer on the autonomy stack — the perception, planning and control that put the car on the limit.' },
  { id: 'c3', name: 'Maksim Filipenko', role: 'Sr. Autonomous Driving Engineer', color: '#008ce2', photo: '/crew/filipenko.jpg', fact: 'Builds and tunes the driving software that reads the track and commits to the racing line.' },
  { id: 'c4', name: 'Maksim Liubimov', role: 'Sr. Autonomous Driving Engineer', color: '#16b981', photo: '/crew/liubimov.jpg', fact: 'Works across perception and planning — turning sensor data into fast, repeatable laps.' },
  { id: 'c5', name: 'Ruslan Mustafin', role: 'Sr. Autonomous Driving Engineer', color: '#6a52d1', fact: 'On the senior engineering crew keeping the car quick and the fail-safes honest.' },
  { id: 'c6', name: 'Vladislav Sarzheniuk', role: 'Sr. Autonomous Driving Engineer', color: '#f2a93b', photo: '/crew/sarzheniuk.jpg', fact: 'Senior autonomy engineer — long hours in the sim and at the pit wall dialling in pace.' },
  { id: 'c7', name: 'Giorgi Ambokadze', role: 'Autonomous Driving Engineer · Intern', color: '#0b63c4', fact: 'Rising talent on the autonomy team, shipping real code onto a race car.' },
  { id: 'c8', name: 'Gazanfar Babayev', role: 'Autonomous Driving Engineer · Intern', color: '#13a89e', fact: 'Learning fast between the garage and the simulator on the driving team.' },
  { id: 'c9', name: 'Danila Buival', role: 'Autonomous Driving Engineer · Intern', color: '#b73a2b', fact: 'On the team building the future of autonomous racing, one lap at a time.' },
]

export const ABU_DHABI = {
  // Gallery — real shots; drop more photos into /public and point `img` at them.
  gallery: [
    { caption: 'Yas Marina Circuit — A2RL\'s home track, racing under floodlights', img: '/Yas Marina.jpg' },
    { caption: 'The pit lane at dusk — Track Time runs 14:00 to midnight', img: '/gallery/971.jpg' },
    { caption: 'Constructor in the Yas Marina garage', img: '/gallery/741.jpg' },
  ],
  intro:
    'Abu Dhabi is the capital of the United Arab Emirates — a modern island city on the Arabian Gulf, and the birthplace of A2RL. The action happens on Yas Island: a purpose-built entertainment district where the circuit, hotels, theme parks and the marina all sit within a few minutes of each other. In October the weather is warm and dry, which is exactly why our track running goes from afternoon deep into the floodlit night.',
  facts: [
    { n: '2009', t: 'Yas Marina opens', d: 'Purpose-built on Yas Island, the circuit has hosted Formula 1\'s season finale — the Abu Dhabi Grand Prix — since 2009.' },
    { n: '5.28 km', t: 'Circuit length', d: '16 corners since the 2021 reconfiguration, famous for twilight racing under floodlights with the W hotel straddling the track.' },
    { n: '2024', t: 'A2RL was born here', d: 'The first-ever A2RL race ran at Yas Marina in April 2024 — Constructor took P2 and the first autonomous overtake on an F1 circuit.' },
    { n: '~33°C', t: 'October days', d: 'Warm and sunny with mild evenings — Track Time runs 14:00–00:00 so the fastest laps come after dark.' },
  ],
  todo: [
    { h: 'Yas Island itself', p: 'Ferrari World (home of the world\'s fastest roller coaster), Warner Bros. World, Yas Waterworld, SeaWorld and Yas Mall — all a few minutes from the paddock. Evenings end at Yas Bay\'s waterfront restaurants.' },
    { h: 'Sheikh Zayed Grand Mosque', p: 'One of the world\'s largest and most beautiful mosques — 82 domes, reflective pools and white marble. Go at sunset; free entry, modest dress required (provided on site).' },
    { h: 'Louvre Abu Dhabi', p: 'Jean Nouvel\'s floating dome on Saadiyat Island, with its famous "rain of light" — a world-class museum 25 minutes from Yas.' },
    { h: 'The Corniche & Qasr Al Watan', p: 'Eight kilometres of waterfront promenade downtown, plus the working presidential palace — opulent, vast, and open to visitors.' },
  ],
  nearby: [
    { city: 'Yas Island', dist: 'you are here', note: 'Circuit, hotels, theme parks, mall and marina — everything within ~10 minutes.' },
    { city: 'Saadiyat Island', dist: '~20 min', note: 'Louvre Abu Dhabi, white-sand beaches and the cultural district.' },
    { city: 'Downtown & Corniche', dist: '~30 min', note: 'The city centre — Qasr Al Hosn, Emirates Palace and the waterfront.' },
    { city: 'Dubai', dist: '~1 h', note: 'Burj Khalifa, the Dubai Mall and the marina — an easy day trip up the coast.' },
    { city: 'Al Ain', dist: '~90 min', note: 'The UNESCO-listed oasis city at the foot of Jebel Hafeet — the green side of the Emirates.' },
  ],
}

export type F1Event = { yr: string; title: string; note: string }
export const F1_HISTORY: F1Event[] = [
  { yr: '2009', title: 'Yas Marina opens', note: 'The circuit debuts as Formula 1\'s first day-into-night race and becomes the championship\'s season finale.' },
  { yr: '2010', title: 'The first title decider', note: 'Four drivers arrive with a shot at the championship; Sebastian Vettel leaves as F1\'s youngest-ever world champion. Yas Marina becomes the place where seasons are settled.' },
  { yr: '2021', title: 'The most dramatic finale in F1 history', note: 'Verstappen passes Hamilton on the final lap of the final race for the title. The same year, the circuit is reconfigured — 16 faster, more open corners built for overtaking.' },
  { yr: '2024', title: 'A2RL — a new kind of racing is born', note: 'The world\'s first full-size autonomous racing league launches at Yas Marina: Super Formula cars, no drivers. Constructor finishes P2 with the first-ever autonomous overtake on an F1 circuit.' },
  { yr: '2025', title: 'The six-car Grand Final', note: 'The largest autonomous race ever run — six driverless SF23s wheel-to-wheel under the Yas Marina lights.' },
  { yr: '2026', title: 'The series comes home', note: 'After A2RL\'s first international race at Imola, the season returns to Yas Marina — and from October testing, Constructor fields two cars for the first time.' },
]

// Constructor's road in autonomous racing — shown below the crew.
export type RacingMilestone = { yr: string; title: string; note: string }
export const CONSTRUCTOR_RACING_HISTORY: RacingMilestone[] = [
  { yr: '2018', title: 'The beginning — Atlas Racing', note: 'The team starts developing and testing autonomous driving algorithms in Roborace under the name Atlas Racing, joining Constructor a year later. The pedigree starts here — this crew has been racing without drivers longer than almost anyone on the planet.' },
  { yr: '2022', title: 'Champions of Roborace', note: 'After winning multiple races and leading most of the 2021 season, the team takes the Roborace Season Beta title. Before A2RL even existed, Constructor Racing were already autonomous racing champions.' },
  { yr: '2024', title: 'A2RL arrives — P2, and the first overtake', note: 'The Abu Dhabi Autonomous Racing League runs its first race at Yas Marina — full-size Super Formula cars, nobody driving. Constructor finishes second, 27 seconds behind the winner, and pulls off the first-ever autonomous overtake on an F1 circuit along the way.' },
  { yr: '2025', title: 'The world-first six-car Grand Final', note: 'Constructor Racing makes the grid for the largest autonomous race ever run — six driverless SF23s wheel-to-wheel at Yas Marina. Racing hard until hit from behind mid-corner by a rival\'s failed overtake, the car is classified sixth. The pace was real; the finish never came.' },
  { yr: '2026', title: 'Imola — the international debut', note: 'A2RL goes international for the first time, and Constructor takes on the Autodromo Enzo e Dino Ferrari in the university\'s 25th-anniversary year — a summer of testing crowned by the 5 September final, with more than a hundred VIP guests in the crew.' },
  { yr: '2026', title: 'Back home — two cars at Yas Marina', note: 'October testing in Abu Dhabi marks a Constructor first: two cars, with #8 "Constructor AI" joined by its brand-new sister car, building to the season finale where it all began.' },
]

export const TICKET_PERKS = [
  'Race day in the special Constructor VIP lounge',
  'Paddock & pit-lane access pass',
  'Guided VIP garage tour with the engineers',
  'Constructor VIP dinner (eve of race)',
  'Hospitality — brunch, drinks & catering',
]
