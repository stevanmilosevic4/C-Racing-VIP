import { GUESTS } from '../../data/tasks'
import { EVENT } from '../../data/event'

export default function AdminGuests() {
  const vip = GUESTS.filter((g) => g.tier === 'VIP').length
  const confirmed = GUESTS.filter((g) => g.status === 'Confirmed').length

  return (
    <div className="wrap">
      <div className="eyebrow">Organizer</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Guest Records</h1>
      <p className="page-sub">{GUESTS.length} people · VIP capacity is {EVENT.vipCapacity}. Trigger a suite/lodge booking if confirmed VIPs exceed {EVENT.vipCapacity}.</p>

      <div className="stat-cards" style={{ marginTop: 24 }}>
        <div className="stat-card"><div className="num">{GUESTS.length}</div><div className="cap">On the list</div></div>
        <div className="stat-card"><div className="num">{vip}/{EVENT.vipCapacity}</div><div className="cap">VIP allocated</div></div>
        <div className="stat-card"><div className="num">{confirmed}</div><div className="cap">Confirmed</div></div>
        <div className="stat-card"><div className="num">{GUESTS.filter((g) => g.status === 'Pending').length}</div><div className="cap">Pending</div></div>
      </div>

      <div style={{ marginTop: 26, overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr><th>Name</th><th>Tier</th><th>Travels from</th><th>RSVP</th></tr>
          </thead>
          <tbody>
            {GUESTS.map((g) => (
              <tr key={g.name}>
                <td style={{ fontWeight: 700 }}>{g.name}</td>
                <td><span className={`tag ${g.tier === 'VIP' ? 'tag-red' : g.tier === 'Organizer' ? 'tag-navy' : 'tag-blue'}`}>{g.tier}</span></td>
                <td className="muted">{g.city}</td>
                <td><span className={`st ${g.status}`}>{g.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
