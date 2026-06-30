import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth, type Role } from './context/AuthContext'
import Nav from './components/Nav'
import Logo from './components/Logo'

import Login from './pages/Login'
import Home from './pages/Home'
import Agenda from './pages/Agenda'
import Participants from './pages/Participants'
import Imola from './pages/Imola'
import Predict from './pages/Predict'
import Ticket from './pages/Ticket'
import Crew from './pages/Crew'
import Booking from './pages/Booking'
import AdminBoard from './pages/admin/AdminBoard'
import AdminGuests from './pages/admin/AdminGuests'
import AdminPlan from './pages/admin/AdminPlan'

function Protected({ role, children }: { role?: Role; children: JSX.Element }) {
  const { user } = useAuth()
  const loc = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  if (role && user.role !== role) return <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace />
  return children
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
      <main className="app-main">
        <Routes>
          <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin' : '/'} replace /> : <Login />} />

          {/* VIP */}
          <Route path="/" element={<Protected role="vip"><Home /></Protected>} />
          <Route path="/agenda" element={<Protected role="vip"><Agenda /></Protected>} />
          <Route path="/participants" element={<Protected role="vip"><Participants /></Protected>} />
          <Route path="/imola" element={<Protected role="vip"><Imola /></Protected>} />
          <Route path="/predict" element={<Protected role="vip"><Predict /></Protected>} />
          <Route path="/ticket" element={<Protected role="vip"><Ticket /></Protected>} />
          <Route path="/crew" element={<Protected role="vip"><Crew /></Protected>} />
          <Route path="/book" element={<Protected role="vip"><Booking /></Protected>} />

          {/* Admin */}
          <Route path="/admin" element={<Protected role="admin"><AdminBoard /></Protected>} />
          <Route path="/admin/guests" element={<Protected role="admin"><AdminGuests /></Protected>} />
          <Route path="/admin/plan" element={<Protected role="admin"><AdminPlan /></Protected>} />

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
      <Logo size={56} />
      <h1 className="page-title" style={{ marginTop: 20 }}>Off track</h1>
      <p className="page-sub" style={{ margin: '12px auto 0' }}>This page isn’t on the map. Head back to the paddock.</p>
    </div>
  )
}
