import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Role = 'vip' | 'admin'
export type User = { name: string; role: Role }

type AuthCtx = {
  user: User | null
  login: (name: string, code: string) => { ok: boolean; error?: string }
  logout: () => void
}

const Ctx = createContext<AuthCtx>(null as unknown as AuthCtx)
const KEY = 'cxa2rl.user'

// Demo access codes — gated, invite-only feel. Swap for a real backend later.
const VIP_CODE = 'IMOLA26'
const ADMIN_CODE = 'CONTROL26'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user))
    else localStorage.removeItem(KEY)
  }, [user])

  function login(name: string, code: string) {
    const n = name.trim()
    if (!n) return { ok: false, error: 'Please enter your name.' }
    const c = code.trim().toUpperCase()
    if (c === ADMIN_CODE) { setUser({ name: n, role: 'admin' }); return { ok: true } }
    if (c === VIP_CODE) { setUser({ name: n, role: 'vip' }); return { ok: true } }
    return { ok: false, error: 'That access code is not recognised. Check your invitation.' }
  }

  function logout() { setUser(null) }

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>
}

export function useAuth() { return useContext(Ctx) }
