// Constructor University labs — media for the "labs behind the car" section
// on the Crew page. To add your own photos/videos: drop the files into
// /public/labs/ (create it if needed) and list them here. type: 'img' for
// photos (jpg/png/webp), 'video' for mp4/webm clips.

// 'img' = photo file, 'video' = local mp4/webm file, 'youtube' = a YouTube
// embed URL (https://www.youtube-nocookie.com/embed/<video-id>).
export type LabMedia = { src: string; type: 'img' | 'video' | 'youtube'; caption: string }

export const LAB_MEDIA: LabMedia[] = [
  { src: '/gallery/1361.jpg', type: 'img', caption: 'Race engineering — eyes on the telemetry, hands off the wheel' },
  { src: '/gallery/741.jpg', type: 'img', caption: 'Hands on the car — engineering under race-week pressure' },
  { src: '/gallery/1201.jpg', type: 'img', caption: 'From lab bench to garage — the crew rolling the SF23 out' },
]
