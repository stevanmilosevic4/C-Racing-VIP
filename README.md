# Constructor × A2RL — Imola VIP

An invite-only VIP experience **and** an organizer event-control board for Constructor's
activation at the **A2RL autonomous racing series** — testing & finals at Imola, then Abu Dhabi.

Built in the "We Are Constructor" spirit: private, members-only feel, live countdowns, gated
entry, navy-and-red Constructor branding.

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to /dist
npm run preview  # serve the production build
```

## Demo access codes

The login is gated (invite-only feel). Use:

| Role | Code | Sees |
| --- | --- | --- |
| **VIP guest** | `IMOLA26` | Home, Agenda, Participants, Imola, Predict, Ticket, Crew, Book a Visit |
| **Organizer / admin** | `CONTROL26` | Event Control board, Guests, Milestones & Decisions |

Enter any name — the home page greets you by it.

## What's inside

**VIP side**
- **Home** — personal greeting, live countdown to race day (5 Sep) with smaller testing-window
  timers below, race spotlights (placeholder cards — drop your photos in), agenda preview, and a
  "25 Years of Constructor University" banner.
- **Agenda** — the four series phases: Testing days → Finals week → Race day → Abu Dhabi.
- **Participants** — the A2RL grid, seeded from last year's teams (incl. Constructor University).
- **Imola** — about the city, interesting facts, what to do, nearby cities, and the history of
  Formula 1 at Imola.
- **Predict** — rank the teams in your predicted finishing order (saved per device).
- **Ticket** — a VIP race-day pass with reference + QR.
- **Crew** — the Constructor team with a small fact about each.
- **Book a Visit** — reserve a testing-day garage slot (see the car, meet the engineers).

**Admin side (Event Control)**
- **Board** — a Kanban seeded from the project tracker's 38 tasks, drag-and-drop between
  Backlog / This Week / In Progress / Done, with add, filter, search and progress.
- **Guests** — tiered guest list with VIP capacity tracking (16).
- **Milestones** — the critical-path timeline and open decisions.

## Adding your own content

Most content lives in plain data files under [`src/data`](src/data) — edit these as the real
line-up, dates, and photos firm up:

- `event.ts` — all the key dates that drive the countdowns.
- `participants.ts` — the teams on the grid.
- `agenda.ts` — the day-by-day agenda per phase.
- `content.ts` — spotlights, crew, Imola city copy, F1 history, ticket perks.
- `tasks.ts` — the admin board tasks, milestones, decisions and guest list.

**Photos:** drop images into [`public/`](public) and set the `img` field on a spotlight in
`content.ts` (e.g. `img: '/spotlights/yas-2024.jpg'`). The Imola gallery and spotlight cards show
"Add photo" placeholders until you do.

## Backend — live sync across devices (optional but recommended)

By default everything is stored in the browser (`localStorage`), so data is
per-device. Connect **Supabase** (free tier) and the app syncs **live across all
devices**: the Event Control board, the guest list, each VIP's podium bet and
garage booking, and the **Activity** log (who signed in, when, what they did).

It's automatic — the app uses Supabase when two env vars are present, and falls
back to `localStorage` when they aren't. Setup (~3 min):

1. Create a project at **[supabase.com](https://supabase.com)** (free).
2. In the project's **SQL Editor**, paste and run [`supabase-schema.sql`](supabase-schema.sql)
   (creates the `app_state` + `activity` tables, realtime, and demo policies).
3. In **Project Settings → API**, copy the **Project URL** and the **anon public** key.
4. Add them as environment variables:
   - **Local:** create `.env.local` (see [`.env.example`](.env.example)) with
     `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
   - **Vercel:** Project → Settings → Environment Variables → add the same two →
     redeploy.
5. Done. The **Activity** page shows a green "● Live" badge, and everyone shares
   the same board, guest list and data in real time.

The `anon` key is a public client key (safe to ship in the frontend). The demo SQL
grants that key full access — fine for an invite-only event; tighten the row-level
security policies before any real production use.

## Notes

- Auth is a simple name + role picker (Guest / Organiser) — no password. Swap
  `AuthContext` for real auth (e.g. Supabase Auth) when you need it.
- Without Supabase configured, all state is `localStorage` (single-device).

© 2026 Constructor · Constructing the future
