import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Configured via env vars (Vercel → Settings → Environment Variables, and/or a
// local .env.local — see .env.example). The anon key is a public client key
// (safe to ship in the frontend); access is governed by table RLS policies.
// Without these, the app falls back to localStorage (single-device).
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null
export const dbEnabled = !!supabase
