import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { logActivity } from '../activity'

export type Role = 'vip' | 'admin'
export type User = { name: string; role: Role }

type AuthCtx = {
  user: User | null
  viewRole: Role            // effective role for routing/nav (admins can preview as guest)
  previewGuest: boolean     // true when an organiser is previewing the guest view
  setPreviewGuest: (b: boolean) => void
  login: (name: string, role: Role) => { ok: boolean; error?: string }
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

  // For now: just pick a role and enter a name (no access code).
  function login(name: string, role: Role) {
    const n = name.trim()
    if (!n) return { ok: false, error: 'Please enter your name.' }
    setPreviewGuest(false)
    setUser({ name: n, role })
    logActivity(n, role, 'Signed in', role === 'admin' ? 'as Organiser' : 'as Guest')
    return { ok: true }
  }

  function logout() { setPreviewGuest(false); setUser(null) }

  // Organisers previewing the guest view are treated as 'vip' for routing/nav.
  const viewRole: Role = user?.role === 'admin' && previewGuest ? 'vip' : (user?.role ?? 'vip')

  return (
    <Ctx.Provider value={{ user, viewRole, previewGuest, setPreviewGuest, login, logout }}>
      {children}
    </Ctx.Provider>
  )
}

export function useAuth() { return useContext(Ctx) }
