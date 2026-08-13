import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, type Role } from './context/AuthContext'
import { logActivity } from './activity'
import Nav from './components/Nav'
import Logo from './components/Logo'
import HotelPrompt from './components/HotelPrompt'
import { useSynced } from './hooks'
import { HOTELS_KEY, type HotelRecord } from './data/hotels'

import Login from './pages/Login'
import Home from './pages/Home'
import Agenda from './pages/Agenda'
import Participants from './pages/Participants'
import Imola from './pages/Imola'
import Guide from './pages/Guide'
import Predict from './pages/Predict'
import Profile from './pages/Profile'
import Crew from './pages/Crew'
import Booking from './pages/Booking'
import AdminBoard from './pages/admin/AdminBoard'
import AdminGuests from './pages/admin/AdminGuests'
import AdminVisits from './pages/admin/AdminVisits'
import AdminPlan from './pages/admin/AdminPlan'
import AdminActivity from './pages/admin/AdminActivity'
import AdminCalendar from './pages/admin/AdminCalendar'

// Friendly names for each route, used in the activity log.
const PAGE_NAMES: Record<string, string> = {
  '/': 'Home', '/agenda': 'Agenda', '/participants': 'Teams', '/imola': 'Imola', '/guide': 'Race Guide',
  '/predict': 'Podium Bet', '/profile': 'Profile', '/crew': 'Crew', '/book': 'Book a Visit',
  '/admin': 'Event Control', '/admin/guests': 'Guests', '/admin/visits': 'Visits', '/admin/plan': 'Milestones', '/admin/activity': 'Activity', '/admin/calendar': 'Calendar',
}

// Records a page view for the signed-in user on every route change.
function ActivityTracker() {
  const { user } = useAuth()
  const loc = useLocation()
  useEffect(() => {
    if (!user || loc.pathname === '/login') return
    logActivity(user.name, user.role, 'Viewed', PAGE_NAMES[loc.pathname] || loc.pathname)
  }, [loc.pathname, user?.name])
  return null
}

function Protected({ role, children }: { role?: Role; children: JSX.Element }) {
  const { user, viewRole } = useAuth()
  const loc = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  if (role && viewRole !== role) return <Navigate to={viewRole === 'admin' ? '/admin' : '/'} replace />
  return children
}

// Back / Home bar shown on inner pages (not on the two landing pages or login).
function BackBar() {
  const { user } = useAuth()
  const loc = useLocation()
  const nav = useNavigate()
  if (!user) return null
  const landing = ['/login', '/', '/admin']
  if (landing.includes(loc.pathname)) return null
  return (
    <div className="wrap">
      <div className="backbar">
        <button className="backbtn" onClick={() => nav(-1)}>← Back</button>
      </div>
    </div>
  )
}

// Ask signed-in guests about their hotel (and offer the WhatsApp group)
// exactly ONCE — the first time they use the app. Shown-state is stored in
// the shared backend (keyed by email), so it never re-appears, on any
// device. Guests can still answer or update later from their Profile.
const PROMPTED_KEY = 'cxa2rl.hotelPrompted'
function HotelGate() {
  const { user } = useAuth()
  const [hotels] = useSynced<Record<string, HotelRecord>>(HOTELS_KEY, {})
  const [prompted, setPrompted] = useSynced<Record<string, number>>(PROMPTED_KEY, {})
  const [open, setOpen] = useState(false)
  const key = (user?.email ?? user?.name ?? '').trim().toLowerCase()
  const answered = Boolean(hotels?.[(user?.name ?? '').trim().toLowerCase()])
  const seen = Boolean(prompted?.[key])

  useEffect(() => {
    if (open) return // never interfere once showing (saving mid-flow flips `answered`)
    if (!user || user.role !== 'vip' || answered || seen) return
    try { if (sessionStorage.getItem('cxa2rl.hotelPromptSeen')) return } catch { /* ignore */ }
    const t = window.setTimeout(() => {
      setOpen(true)
      // mark as shown the moment it appears — first login only, ever
      setPrompted((m) => ({ ...(m ?? {}), [key]: Date.now() }))
      try { sessionStorage.setItem('cxa2rl.hotelPromptSeen', '1') } catch { /* ignore */ }
    }, 1500) // let the sync land first
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, answered, seen, open])

  return open ? <HotelPrompt onClose={() => setOpen(false)} /> : null
}

// Slim banner shown while an organiser is previewing the guest experience.
function PreviewBanner() {
  const { user, previewGuest, setPreviewGuest } = useAuth()
  const nav = useNavigate()
  if (!user || user.role !== 'admin' || !previewGuest) return null
  return (
    <div className="preview-bar">
      <span>👁 Previewing the <b>guest experience</b> as an organiser</span>
      <button onClick={() => { setPreviewGuest(false); nav('/admin') }}>Back to Event Control →</button>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span>© 2026 Constructor · Constructing the future — A2RL Imola Series</span>
        <span>Private & invite-only · Confidential</span>
      </div>
    </footer>
  )
}

export default function App() {
  const { user } = useAuth()
  return (
    <div className="app">
      <Nav />
      <ActivityTracker />
      <PreviewBanner />
      <HotelGate />
      <main className="app-main">
        <BackBar />
        <Routes>
          <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace /> : <Login />} />

          {/* VIP */}
          <Route path="/" element={<Protected role="vip"><Home /></Protected>} />
          <Route path="/agenda" element={<Protected role="vip"><Agenda /></Protected>} />
          <Route path="/participants" element={<Protected role="vip"><Participants /></Protected>} />
          <Route path="/imola" element={<Protected role="vip"><Imola /></Protected>} />
          <Route path="/guide" element={<Protected role="vip"><Guide /></Protected>} />
          <Route path="/predict" element={<Protected role="vip"><Predict /></Protected>} />
          <Route path="/profile" element={<Protected role="vip"><Profile /></Protected>} />
          <Route path="/ticket" element={<Navigate to="/profile" replace />} />
          <Route path="/crew" element={<Protected role="vip"><Crew /></Protected>} />
          <Route path="/book" element={<Protected role="vip"><Booking /></Protected>} />

          {/* Admin */}
          <Route path="/admin" element={<Protected role="admin"><AdminBoard /></Protected>} />
          <Route path="/admin/guests" element={<Protected role="admin"><AdminGuests /></Protected>} />
          <Route path="/admin/visits" element={<Protected role="admin"><AdminVisits /></Protected>} />
          <Route path="/admin/plan" element={<Protected role="admin"><AdminPlan /></Protected>} />
          <Route path="/admin/activity" element={<Protected role="admin"><AdminActivity /></Protected>} />
          <Route path="/admin/calendar" element={<Protected role="admin"><AdminCalendar /></Protected>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  )
}

function NotFound() {
  return (
    <div className="wrap" style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ display: 'inline-block' }}><Logo size={26} /></div>
      <h1 className="page-title" style={{ marginTop: 20 }}>Off track</h1>
      <p className="page-sub" style={{ margin: '12px auto 0' }}>This page isn’t on the map. Head back to the paddock.</p>
    </div>
  )
}
