import { useSynced } from '../../hooks'
import { BOOKINGS_KEY, type BookingRecord } from '../../data/bookings'

// Organiser view of all garage-visit requests — the same shared list the
// Book a Visit page writes to, live-synced. Per-day headcounts up top so
// tour guides can be arranged; full requests below.

export default function AdminVisits() {
  const [bookings] = useSynced<BookingRecord[]>(BOOKINGS_KEY, [])
  const live = (bookings ?? []).filter((b) => b.status === 'requested')
  const sorted = [...(bookings ?? [])].sort((a, b) => b.ts - a.ts)

  // headcount per day (live requests only)
  const byDay = new Map<string, { day: string; window: string; people: number; groups: number }>()
  for (const b of live) {
    const cur = byDay.get(b.dayId) ?? { day: b.day, window: b.window, people: 0, groups: 0 }
    cur.people += b.people; cur.groups += 1
    byDay.set(b.dayId, cur)
  }
  const days = [...byDay.values()].sort((a, b) => a.day.localeCompare(b.day))

  const fmtTs = (ts: number) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(ts))

  // Download everything as a CSV that opens cleanly in Excel/Numbers.
  function exportCsv() {
    const q = (s: unknown) => `"${String(s ?? '').replace(/"/g, '""')}"`
    const head = ['Guest', 'Company', 'Email', 'Day', 'Window', 'People', 'Activities', 'Note', 'Requested at', 'Status']
    const lines = sorted.map((b) => [
      b.guest, b.company, b.email, b.day, b.window, b.people,
      b.activities.join(' | '), b.note, new Date(b.ts).toISOString().replace('T', ' ').slice(0, 16), b.status,
    ].map(q).join(','))
    const csv = '﻿' + [head.map(q).join(','), ...lines].join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `a2rl-visit-requests-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="wrap">
      <div className="eyebrow">Organizer</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <h1 className="page-title" style={{ marginTop: 10 }}>Visits</h1>
        {sorted.length > 0 && (
          <button className="btn btn-dark btn-sm" style={{ marginLeft: 'auto' }} onClick={exportCsv}>⬇ Export CSV</button>
        )}
      </div>
      <p className="page-sub">
        Every garage-visit request from guests, live. Each request is also emailed to
        <b> autonomousracing@constructor.org</b>. Use the per-day headcounts to arrange tour guides.
      </p>

      {days.length > 0 && (
        <div className="crew-stats" style={{ marginTop: 22 }}>
          {days.map((d) => (
            <span className="pillstat" key={d.day}>📅 {d.day} — <b>{d.people}</b> {d.people === 1 ? 'guest' : 'guests'} · {d.groups} {d.groups === 1 ? 'group' : 'groups'}</span>
          ))}
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="card" style={{ padding: 40, marginTop: 26, textAlign: 'center' }}>
          <div style={{ fontSize: 36 }}>📭</div>
          <h3 style={{ marginTop: 10 }}>No visit requests yet</h3>
          <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>As soon as a guest books a testing-day visit, it appears here and lands in the inbox.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', marginTop: 26 }}>
          <table className="table">
            <thead>
              <tr><th>Guest</th><th>Day</th><th>People</th><th>Activities</th><th>Note</th><th>Requested</th><th>Status</th></tr>
            </thead>
            <tbody>
              {sorted.map((b) => (
                <tr key={b.guest + b.ts} style={b.status === 'cancelled' ? { opacity: .55 } : undefined}>
                  <td>
                    <b>{b.guest}</b>
                    <div className="muted" style={{ fontSize: 12 }}>{[b.company, b.email].filter(Boolean).join(' · ') || '—'}</div>
                  </td>
                  <td><b>{b.day}</b><div className="muted" style={{ fontSize: 12 }}>{b.window}</div></td>
                  <td style={{ fontWeight: 800 }}>{b.people}</td>
                  <td style={{ maxWidth: 260 }}>
                    {b.activities.length === 0
                      ? <span className="muted">—</span>
                      : <span style={{ fontSize: 13 }}>{b.activities.map((a) => a.split(' — ')[0]).join(' · ')}</span>}
                  </td>
                  <td style={{ maxWidth: 200, fontSize: 13 }}>{b.note || <span className="muted">—</span>}</td>
                  <td className="muted" style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{fmtTs(b.ts)}</td>
                  <td>{b.status === 'cancelled' ? <span className="tag tag-red">Cancelled</span> : <span className="tag tag-green">Requested</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
