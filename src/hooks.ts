import { useEffect, useRef, useState } from 'react'

// Persist a piece of state to localStorage.
export function usePersisted<T>(key: string, initial: T) {
  const [val, setVal] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s ? (JSON.parse(s) as T) : initial } catch { return initial }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)) } catch { /* ignore */ }
  }, [key, val])
  return [val, setVal] as const
}

// A live countdown to a target ISO date. Returns days/hours/mins/secs and a `past` flag.
export function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = Math.max(0, new Date(targetIso).getTime() - now)
  const past = new Date(targetIso).getTime() - now <= 0
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)
  return { days, hours, mins, secs, past }
}

// Tiny toast helper.
export function useToast() {
  const [msg, setMsg] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  function show(m: string) {
    setMsg(m)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMsg(null), 2600)
  }
  return { msg, show }
}

export const pad = (n: number) => String(n).padStart(2, '0')
