// Data layer. When Supabase is configured it is the shared source of truth
// (synced live across all devices); otherwise everything falls back to
// localStorage so the app still works offline / before setup.
import { supabase, dbEnabled } from './supabase'

export { dbEnabled }

/* ---------------- generic key/value state (jsonb blobs) ---------------- */
// Used for shared docs (board tasks, guest list) and per-user docs
// (a VIP's booking / podium bet). Table: app_state(key text pk, value jsonb).

function lsGet<T>(key: string, fallback: T): T {
  try { const s = localStorage.getItem(key); return s ? (JSON.parse(s) as T) : fallback } catch { return fallback }
}
function lsSet<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
}

export async function getState<T>(key: string): Promise<T | undefined> {
  if (!supabase) return undefined
  const { data, error } = await supabase.from('app_state').select('value').eq('key', key).maybeSingle()
  if (error || !data) return undefined
  return data.value as T
}

export async function setState<T>(key: string, value: T): Promise<void> {
  lsSet(key, value) // local mirror
  if (!supabase) return
  await supabase.from('app_state').upsert({ key, value, updated_at: new Date().toISOString() })
}

export function subscribeState<T>(key: string, cb: (value: T) => void): () => void {
  const sb = supabase
  if (!sb) return () => {}
  const ch = sb
    .channel(`state:${key}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'app_state', filter: `key=eq.${key}` },
      (payload: any) => { if (payload.new?.value !== undefined) cb(payload.new.value as T) })
    .subscribe()
  return () => { sb.removeChannel(ch) }
}

export { lsGet, lsSet }

/* ---------------- activity log (append-only table) ---------------- */
export type ActivityRow = { name: string; role: 'vip' | 'admin'; action: string; detail?: string; ts: number }
const ACT_KEY = 'cxa2rl.activity'
const ACT_CAP = 1000

export function insertActivity(rec: ActivityRow) {
  // local mirror (dedupe rapid identical events)
  try {
    const arr: ActivityRow[] = JSON.parse(localStorage.getItem(ACT_KEY) || '[]')
    const last = arr[arr.length - 1]
    if (!(last && last.name === rec.name && last.action === rec.action && last.detail === rec.detail && rec.ts - last.ts < 1500)) {
      arr.push(rec)
      localStorage.setItem(ACT_KEY, JSON.stringify(arr.slice(-ACT_CAP)))
    }
  } catch { /* ignore */ }
  if (supabase) {
    supabase.from('activity').insert({ name: rec.name, role: rec.role, action: rec.action, detail: rec.detail ?? null })
      .then(() => {}, () => {})
  }
}

export async function fetchActivity(): Promise<ActivityRow[]> {
  if (!supabase) return lsGet<ActivityRow[]>(ACT_KEY, [])
  const { data, error } = await supabase.from('activity').select('*').order('created_at', { ascending: true }).limit(ACT_CAP)
  if (error || !data) return lsGet<ActivityRow[]>(ACT_KEY, [])
  return data.map((r: any) => ({ name: r.name, role: r.role, action: r.action, detail: r.detail ?? undefined, ts: new Date(r.created_at).getTime() }))
}

export function subscribeActivity(cb: () => void): () => void {
  const sb = supabase
  if (!sb) return () => {}
  const ch = sb.channel('activity-feed')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity' }, cb)
    .subscribe()
  return () => { sb.removeChannel(ch) }
}

export async function clearActivity(): Promise<void> {
  try { localStorage.removeItem(ACT_KEY) } catch { /* ignore */ }
  if (supabase) await supabase.from('activity').delete().neq('id', 0)
}
