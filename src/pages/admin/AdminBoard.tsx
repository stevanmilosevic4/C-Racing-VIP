import { useMemo, useState } from 'react'
import { SEED_TASKS, COLUMNS, type Task, type Column } from '../../data/tasks'
import { useSynced } from '../../hooks'

const CATS = ['All', 'Strategy', 'Outreach', 'Digital', 'Content', 'Guests', 'Testing', 'Event ops', 'Abu Dhabi']
const OWNERS = ['All', 'Bojana', 'Marketing', 'Design', 'Event ops']

export default function AdminBoard() {
  const [tasks, setTasks] = useSynced<Task[]>('cxa2rl.tasks', SEED_TASKS)
  const [cat, setCat] = useState('All')
  const [owner, setOwner] = useState('All')
  const [q, setQ] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newCat, setNewCat] = useState('Strategy')
  const [dragId, setDragId] = useState<string | null>(null)
  const [overCol, setOverCol] = useState<Column | null>(null)

  const filtered = useMemo(() => tasks.filter((t) =>
    (cat === 'All' || t.cat === cat) &&
    (owner === 'All' || t.owner === owner) &&
    (q === '' || t.title.toLowerCase().includes(q.toLowerCase()))
  ), [tasks, cat, owner, q])

  const done = tasks.filter((t) => t.col === 'done').length
  const pct = Math.round((done / tasks.length) * 100)

  function move(id: string, col: Column) {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, col } : t)))
  }
  function addTask() {
    const title = newTitle.trim()
    if (!title) return
    const id = 'n' + Date.now()
    setTasks((ts) => [{ id, cat: newCat, catTag: SEED_TASKS.find((x) => x.cat === newCat)?.catTag ?? 'tag-navy', title, owner: 'Bojana', due: 'TBC', priority: 'Med', col: 'backlog' } as Task, ...ts])
    setNewTitle('')
  }
  function reset() { setTasks(SEED_TASKS) }

  return (
    <div className="wrap">
      <div className="eyebrow">Organizer</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Event Control</h1>
      <p className="page-sub">A2RL Imola Series · {done} of {tasks.length} done. Drag a card between columns; everything is saved on this device.</p>

      {/* stat cards */}
      <div className="stat-cards" style={{ marginTop: 24 }}>
        <StatCard num={tasks.length} cap="Total tasks" />
        <StatCard num={tasks.filter((t) => t.col === 'week').length} cap="This week" />
        <StatCard num={tasks.filter((t) => t.col === 'progress').length} cap="In progress" />
        <StatCard num={done} cap="Done" />
      </div>

      {/* add + toolbar */}
      <div className="board-toolbar">
        <input style={{ flex: 2, minWidth: 180 }} placeholder="New task…" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()} />
        <select value={newCat} onChange={(e) => setNewCat(e.target.value)}>{CATS.slice(1).map((c) => <option key={c}>{c}</option>)}</select>
        <button className="btn btn-blue btn-sm" onClick={addTask}>Add</button>
      </div>

      <div className="board-toolbar">
        <span className="nav-role">View</span>
        <select value={cat} onChange={(e) => setCat(e.target.value)}>{CATS.map((c) => <option key={c}>{c === 'All' ? 'All categories' : c}</option>)}</select>
        <select value={owner} onChange={(e) => setOwner(e.target.value)}>{OWNERS.map((o) => <option key={o}>{o === 'All' ? 'All owners' : o}</option>)}</select>
        <input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="progress"><div style={{ width: pct + '%' }} /></div>
        <span className="nav-role">{pct}%</span>
        <button className="btn btn-ghost btn-sm" onClick={reset}>Reset board</button>
      </div>

      {/* board */}
      <div className="board">
        {COLUMNS.map((col) => {
          const items = filtered.filter((t) => t.col === col.key)
          return (
            <div
              key={col.key}
              className={`col ${overCol === col.key ? 'drag-over' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setOverCol(col.key) }}
              onDragLeave={() => setOverCol((c) => (c === col.key ? null : c))}
              onDrop={() => { if (dragId) move(dragId, col.key); setDragId(null); setOverCol(null) }}
            >
              <div className="col-head">
                <span className="bar" style={{ background: col.bar }} />
                <h3>{col.label}</h3>
                <span className="count">{items.length}</span>
              </div>
              {items.map((t) => (
                <div key={t.id} className="task" draggable onDragStart={() => setDragId(t.id)} onDragEnd={() => { setDragId(null); setOverCol(null) }}>
                  <span className={`tag ${t.catTag}`}>{t.cat}</span>
                  <div className="t-title">{t.title}</div>
                  <div className="t-foot">
                    <span className="owner"><span className="oa">{t.owner.slice(0, 1)}</span>{t.owner}</span>
                    <span className="due"><span className={`prio ${t.priority}`} style={{ marginRight: 6 }} />{t.due}</span>
                  </div>
                </div>
              ))}
              {items.length === 0 && <div style={{ textAlign: 'center', color: 'var(--muted-2)', fontSize: 12, padding: '16px 0' }}>Drop here</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({ num, cap }: { num: number; cap: string }) {
  return <div className="stat-card"><div className="num">{num}</div><div className="cap">{cap}</div></div>
}
