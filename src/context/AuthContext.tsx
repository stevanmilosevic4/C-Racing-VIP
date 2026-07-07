import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { logActivity } from '../activity'

export type Role = 'vip' | 'admin'
export type User = { name: string; role: Role; company?: string; email?: string }

// Organiser access code — entered via "I have a code" on the login screen.
const ADMIN_CODE = 'ImolaRacing25!'

type AuthCtx = {
  user: User | null
  viewRole: Role            // effective role for routing/nav (admins can preview as guest)
  previewGuest: boolean     // true when an organiser is previewing the guest view
  setPreviewGuest: (b: boolean) => void
  loginGuest: (d: { name: string; company: string; email: string }) => { ok: boolean; error?: string }
  loginAdmin: (name: string, code: string) => { ok: boolean; error?: string }
  logout: () => void
}

const Ctx = createContext<AuthCtx>(null as unknown as AuthCtx)
const KEY = 'cxa2rl.user'
const PREVIEW_KEY = 'cxa2rl.preview'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null } catch { return null }
  })
  const [previewGuest, setPreviewGuestState] = useState<boolean>(() => {
    try { return localStorage.getItem(PREVIEW_KEY) === '1' } catch { return false }
  })

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user))
    else localStorage.removeItem(KEY)
  }, [user])

  function setPreviewGuest(b: boolean) {
    setPreviewGuestState(b)
    try { b ? localStorage.setItem(PREVIEW_KEY, '1') : localStorage.removeItem(PREVIEW_KEY) } catch { /* ignore */ }
  }

  // Guests sign in with their details; organisers with the access code.
  function loginGuest(d: { name: string; company: string; email: string }) {
    const name = d.name.trim(), company = d.company.trim(), email = d.email.trim()
    if (!name) return { ok: false, error: 'Please enter your full name.' }
    if (!company) return { ok: false, error: 'Please enter your company.' }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Please enter a valid email address.' }
    setPreviewGuest(false)
    setUser({ name, role: 'vip', company, email })
    logActivity(name, 'vip', 'Signed in', `${company} · ${email}`)
    return { ok: true }
  }

  function loginAdmin(name: string, code: string) {
    const n = name.trim()
    if (!n) return { ok: false, error: 'Please enter your name.' }
    if (code !== ADMIN_CODE) return { ok: false, error: 'That code isn\'t right — check it and try again.' }
    setPreviewGuest(false)
    setUser({ name: n, role: 'admin' })
    logActivity(n, 'admin', 'Signed in', 'as Organiser (access code)')
    return { ok: true }
  }

  function logout() { setPreviewGuest(false); setUser(null) }

  // Organisers previewing the guest view are treated as 'vip' for routing/nav.
  const viewRole: Role = user?.role === 'admin' && previewGuest ? 'vip' : (user?.role ?? 'vip')

  return (
    <Ctx.Provider value={{ user, viewRole, previewGuest, setPreviewGuest, loginGuest, loginAdmin, logout }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() { return useContext(Ctx) }
