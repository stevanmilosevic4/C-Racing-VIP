import { useEffect, useMemo, useState } from 'react'
import { timeAgo, fmtTime, type Activity } from '../../activity'
import { fetchActivity, subscribeActivity, clearActivity, dbEnabled } from '../../db'
import { useToast } from '../../hooks'

type Person = { name: string; role: 'vip' | 'admin'; events: number; logins: number; last: number; first: number }

function summarise(list: Activity[]): Person[] {
  const map = new Map<string, Person>()
  for (const a of list) {
    const p = map.get(a.name) ?? { name: a.name, role: a.role, events: 0, logins: 0, last: 0, first: a.ts }
    p.events++
    if (a.action === 'Signed in') p.logins++
    p.last = Math.max(p.last, a.ts)
    p.first = Math.min(p.first, a.ts)
    p.role = a.role
    map.set(a.name, p)
  }
  return [...map.values()].sort((a, b) => b.last - a.last)
}

const ICON: Record<string, string> = {
  'Signed in': '→', 'Viewed': '👁', 'Locked in podium bet': '🏆', 'Booked a garage visit': '🔧',
}

export default function AdminActivity() {
  const { msg, show } = useToast()
  const [scope, setScope] = useState<'guests' | 'all'>('guests')
  const [all, setAll] = useState<Activity[]>([])

  async function load() { setAll(await fetchActivity()) }
  useEffect(() => {
    load()
    const unsub = subscribeActivity(() => load())       // live updates when backend is on
    const iv = dbEnabled ? undefined : window.setInterval(load, 4000) // poll local mirror otherwise
    return () => { unsub(); if (iv) window.clearInterval(iv) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filtered = scope === 'guests' ? all.filter((a) => a.role === 'vip') : all
  const feed = [...filtered].reverse() // newest first
  const people = useMemo(() => summarise(filtered), [filtered])

  async function clear() { await clearActivity(); await load(); show('Activity log cleared') }

  return (
    <div className="wrap">
      <div className="eyebrow">Organizer</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Activity</h1>
      <p className="page-sub">Who signed in, when, and what they’re doing in the app — sign-ins, page views and key actions.</p>

      <div className="info-note">
        {dbEnabled
          ? <>● <b>Live</b> — synced across all devices in real time via the backend.</>
          : <>ⓘ Backend not connected — showing activity from <b>this browser only</b>. Add your Supabase keys (see README) to sync every VIP across all devices live.</>}
      </div>

      {/* controls */}
      <div className="board-toolbar" style={{ marginTop: 18 }}>
        <div className="pill-toggle">
          <button className={scope === 'guests' ? 'on' : ''} onClick={() => setScope('guests')}>Guests</button>
          <button className={scope === 'all' ? 'on' : ''} onClick={() => setScope('all')}>Everyone</button>
        </div>
        <span className="nav-role" style={{ marginLeft: 'auto' }}>{filtered.length} events · {people.length} people</span>
        <button className="btn btn-ghost btn-sm" onClick={clear}>Clear log</button>
      </div>

      {/* per-person summary */}
      <div className="section-head" style={{ marginTop: 8 }}><div><h2 style={{ fontSize: 18 }}>People</h2></div></div>
      {people.length === 0
        ? <div className="empty">No activity yet. Sign in as a Guest (or use “View as guest”) and browse a few pages — it’ll show up here.</div>
        : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead><tr><th>Name</th><th>Role</th><th>Sign-ins</th><th>Actions</th><th>Last seen</th></tr></thead>
              <tbody>
                {people.map((p) => (
                  <tr key={p.name}>
                    <td style={{ fontWeight: 700 }}>
                      <span className="oa" style={{ display: 'inline-grid', width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }}>{p.name.slice(0, 1)}</span>
                      {p.name}
                    </td>
                    <td><span className={`tag ${p.role === 'admin' ? 'tag-navy' : 'tag-red'}`}>{p.role === 'admin' ? 'Organiser' : 'VIP'}</span></td>
                    <td>{p.logins}</td>
                    <td>{p.events}</td>
                    <td className="muted" title={fmtTime(p.last)}>{timeAgo(p.last)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* event feed */}
      {feed.length > 0 && (
        <>
          <div className="section-head"><div><h2 style={{ fontSize: 18 }}>Recent activity</h2></div><span className="label">newest first</span></div>
          <div className="feed">
            {feed.slice(0, 200).map((a, i) => (
              <div className="feed-row" key={i}>
                <span className="feed-ico">{ICON[a.action] ?? '•'}</span>
                <div className="feed-main">
                  <span className="feed-name">{a.name}</span>
                  <span className="feed-act">{a.action.toLowerCase()}{a.detail ? <b> {a.detail}</b> : null}</span>
                </div>
                <span className="feed-time" title={fmtTime(a.ts)}>{timeAgo(a.ts)}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
