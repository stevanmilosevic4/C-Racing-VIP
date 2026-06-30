import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Role = 'vip' | 'admin'
export type User = { name: string; role: Role }

type AuthCtx = {
  user: User | null
  login: (name: string, role: Role) => { ok: boolean; error?: string }
  logout: () => void
}

const Ctx = createContext<AuthCtx>(null as unknown as AuthCtx)
const KEY = 'cxa2rl.user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null } catch { return null }
  })

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user))
    else localStorage.removeItem(KEY)
  }, [user])

  // For now: just pick a role and enter a name (no access code).
  function login(name: string, role: Role) {
    const n = name.trim()
    if (!n) return { ok: false, error: 'Please enter your name.' }
    setUser({ name: n, role })
    return { ok: true }
  }

  function logout() { setUser(null) }

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>
}

export function useAuth() { return useContext(Ctx) }
