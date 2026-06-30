// Event-control board — seeded from the A2RL Imola project tracker (38 tasks).
// Columns: backlog / week (this week) / progress / done. Drag to move; persisted to localStorage.

export type Column = 'backlog' | 'week' | 'progress' | 'done'
export type Priority = 'High' | 'Med' | 'Low'

export type Task = {
  id: string
  cat: string        // workstream
  catTag: 'tag-red' | 'tag-blue' | 'tag-green' | 'tag-amber' | 'tag-navy'
  title: string
  owner: string
  due: string
  priority: Priority
  col: Column
}

const CAT_TAG: Record<string, Task['catTag']> = {
  'Strategy': 'tag-navy',
  'Outreach': 'tag-red',
  'Digital': 'tag-blue',
  'Content': 'tag-green',
  'Guests': 'tag-amber',
  'Testing': 'tag-blue',
  'Event ops': 'tag-red',
  'Abu Dhabi': 'tag-navy',
}

function t(id: string, cat: string, title: string, owner: string, due: string, priority: Priority, col: Column): Task {
  return { id, cat, catTag: CAT_TAG[cat] ?? 'tag-navy', title, owner, due, priority, col }
}

export const SEED_TASKS: Task[] = [
  // Strategy & dates
  t('s1', 'Strategy', 'Confirm budget / target for the series', 'Jordan', '04 Jul', 'High', 'week'),
  t('s2', 'Strategy', 'Confirm 25th-anniversary coupling for Sept', 'Jordan', '04 Jul', 'High', 'week'),
  t('s3', 'Strategy', 'Confirm Abu Dhabi date (October)', 'Jordan', '11 Jul', 'High', 'backlog'),
  // External outreach
  t('o1', 'Outreach', 'Finalise full ecosystem distribution list', 'Jordan', '02 Jul', 'High', 'progress'),
  t('o2', 'Outreach', 'Create calendar blockers (.ics / Outlook holds)', 'Marketing', '03 Jul', 'High', 'week'),
  t('o3', 'Outreach', 'Send calendar blockers to whole ecosystem', 'Jordan', '04 Jul', 'High', 'week'),
  t('o4', 'Outreach', 'Ask recipients to forward to their partners', 'Jordan', '04 Jul', 'Med', 'backlog'),
  t('o5', 'Outreach', 'Track outreach & responses', 'Jordan', 'Ongoing', 'Med', 'backlog'),
  // Digital
  t('d1', 'Digital', 'Build invite-only landing page (this app)', 'Design', '11 Jul', 'High', 'progress'),
  t('d2', 'Digital', 'Add RSVP / registration capture to page', 'Design', '11 Jul', 'High', 'progress'),
  t('d3', 'Digital', 'Design save-the-date visual (full series)', 'Design', '09 Jul', 'High', 'backlog'),
  t('d4', 'Digital', 'Series visual identity / key art', 'Design', '09 Jul', 'Med', 'week'),
  // Content & comms
  t('c1', 'Content', 'Pull assets from A2RL media toolkit', 'Marketing', '04 Jul', 'Med', 'week'),
  t('c2', 'Content', 'Build content pack + key messages', 'Marketing', '11 Jul', 'Med', 'backlog'),
  t('c3', 'Content', 'Build social content plan', 'Marketing', '11 Jul', 'Med', 'backlog'),
  t('c4', 'Content', 'Brief A2RL teams to amplify (toolkit)', 'Marketing', '15 Jul', 'Med', 'backlog'),
  t('c5', 'Content', 'Press / amplification plan for finals', 'Marketing', '21 Aug', 'Med', 'backlog'),
  // Guest & VIP mgmt
  t('g1', 'Guests', 'Build master guest list (tiered)', 'Jordan', '09 Jul', 'High', 'progress'),
  t('g2', 'Guests', 'Set up VIP RSVP & ticket tracker (16)', 'Jordan', '11 Jul', 'High', 'backlog'),
  t('g3', 'Guests', 'Lock VIP headcount for finals', 'Jordan', '14 Aug', 'High', 'backlog'),
  t('g4', 'Guests', 'Allocate 16 VIP race-day tickets', 'Jordan', '21 Aug', 'High', 'backlog'),
  t('g5', 'Guests', 'VIP dinner seating / guest plan', 'Event ops', '28 Aug', 'Med', 'backlog'),
  // Testing days
  t('t1', 'Testing', 'Prepare garage-day invite (relaxed)', 'Marketing', '16 Jul', 'High', 'week'),
  t('t2', 'Testing', 'Send testing-window 1 invites', 'Jordan', '16 Jul', 'High', 'backlog'),
  t('t3', 'Testing', 'Prepare partner presentation (autonomous racing)', 'Marketing', '18 Jul', 'Med', 'backlog'),
  t('t4', 'Testing', 'On-site host + garage tours — window 1', 'Event ops', '21 Jul', 'Med', 'backlog'),
  t('t5', 'Testing', 'Content capture — window 1', 'Marketing', '27 Jul', 'Med', 'backlog'),
  t('t6', 'Testing', 'Send testing-window 2 invites', 'Jordan', '30 Jul', 'Med', 'backlog'),
  t('t7', 'Testing', 'On-site host + garage tours — window 2', 'Event ops', '02 Aug', 'Med', 'backlog'),
  // Event operations (finals)
  t('e1', 'Event ops', 'Decide suite/lodge (if VIPs > 16)', 'Event ops', '15 Aug', 'High', 'backlog'),
  t('e2', 'Event ops', 'Book suite/lodge + VIP dinner venue', 'Event ops', '18 Aug', 'High', 'backlog'),
  t('e3', 'Event ops', 'Plan VIP guided garage tours', 'Event ops', '25 Aug', 'Med', 'backlog'),
  t('e4', 'Event ops', 'Build finals run-of-show', 'Event ops', '28 Aug', 'High', 'backlog'),
  t('e5', 'Event ops', 'Confirm AV / hosting / logistics', 'Event ops', '31 Aug', 'Med', 'backlog'),
  t('e6', 'Event ops', 'Finals week — 31 Aug–5 Sep (race day)', 'Event ops', '05 Sep', 'High', 'backlog'),
  // Abu Dhabi
  t('a1', 'Abu Dhabi', 'Confirm AD date & venue access', 'Jordan', '11 Jul', 'High', 'backlog'),
  t('a2', 'Abu Dhabi', 'Abu Dhabi save-the-date', 'Design', '18 Jul', 'Med', 'backlog'),
  t('a3', 'Abu Dhabi', 'Abu Dhabi guest list (parallel track)', 'Jordan', 'TBC', 'Med', 'backlog'),
]

export const COLUMNS: { key: Column; label: string; bar: string }[] = [
  { key: 'backlog', label: 'Backlog', bar: '#8a99b8' },
  { key: 'week', label: 'This Week', bar: '#f2a93b' },
  { key: 'progress', label: 'In Progress', bar: '#1e9bf0' },
  { key: 'done', label: 'Booked / Done', bar: '#16b981' },
]

// Milestones & open decisions (from tracker sheets) for the admin overview.
export const MILESTONES = [
  { when: 'This week', what: 'Confirm budget, coupling, AD date', phase: '1 · Hold & build' },
  { when: 'This week', what: 'Send calendar blockers to whole ecosystem', phase: '1 · Hold & build' },
  { when: 'Early Jul', what: 'Landing page build; content pack from toolkit', phase: '1 · Hold & build' },
  { when: '~15 Jul', what: 'Landing page live; save-the-date out; testing invites', phase: '1 · Hold & build' },
  { when: '21–27 Jul', what: 'Testing window 1 — garage days, content capture', phase: '2 · Testing' },
  { when: '2–11 Aug', what: 'Testing window 2 — sustain engagement', phase: '2 · Testing' },
  { when: '14–15 Aug', what: 'Lock VIP headcount; decide suite/lodge', phase: '3 · Finals' },
  { when: 'Late Aug', what: 'Run-of-show final; VIPs confirmed; press live', phase: '3 · Finals' },
  { when: '31 Aug–5 Sep', what: 'Finals week — tours, dinner, race day', phase: '3 · Finals' },
  { when: 'October', what: 'Abu Dhabi event (date TBC)', phase: '4 · Abu Dhabi' },
]

export const DECISIONS = [
  { decision: 'Set budget / target for series', owner: 'Jordan', by: '04 Jul', status: 'Open', notes: 'Unblocks lodge + dinner' },
  { decision: 'Couple finals with 25th anniversary?', owner: 'Jordan', by: '04 Jul', status: 'Open', notes: 'Drives Sept programme & budget' },
  { decision: 'Confirm Abu Dhabi October date', owner: 'Jordan', by: '11 Jul', status: 'Open', notes: 'Needed for series save-the-date' },
  { decision: 'Rent dedicated suite/lodge? (if VIPs > 16)', owner: 'Event ops', by: '15 Aug', status: 'Open', notes: 'Booking lead time — critical path' },
  { decision: 'VIP dinner date (eve of race / 4 Sep?)', owner: 'Event ops', by: '14 Aug', status: 'Open', notes: 'Confirm with venue' },
]

// Demo guest list for the admin Guests view.
export const GUESTS = [
  { name: 'Alex', tier: 'Organizer', city: 'Bremen', status: 'Confirmed' },
  { name: 'Maya', tier: 'VIP', city: 'Istanbul', status: 'Confirmed' },
  { name: 'Liam', tier: 'VIP', city: 'London', status: 'Invited' },
  { name: 'Noah', tier: 'VIP', city: 'Berlin', status: 'Pending' },
  { name: 'Emma', tier: 'VIP', city: 'Ankara', status: 'Invited' },
  { name: 'Lucas', tier: 'Public', city: 'Milan', status: 'Confirmed' },
  { name: 'Sofia', tier: 'VIP', city: 'Munich', status: 'Pending' },
  { name: 'Jonas', tier: 'Public', city: 'Bologna', status: 'Invited' },
]
