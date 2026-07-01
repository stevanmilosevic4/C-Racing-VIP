import { useEffect, useRef, useState } from 'react'
import { dbEnabled, getState, setState, subscribeState, lsGet, lsSet } from './db'

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

// Like usePersisted, but backed by the shared backend when configured
// (live-synced across devices via realtime), with localStorage fallback.
export function useSynced<T>(key: string, initial: T) {
  const [val, setValState] = useState<T>(() => lsGet<T>(key, initial))
  const valRef = useRef(val)
  valRef.current = val

  useEffect(() => {
    if (!dbEnabled) return
    let active = true
    getState<T>(key).then((remote) => {
      if (!active) return
      if (remote !== undefined) { setValState(remote); lsSet(key, remote) }
      else { setState(key, valRef.current) } // seed the shared baseline once
    })
    const unsub = subscribeState<T>(key, (remote) => { if (active) { setValState(remote); lsSet(key, remote) } })
    return () => { active = false; unsub() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  function update(next: T | ((prev: T) => T)) {
    setValState((prev) => {
      const value = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
      lsSet(key, value)
      if (dbEnabled) setState(key, value)
      return value
    })
  }

  return [val, update] as const
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
