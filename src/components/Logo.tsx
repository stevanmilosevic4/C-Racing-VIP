// Constructor brand mark — "C › O" — rebuilt to the official brand colours:
// Constructor Blue #008CE2 · Constructor Red #DB4E3D · Constructor Navy #1C2747.
// `onDark` renders the chevron in white so it stays visible on navy backgrounds.
export default function Logo({ size = 30, onDark = false }: { size?: number; onDark?: boolean }) {
  const chevron = onDark ? '#ffffff' : '#1C2747'
  // viewBox 0 0 176 60 — C (open ring), chevron, O (ring)
  return (
    <svg className="logo" height={size} viewBox="0 0 176 60" fill="none" aria-label="Constructor"
      style={{ width: 'auto', display: 'block' }}>
      {/* C — open ring, blue, opening faces the chevron */}
      <path d="M45.6 44.05 A21 21 0 1 0 45.6 15.95"
        stroke="#008CE2" strokeWidth="11" strokeLinecap="round" />
      {/* › chevron */}
      <path d="M76 18 L92 30 L76 42" stroke={chevron} strokeWidth="9"
        strokeLinecap="round" strokeLinejoin="round" />
      {/* O — full ring, red */}
      <circle cx="146" cy="30" r="21" stroke="#DB4E3D" strokeWidth="11" />
    </svg>
  )
}
