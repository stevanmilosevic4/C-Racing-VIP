// Official Constructor logo — the actual brand wordmark asset (from brand guidelines).
// `onDark` swaps to the white version for navy backgrounds.
export default function Logo({ size = 20, onDark = false }: { size?: number; onDark?: boolean }) {
  const src = onDark ? '/constructor-logo-white.png' : '/constructor-logo.png'
  return (
    <img className="logo" src={src} alt="Constructor" height={size}
      style={{ height: size, width: 'auto', display: 'block' }} />
  )
}
