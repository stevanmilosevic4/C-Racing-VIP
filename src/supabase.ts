import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Configured via env vars (set these in Vercel → Project → Settings → Environment Variables).
// The anon key is a public client key and is safe to ship in the frontend.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null
export const dbEnabled = !!supabase
