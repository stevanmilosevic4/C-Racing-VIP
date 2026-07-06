// Race Guide — A2RL 101 for first-time guests: how the sport works, what to
// watch for trackside, how the first two seasons went, and highlight videos.
// Results are the real ones (Season 1 · Apr 2024, Season 2 · Nov 2025).

const WATCH = [
  { icon: '🔀', title: 'Overtakes', text: 'Still the rarest, loudest moment in the sport — every autonomous pass under racing conditions is a little piece of history. When two cars go side by side, watch the paddock stop breathing.' },
  { icon: '🛑', title: 'The braking zones', text: 'Where the software earns its lap time. At Imola, watch Tamburello and Tosa — how late a car brakes tells you how much its team trusts the stack.' },
  { icon: '🌡️', title: 'Cold tyres', text: 'AI drivers hate them as much as humans do. Restarts and out-laps are when cars snap sideways — Kinetiz spun on cold tyres in last season\'s final and still recovered to P4.' },
  { icon: '⏱️', title: 'Sector times vs the human benchmark', text: 'Ex-F1 driver Daniil Kvyat\'s 57.5s lap of Yas Marina is the bar. The fastest AI lap is ~1.6s off — down from 10 seconds just 18 months earlier.' },
  { icon: '📡', title: 'The pit wall', text: 'Nobody is steering, but the garages are electric — engineers watch telemetry the way parents watch a toddler near stairs. They can change strategy parameters, never drive.' },
  { icon: '🤝', title: 'Traffic decisions', text: 'The cars negotiate space with each other in real time, no radio, no team orders. Watch how a following car probes for a gap lap after lap — that\'s the software "thinking".' },
]

const S2_RESULTS = [
  { pos: 'P1 🏆', team: 'TUM Autonomous Motorsport', note: 'Back-to-back champions' },
  { pos: 'P2', team: 'TII Racing', note: 'Host-institute entry' },
  { pos: 'P3', team: 'PoliMOVE-MSU', note: 'On the podium at home in 2026?' },
  { pos: 'P4', team: 'Kinetiz', note: 'Recovered from a cold-tyre spin' },
  { pos: 'DNF', team: 'Unimore Racing', note: 'Lap-12 contact' },
  { pos: 'DNF', team: 'Constructor Racing', note: 'Hit from behind while defending — our unfinished business' },
]

export default function Guide() {
  return (
    <div className="wrap">
      <div className="eyebrow">A2RL 101 · Know the Sport</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Race Guide</h1>
      <p className="page-sub">
        New to autonomous racing? Five minutes here and you'll watch race day like an insider — how it
        works, what to look for, and how the first two seasons set up the fight at Imola.
      </p>

      <div className="photo-band">
        <img src="/gallery/AR3.jpeg" alt="A2RL cars racing" loading="lazy" />
        <div className="pb-cap">Full-size Super Formula cars, 250+ km/h — and not a single driver on board.</div>
      </div>

      {/* how it works */}
      <div className="section-head" style={{ marginTop: 34 }}>
        <div><div className="eyebrow">The format</div><h2 style={{ marginTop: 8 }}>How the racing works</h2></div>
      </div>
      <div className="grid cols-3">
        <div className="card pad">
          <h3>🏎️ The car</h3>
          <p className="blurb">Every team races the identical car — a Dallara Super Formula SF23 converted for autonomy, stuffed with cameras, lidar, radar and GPS. Nobody can buy speed; the hardware is a level playing field.</p>
        </div>
        <div className="card pad">
          <h3>🧠 The driver</h3>
          <p className="blurb">The driver is software. Each team writes its own AI stack that perceives the track, plans the line and makes every decision in milliseconds. No remote control — once the car rolls, it's on its own.</p>
        </div>
        <div className="card pad">
          <h3>🏁 The weekend</h3>
          <p className="blurb">Solo qualifying laps set the grid, then the cars race wheel-to-wheel. At Imola on 5 September up to five cars line up — three qualified on last season, and two spots go to the qualification battle Constructor is fighting in.</p>
        </div>
      </div>

      <div className="info-note" style={{ marginTop: 22 }}>
        <b>The rules in 60 seconds:</b> identical cars · the AI software is the only "driver" · qualifying
        pace sets the grid · cars must avoid contact on their own — no human may intervene while the car
        is on track · fastest across the line wins. That's it. The complexity is all in the code.
      </div>

      {/* what to watch */}
      <div className="section-head" style={{ marginTop: 40 }}>
        <div><div className="eyebrow">Trackside</div><h2 style={{ marginTop: 8 }}>What to look for during the race</h2></div>
      </div>
      <div className="grid cols-3">
        {WATCH.map((w) => (
          <div className="card pad" key={w.title}>
            <h3>{w.icon} {w.title}</h3>
            <p className="blurb">{w.text}</p>
          </div>
        ))}
      </div>

      {/* past results */}
      <div className="section-head" style={{ marginTop: 40 }}>
        <div><div className="eyebrow">The story so far</div><h2 style={{ marginTop: 8 }}>How the previous races went</h2></div>
      </div>
      <div className="grid cols-2" style={{ alignItems: 'start' }}>
        <div className="card pad">
          <div className="eyebrow">Season 1 · April 2024 · Yas Marina</div>
          <h3 style={{ marginTop: 8 }}>The one that started it all</h3>
          <p className="blurb">
            Eight university teams, a sold-out grandstand, and the first-ever wheel-to-wheel autonomous
            race in full-size cars. <b>TUM won it — from Constructor Racing in P2</b>, whose car also
            pulled off the first autonomous overtake on an F1 circuit during the race. Ex-F1 driver
            Daniil Kvyat raced an AI car in a showcase and won comfortably, about 10 seconds a lap faster.
          </p>
        </div>
        <div className="card pad">
          <div className="eyebrow">Season 2 · November 2025 · Yas Marina</div>
          <h3 style={{ marginTop: 8 }}>The world's first six-car autonomous Grand Final</h3>
          <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
            {S2_RESULTS.map((r) => (
              <div key={r.team} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontSize: 14 }}>
                <b style={{ flex: 'none', width: 52 }}>{r.pos}</b>
                <span style={{ fontWeight: 700 }}>{r.team}</span>
                <span className="muted" style={{ marginLeft: 'auto', textAlign: 'right', fontSize: 12 }}>{r.note}</span>
              </div>
            ))}
          </div>
          <p className="blurb" style={{ marginTop: 12 }}>
            And in the human-vs-AI rematch, Kvyat's edge had shrunk from ~10 seconds to just 1.6 seconds
            a lap. The machines are coming for him — Imola is the next chapter.
          </p>
        </div>
      </div>

      {/* videos */}
      <div className="section-head" style={{ marginTop: 40 }}>
        <div><div className="eyebrow">Watch</div><h2 style={{ marginTop: 8 }}>Highlights from the first two seasons</h2></div>
      </div>
      <div className="grid cols-2">
        <div>
          <div className="video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/5ml_5-hRxbs"
              title="A2RL Season 1 — Final Race Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 8, fontWeight: 700 }}>Season 1 (2024) — final race highlights</p>
        </div>
        <div>
          <div className="video-frame">
            <iframe
              src="https://www.youtube-nocookie.com/embed/-NbQ360uKjQ"
              title="A2RL 2025 Recap — six-car Grand Final & Human vs AI"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 8, fontWeight: 700 }}>Season 2 (2025) — six-car Grand Final & the Kvyat showcase</p>
        </div>
      </div>

      <div className="info-note" style={{ marginTop: 26 }}>
        <b>One thing to remember on race day:</b> when a car makes a clean pass at Imola, you're not just
        watching a race — you're watching a world first happen in front of you. Cheer accordingly. 🏁
      </div>
    </div>
  )
}
