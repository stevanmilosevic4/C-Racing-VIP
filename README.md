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

## Notes

- No backend — state (login, board changes, predictions, bookings) is stored in `localStorage`.
  Swap `AuthContext` and the data hooks for a real API when ready.
- The access codes in `src/context/AuthContext.tsx` are placeholders for the demo.

© 2026 Constructor · Constructing the future
