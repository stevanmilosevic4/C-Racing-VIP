// Project calendar — seeded from the Constructor × A2RL Project Calendar PDF.
// Months: July / August / September 2026. "You" in the source doc = Bojana.

export type CalOwner = 'Event' | 'Bojana' | 'Comms' | 'HR' | 'David' | 'Stevan' | 'Concierge'

export type CalEntry = {
  id: string
  month: 7 | 8 | 9 // 2026
  day: number
  owner: CalOwner
  text: string
}

export const OWNER_COLORS: Record<CalOwner, string> = {
  Event: '#db4e3d',
  Bojana: '#1c2747',
  Comms: '#0b63c4',
  HR: '#16b981',
  David: '#008ce2',
  Stevan: '#f2a93b',
  Concierge: '#6a52d1',
}

export const OWNERS: CalOwner[] = ['Event', 'Bojana', 'Comms', 'HR', 'David', 'Stevan', 'Concierge']

// Days on track (tinted like the PDF): testing windows + finals week.
export function isTrackDay(month: number, day: number): boolean {
  if (month === 7) return day >= 21 && day <= 27
  if (month === 8) return (day >= 2 && day <= 11) || day === 31
  if (month === 9) return day >= 1 && day <= 5
  return false
}

let n = 0
const e = (month: 7 | 8 | 9, day: number, owner: CalOwner, text: string): CalEntry =>
  ({ id: `seed-${++n}`, month, day, owner, text })

export const SEED_CALENDAR: CalEntry[] = [
  // ---- July 2026 ----
  e(7, 6, 'Event', 'PROJECT KICK-OFF — brief Comms, HR, David, Stevan'),
  e(7, 6, 'Comms', 'Send ecosystem calendar HOLDS (do first)'),
  e(7, 6, 'Bojana', 'Start VIP list (draft v1)'),
  e(7, 7, 'David', 'Review SMM + start posting plan'),
  e(7, 7, 'Stevan', 'App check: countdown, Predict, garage booking live'),
  e(7, 7, 'Bojana', 'Draft event budget → Öznur sign-off'),
  e(7, 8, 'Comms', 'Draft ecosystem invitation (copy + assets)'),
  e(7, 8, 'Bojana', 'Confirm with A2RL: VIP access, branding, media rules'),
  e(7, 8, 'David', 'Book photographer / videographer (testing + finals)'),
  e(7, 9, 'Comms', 'Finalise distribution list (partners)'),
  e(7, 9, 'HR', 'Finalise internal/staff list'),
  e(7, 9, 'Comms', 'Finalise + PUBLISH landing page (before invite)'),
  e(7, 10, 'Comms', 'Start media list'),
  e(7, 10, 'David', 'Posting plan v1 → Bojana'),
  e(7, 10, 'Bojana', 'Öznur sign-off: guest list + messaging'),
  e(7, 13, 'Comms', 'ECOSYSTEM INVITATION out · RSVP opens'),
  e(7, 13, 'HR', 'Internal staff announcement'),
  e(7, 13, 'David', "Launch post #1 — 'No drivers. Full speed.'"),
  e(7, 14, 'Bojana', 'Circulate VIP one-pager to guests'),
  e(7, 14, 'Concierge', 'Open VIP travel + hotel planning (Imola area)'),
  e(7, 15, 'David', "Post #2 — 'Just Physical AI.'"),
  e(7, 16, 'Comms', 'Media list ready → agree angle + timing'),
  e(7, 17, 'Bojana', 'VIP list v2 (track RSVPs)'),
  e(7, 20, 'David', 'Pre-testing teaser post'),
  e(7, 20, 'Bojana', 'Confirm testing-day guest visits'),
  e(7, 20, 'Comms', 'RSVP reminder #1 to ecosystem'),
  e(7, 21, 'Event', 'TESTING 1 BEGINS — Imola garage days'),
  e(7, 21, 'David', 'Content shoot: onboard, telemetry-cam, pit'),
  e(7, 23, 'David', 'Daily social from track'),
  e(7, 23, 'Bojana', 'VIP testing-day visits'),
  e(7, 27, 'Event', 'TESTING 1 ENDS · wrap shoot'),
  e(7, 28, 'David', 'Edit + weekly content drop'),
  e(7, 29, 'Bojana', 'VIP list update — chase Sept RSVPs'),
  e(7, 30, 'David', 'Schedule August posts'),
  e(7, 31, 'Comms', 'Media outreach round 1 (if agreed)'),
  // ---- August 2026 ----
  e(8, 1, 'Comms', 'Order branded takeaways (production lead time)'),
  e(8, 2, 'Event', 'TESTING 2 BEGINS — Imola final tuning'),
  e(8, 2, 'David', 'Social drops from testing'),
  e(8, 4, 'Comms', 'RSVP reminder #2 — VIP places filling'),
  e(8, 5, 'Bojana', 'VIP visits + chase remaining RSVPs'),
  e(8, 11, 'Event', 'TESTING 2 ENDS'),
  e(8, 12, 'David', 'Finals countdown push begins'),
  e(8, 13, 'Bojana', 'LOCK VIP list (~16 places)'),
  e(8, 13, 'Bojana', 'Final VIP list approved (Öznur)'),
  e(8, 14, 'Concierge', 'Book VIP hotels + transfers'),
  e(8, 15, 'Bojana', 'Send VIP confirmations + logistics'),
  e(8, 15, 'Concierge', 'Confirm VIP dinner venue + catering'),
  e(8, 18, 'Comms', 'Finals media accreditation + pitch'),
  e(8, 18, 'Bojana', 'VIP passes + accreditation + access list (with Stevan, Ilya)'),
  e(8, 20, 'David', 'Watch-party / in-house viewing plan'),
  e(8, 22, 'David', 'Countdown ramp posts'),
  e(8, 25, 'David', 'Final pre-finals content drop'),
  e(8, 26, 'Stevan', 'On-site: lodge / hospitality, signage, shuttles'),
  e(8, 27, 'Comms', 'Race-day press release / media pitch'),
  e(8, 28, 'Event', 'Confirm run-of-show, AV, on-site logistics'),
  e(8, 28, 'Stevan', 'Guest waivers + pit-lane safety briefing prep'),
  e(8, 31, 'Event', 'FINALS WEEK BEGINS — Imola setup + arrivals'),
  // ---- September 2026 ----
  e(9, 1, 'Event', 'Practice / qualifying'),
  e(9, 1, 'Bojana', 'VIP arrivals + guided garage tours'),
  e(9, 1, 'David', 'Live social from Imola'),
  e(9, 2, 'Event', 'Finals build-up · VIP hospitality'),
  e(9, 3, 'Event', 'Garage tours · meet-the-engineers'),
  e(9, 3, 'Event', 'Dry run: VIP experience + telemetry-viz check'),
  e(9, 4, 'Event', 'EVE OF RACE — VIP dinner'),
  e(9, 4, 'David', 'Race-eve post'),
  e(9, 4, 'Stevan', 'Distribute passes + takeaways · dinner setup'),
  e(9, 5, 'Event', 'RACE DAY — Imola finals · VIP hospitality · live + post-race social'),
  e(9, 5, 'Bojana', 'Post-race: thank-you to VIPs + recap content + clippings'),
]

export const MONTH_META: Record<7 | 8 | 9, { name: string; sub: string }> = {
  7: { name: 'July 2026', sub: 'From 6 July · project start + launch + Testing Window 1' },
  8: { name: 'August 2026', sub: 'Testing Window 2 + build-up to the finals' },
  9: { name: 'September 2026', sub: 'Finals week · Race day Saturday 5 September' },
}
