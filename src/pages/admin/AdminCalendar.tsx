import { useState } from 'react'
import { SEED_CALENDAR, OWNER_COLORS, OWNERS, MONTH_META, isTrackDay, type CalEntry, type CalOwner } from '../../data/calendar'
import { useSynced, useToast } from '../../hooks'

const DOW = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

function monthGrid(month: 7 | 8 | 9): (number | null)[] {
  const first = new Date(2026, month - 1, 1)
  const daysInMonth = new Date(2026, month, 0).getDate()
  const offset = (first.getDay() + 6) % 7 // Monday-first
  const cells: (number | null)[] = Array(offset).fill(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

export default function AdminCalendar() {
  const { msg, show } = useToast()
  const [entries, setEntries] = useSynced<CalEntry[]>('cxa2rl.calendar', SEED_CALENDAR)
  const [month, setMonth] = useState<7 | 8 | 9>(7)
  const [adding, setAdding] = useState<number | null>(null) // day being edited
  const [owner, setOwner] = useState<CalOwner>('Bojana')
  const [text, setText] = useState('')

  const cells = monthGrid(month)
  const meta = MONTH_META[month]

  function entriesFor(day: number) {
    return entries.filter((x) => x.month === month && x.day === day)
  }
  function addEntry() {
    const t = text.trim()
    if (!t || adding === null) return
    setEntries((es) => [...es, { id: 'c' + Date.now(), month, day: adding, owner, text: t }])
    setText(''); setAdding(null); show('Added to calendar ✓')
  }
  function remove(id: string) {
    setEntries((es) => es.filter((x) => x.id !== id))
    show('Entry removed')
  }
  function reset() { setEntries(SEED_CALENDAR); show('Calendar reset to plan') }

  return (
    <div className="wrap">
      <div className="eyebrow">Organizer</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Calendar</h1>
      <p className="page-sub">{meta.sub}. Tap <b>+</b> on any day to add an entry; <b>✕</b> removes one. Changes sync live for every organiser.</p>

      {/* month tabs + legend */}
      <div className="board-toolbar" style={{ marginTop: 20 }}>
        <div className="pill-toggle">
          {( [7, 8, 9] as const ).map((m) => (
            <button key={m} className={month === m ? 'on' : ''} onClick={() => { setMonth(m); setAdding(null) }}>{MONTH_META[m].name}</button>
          ))}
        </div>
        <div className="cal-legend">
          {OWNERS.map((o) => (
            <span key={o} className="cal-key"><i style={{ background: OWNER_COLORS[o] }} />{o}</span>
          ))}
          <span className="cal-key"><i className="track" />On track</span>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={reset}>Reset to plan</button>
      </div>

      {/* grid */}
      <div className="cal-scroll">
        <div className="cal-grid">
          {DOW.map((d) => <div key={d} className="cal-dow">{d}</div>)}
          {cells.map((day, i) => (
            <div key={i} className={`cal-cell ${day === null ? 'empty' : ''} ${day !== null && isTrackDay(month, day) ? 'track' : ''}`}>
              {day !== null && (
                <>
                  <div className="cal-daynum">
                    <span>{day}<em className="cal-dow-inline">{DOW[i % 7]}</em></span>
                    <button className="cal-add" title="Add entry" onClick={() => { setAdding(day); setText('') }}>+</button>
                  </div>
                  <div className="cal-entries">
                    {entriesFor(day).map((en) => (
                      <div key={en.id} className="cal-entry" style={{ borderLeftColor: OWNER_COLORS[en.owner] }}>
                        <b style={{ color: OWNER_COLORS[en.owner] }}>{en.owner}:</b> {en.text}
                        <button className="cal-del" title="Remove" onClick={() => remove(en.id)}>✕</button>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* add dialog */}
      {adding !== null && (
        <div className="g-lightbox" onClick={() => setAdding(null)}>
          <div className="cal-form" onClick={(ev) => ev.stopPropagation()}>
            <h3 style={{ fontSize: 18 }}>Add to {adding} {meta.name.split(' ')[0]}</h3>
            <label className="field" style={{ marginTop: 14 }}><span>Owner</span>
              <select value={owner} onChange={(ev) => setOwner(ev.target.value as CalOwner)}>
                {OWNERS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label className="field"><span>What</span>
              <input autoFocus value={text} onChange={(ev) => setText(ev.target.value)}
                onKeyDown={(ev) => ev.key === 'Enter' && addEntry()} placeholder="e.g. VIP list v3 review" />
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-red" style={{ flex: 1 }} onClick={addEntry}>Add entry</button>
              <button className="btn btn-ghost" onClick={() => setAdding(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
