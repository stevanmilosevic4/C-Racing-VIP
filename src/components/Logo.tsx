// Constructor "C > O" mark — navy C, blue chevron, red O.
export default function Logo({ size = 38 }: { size?: number }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 64 64" fill="none" aria-label="Constructor">
      <path d="M40 18a16 16 0 1 0 0 28" stroke="#0a1733" strokeWidth="7" strokeLinecap="round" />
      <path d="M30 24l10 8-10 8" stroke="#1e9bf0" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="32" r="9" stroke="#e23026" strokeWidth="7" />
    </svg>
  )
}
