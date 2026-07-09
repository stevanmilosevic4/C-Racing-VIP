import { CREW, CONSTRUCTOR_RACING_HISTORY } from '../data/content'
import { LAB_MEDIA } from '../data/labs'

export default function Crew() {
  return (
    <div className="wrap">
      <div className="eyebrow">The People</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Crew</h1>
      <p className="page-sub">The Constructor team behind the car — the people you’ll meet in the garage. A few small facts about each.</p>

      <div className="crew-stats">
        <span className="pillstat">🏆 Roborace champions '22</span>
        <span className="pillstat">🥈 P2 — A2RL's first race</span>
        <span className="pillstat">🔀 A2RL's first overtake</span>
        <span className="pillstat">📜 27 patented IPs</span>
        <span className="pillstat">⏱️ 1,000+ hours on track</span>
        <span className="pillstat">📅 Racing autonomously since 2018</span>
      </div>

      <div className="photo-band">
        <img src="/gallery/391.jpg" alt="The Constructor Racing team with the car" loading="lazy" />
        <div className="pb-cap">The crew and the car — Yas Marina, race week.</div>
      </div>

      <div className="grid cols-3" style={{ marginTop: 30 }}>
        {CREW.map((c) => (
          <article key={c.id} className="card crew-card">
            {c.photo
              ? <img className="crew-ava-img" src={c.photo} alt={c.name} loading="lazy" />
              : <div className="crew-ava" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)` }}>{c.name.slice(0, 1)}</div>}
            <h3>{c.name}</h3>
            <div className="role">{c.role}</div>
            <p className="fact">{c.fact}</p>
          </article>
        ))}
      </div>

      {/* THE LABS BEHIND THE CAR */}
      <div className="section-head"><div><div className="eyebrow">Constructor University · Bremen</div><h2 style={{ marginTop: 8 }}>Born in the labs of Constructor University</h2></div></div>
      <p className="page-sub" style={{ maxWidth: 760 }}>
        The race car didn't come out of nowhere — it comes from here. The photos below are the actual
        robotics and AI labs on the Constructor University campus in Bremen: the robot arms, humanoids
        and vision systems students work with every day. The skills practised on these lab benches —
        perceiving, planning, controlling motion precisely — are exactly what it takes to make a car
        drive itself at 250 km/h.
      </p>
      <div className="grid cols-3" style={{ marginTop: 22 }}>
        <div className="card pad">
          <h3>🤖 Robotics at Constructor University</h3>
          <p className="blurb">The Bremen campus robotics labs are home to robot arms, humanoids and a robot dog. Students teach these machines to sense the world and move through it on their own — the exact discipline that lets the SF23 read a race track and place itself on it at 250 km/h.</p>
        </div>
        <div className="card pad">
          <h3>⚙️ Control &amp; embedded systems on campus</h3>
          <p className="blurb">Keeping a robot arm steady and keeping a formula car stable at speed are the same mathematics, solved thousands of times per second. The control theory taught in Constructor University's lecture halls and practised on its lab benches runs — scaled up — on the race car's onboard computers.</p>
        </div>
        <div className="card pad">
          <h3>🧠 AI &amp; software — from thesis to pit lane</h3>
          <p className="blurb">Constructor University students write software that plans, predicts and decides under uncertainty. The racing programme turns that coursework into a "driver": university lab research, tested at 250 km/h in front of a grandstand.</p>
        </div>
      </div>
      <div className="labs-scroll">
        {LAB_MEDIA.map((m) => (
          <figure className="lab-item" key={m.src}>
            {m.type === 'youtube'
              ? <div className="video-frame"><iframe src={m.src} title={m.caption} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
              : m.type === 'video'
                ? <video src={m.src} controls playsInline preload="metadata" />
                : <img src={m.src} alt={m.caption} loading="lazy" />}
          </figure>
        ))}
      </div>

      {/* BEYOND THE TRACK — what the racing tech becomes */}
      <div className="section-head"><div><div className="eyebrow">Racing → Real World</div><h2 style={{ marginTop: 8 }}>Beyond the track — products born from racing</h2></div></div>
      <p className="page-sub" style={{ maxWidth: 760 }}>
        The technology doesn't stay on the circuit. Everything proven at race pace — perception, planning,
        control — spins out into products the team builds today.
      </p>
      <div className="grid cols-2" style={{ marginTop: 22 }}>
        <div className="card pad">
          <h3>🎯 AI Racing Coach</h3>
          <p className="blurb">A real-time AI driving coach built on the race stack: a lap-by-lap plan, racing-line corrections, and throttle/brake feedback against the AI-optimal lap. For racing schools, driver programmes, sim racing and track days.</p>
        </div>
        <div className="card pad">
          <h3>🛡️ ADAS &amp; obstacle avoidance</h3>
          <p className="blurb">High-speed collision-avoidance for road vehicles, spun out of race-pace perception and planning — already running as a live demo on a Tesla Model Y.</p>
        </div>
        <div className="card pad">
          <h3>🏭 Private-area autonomy</h3>
          <p className="blurb">Self-driving for controlled environments — ports, campuses, farms, logistics yards — where the racing autonomy stack transfers directly.</p>
        </div>
        <div className="card pad">
          <h3>🧰 Autonomy kits</h3>
          <p className="blurb">Modular perception, planning and control building blocks, so industries can assemble exactly the autonomy they need.</p>
        </div>
      </div>

      {/* CONSTRUCTOR IN AUTONOMOUS RACING */}
      <div className="section-head"><div><div className="eyebrow">Heritage</div><h2 style={{ marginTop: 8 }}>Constructor in autonomous racing</h2></div></div>
      <div className="card" style={{ padding: '8px 24px' }}>
        {CONSTRUCTOR_RACING_HISTORY.map((e, i) => (
          <div key={i} className="f1-row">
            <div className="yr">{e.yr}</div>
            <div className="ev">
              <b>{e.title}</b>
              <p>{e.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
