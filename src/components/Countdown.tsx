import { useCountdown, pad } from '../hooks'

const cellColors = ['cd-c1', 'cd-c2', 'cd-c3', 'cd-c4']

// Big 4-cell countdown used in the hero.
export default function Countdown({ target, title }: { target: string; title: string }) {
  const { days, hours, mins, secs, past } = useCountdown(target)
  const cells = [
    { n: days, l: 'Days' },
    { n: hours, l: 'Hours' },
    { n: mins, l: 'Mins' },
    { n: secs, l: 'Secs' },
  ]
  return (
    <div className="countdown">
      <h4>{past ? 'It’s race day' : title}</h4>
      <div className="cd-row">
        {cells.map((c, i) => (
          <div className="cd-cell" key={c.l}>
            <div className="cd-num">{past ? '00' : pad(c.n)}</div>
            <div className="cd-label">{c.l}</div>
            <div className={`cd-bar ${cellColors[i]}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

// Compact single-line timer used for the testing windows.
export function MiniTimer({ target, label, note }: { target: string; label: string; note: string }) {
  const { days, hours, mins, past } = useCountdown(target)
  return (
    <div className="mini-timer">
      <div className="mt-label">{label}</div>
      <div className="mt-val">{past ? 'In progress' : `${days}d ${pad(hours)}h ${pad(mins)}m`}</div>
      <div className="mt-date">{note}</div>
    </div>
  )
}
