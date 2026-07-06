// Constructor University labs — media for the "labs behind the car" section
// on the Crew page. To add your own photos/videos: drop the files into
// /public/labs/ (create it if needed) and list them here. type: 'img' for
// photos (jpg/png/webp), 'video' for mp4/webm clips.

// 'img' = photo file, 'video' = local mp4/webm file, 'youtube' = a YouTube
// embed URL (https://www.youtube-nocookie.com/embed/<video-id>).
export type LabMedia = { src: string; type: 'img' | 'video' | 'youtube'; caption: string }

export const LAB_MEDIA: LabMedia[] = [
  { src: 'https://www.youtube-nocookie.com/embed/hzUvM25_dCU', type: 'youtube', caption: 'Watch — Constructor\'s racing programme on video' },
  { src: '/gallery/341.jpg', type: 'img', caption: 'Robotics on show around the A2RL paddock — the discipline the labs live and breathe' },
  { src: '/Engineering Garage Formula Poster.png', type: 'img', caption: 'From lab bench to garage — the crew working on the SF23' },
  { src: '/gallery/741.jpg', type: 'img', caption: 'Hands on the car — engineering under race-week pressure' },
]
