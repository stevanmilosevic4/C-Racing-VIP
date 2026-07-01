// Lightweight activity log. Records to localStorage so the organiser can see
// who signed in, when, and what they did in the app.
//
// NOTE: with no backend, this only captures activity in the *current* browser.
// To aggregate every VIP across their own devices in real time, wire these
// same events to a backend/API instead of localStorage.

export type Activity = {
  name: string
  role: 'vip' | 'admin'
  action: string
  detail?: string
  ts: number
}

const KEY = 'cxa2rl.activity'
const CAP = 1000

export function logActivity(name: string, role: 'vip' | 'admin', action: string, detail?: string) {
  try {
    const arr: Activity[] = JSON.parse(localStorage.getItem(KEY) || '[]')
    const last = arr[arr.length - 1]
    // de-dupe rapid identical page views (e.g. StrictMode double render)
    if (last && last.name === name && last.action === action && last.detail === detail && Date.now() - last.ts < 1500) return
    arr.push({ name, role, action, detail, ts: Date.now() })
    localStorage.setItem(KEY, JSON.stringify(arr.slice(-CAP)))
  } catch { /* ignore */ }
}

export function getActivity(): Activity[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}

export function clearActivity() {
  try { localStorage.removeItem(KEY) } catch { /* ignore */ }
}

export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m} min ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  return `${d}d ago`
}

export function fmtTime(ts: number): string {
  const d = new Date(ts)
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
