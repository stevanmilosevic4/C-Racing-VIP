// Official Constructor logo (from brand assets), wordmark only — no TECH suffix.
// Light bg → navy/red wordmark; dark bg → white wordmark.
export default function Logo({ size = 20, onDark = false }: { size?: number; onDark?: boolean }) {
  const src = onDark ? '/constructor-wordmark-white.png' : '/constructor-wordmark.png'
  return (
    <img className="logo" src={src} alt="Constructor" height={size}
      style={{ height: size, width: 'auto', display: 'block' }} />
  )
}
