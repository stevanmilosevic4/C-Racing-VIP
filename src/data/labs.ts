// Constructor University labs — media for the "labs behind the car" section
// on the Crew page. Campus photos live in /public/labs (converted from the
// original iPhone HEIC uploads); the tail items are from the race side, to
// bridge lab bench → pit lane. To add more: drop files into /public/labs/
// and list them here. type: 'img' | 'video' (local mp4) | 'youtube' (embed URL).

export type LabMedia = { src: string; type: 'img' | 'video' | 'youtube'; caption: string }

export const LAB_MEDIA: LabMedia[] = [
  // — on campus: the actual Constructor University labs, Bremen —
  { src: '/labs/img_1896.jpg', type: 'img', caption: 'The Constructor University robot family — humanoids, a robot dog and friends, at home on the Bremen campus' },
  { src: '/labs/img_1876.jpg', type: 'img', caption: 'A robot arm in the university robotics lab — precise, repeatable motion is the foundation of autonomy' },
  { src: '/labs/img_1878.jpg', type: 'img', caption: 'Path-following on the lab bench — the same problem as a racing line, at desk scale' },
  { src: '/labs/img_1911.jpg', type: 'img', caption: 'Students driving twin robot arms — control loops you can shake hands with' },
  { src: '/labs/img_1912.jpg', type: 'img', caption: 'Manipulation practice — millimetre precision, the discipline behind 250 km/h confidence' },
  { src: '/labs/img_1880.jpg', type: 'img', caption: 'Code first, motion second — programming a lab robot, exactly how the race car is "driven"' },
  { src: '/labs/img_1875.jpg', type: 'img', caption: 'Vision markers in the perception lab — how machines learn to know exactly where they are' },
  // — and where it ends up: the race side —
  { src: '/gallery/1361.jpg', type: 'img', caption: 'Race engineering — eyes on the telemetry, hands off the wheel' },
  { src: '/gallery/741.jpg', type: 'img', caption: 'Hands on the car — engineering under race-week pressure' },
  { src: '/gallery/1201.jpg', type: 'img', caption: 'From lab bench to garage — the crew rolling the SF23 out' },
]
