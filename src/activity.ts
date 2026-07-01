// Thin activity API used across the app. Backed by db.ts (Supabase when
// configured, localStorage otherwise). Keeps a stable, sync-looking
// logActivity() for call sites; reads are async via db.fetchActivity.
import { insertActivity, type ActivityRow } from './db'

export type Activity = ActivityRow

export function logActivity(name: string, role: 'vip' | 'admin', action: string, detail?: string) {
  insertActivity({ name, role, action, detail, ts: Date.now() })
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
