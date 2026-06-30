import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const VIP_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/agenda', label: 'Agenda' },
  { to: '/participants', label: 'Participants' },
  { to: '/imola', label: 'Imola' },
  { to: '/predict', label: 'Predict' },
  { to: '/ticket', label: 'Ticket' },
  { to: '/crew', label: 'Crew' },
  { to: '/book', label: 'Book a Visit' },
]

const ADMIN_LINKS = [
  { to: '/admin', label: 'Event Control', end: true },
  { to: '/admin/guests', label: 'Guests' },
  { to: '/admin/plan', label: 'Milestones' },
]

export default function Nav() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  if (!user) return null
  const links = user.role === 'admin' ? ADMIN_LINKS : VIP_LINKS
  const initials = user.name.trim().slice(0, 1).toUpperCase()

  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <NavLink to={user.role === 'admin' ? '/admin' : '/'} className="brand">
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
          <div className="avatar">{initials}</div>
          <div className="hide-sm">
            <div className="nav-name">{user.name}</div>
            <div className="nav-role">{user.role === 'admin' ? 'Organizer' : 'VIP Crew'}</div>
          </div>
          <button className="icon-btn" title="Sign out" onClick={() => { logout(); nav('/login') }}>⎋</button>
          <button className="icon-btn mobile-toggle" onClick={() => setOpen((o) => !o)} title="Menu">{open ? '✕' : '≡'}</button>
        </div>
      </div>
    </nav>
  )
}
