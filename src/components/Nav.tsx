import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const VIP_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/agenda', label: 'Agenda' },
  { to: '/participants', label: 'Teams' },
  { to: '/guide', label: 'Race Guide' },
  { to: '/predict', label: 'Podium Bet' },
  { to: '/crew', label: 'Crew' },
  { to: '/book', label: 'Book a Visit' },
  { to: '/imola', label: 'Imola' },
]

const ADMIN_LINKS = [
  { to: '/admin', label: 'Event Control', end: true },
  { to: '/admin/calendar', label: 'Calendar' },
  { to: '/admin/guests', label: 'Guests' },
  { to: '/admin/plan', label: 'Milestones' },
  { to: '/admin/activity', label: 'Activity' },
]

export default function Nav() {
  const { user, viewRole, previewGuest, setPreviewGuest, logout } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  if (!user) return null
  const links = viewRole === 'admin' ? ADMIN_LINKS : VIP_LINKS
  const initials = user.name.trim().slice(0, 1).toUpperCase()
  const isAdmin = user.role === 'admin'

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <NavLink to={viewRole === 'admin' ? '/admin' : '/'} className="brand">
          <Logo size={22} />
        </NavLink>

        <div className={`nav-links ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={(l as any).end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-user">
          {/* Organiser: toggle between the guest preview and the admin view */}
          {isAdmin && (
            previewGuest ? (
              <button className="btn btn-dark btn-sm hide-sm" onClick={() => { setPreviewGuest(false); nav('/admin') }}>
                ← Organiser
              </button>
            ) : (
              <button className="btn btn-ghost btn-sm hide-sm" onClick={() => { setPreviewGuest(true); nav('/') }}>
                👁 View as guest
              </button>
            )
          )}
          {viewRole === 'vip' ? (
            <NavLink to="/profile" className="nav-profile" title="Profile & ticket">
              <div className="avatar">{initials}</div>
              <div className="hide-sm">
                <div className="nav-name">{user.name}</div>
                <div className="nav-role">{isAdmin ? 'Guest preview' : 'VIP Crew'}</div>
              </div>
            </NavLink>
          ) : (
            <>
              <div className="avatar">{initials}</div>
              <div className="hide-sm">
                <div className="nav-name">{user.name}</div>
                <div className="nav-role">Organizer</div>
              </div>
            </>
          )}
          <button className="icon-btn" title="Sign out" onClick={() => { logout(); nav('/login') }}>⎋</button>
          <button className="icon-btn mobile-toggle" onClick={() => setOpen((o) => !o)} title="Menu">{open ? '✕' : '≡'}</button>
        </div>
      </div>
    </nav>
  )
}
