// Official Constructor logo (from brand assets).
// Light bg → the uploaded Constructor Tech logo; dark bg → white wordmark.
export default function Logo({ size = 20, onDark = false }: { size?: number; onDark?: boolean }) {
  const src = onDark ? '/constructor-logo-white.png' : '/constructor-tech.png'
  return (
    <img className="logo" src={src} alt="Constructor" height={size}
      style={{ height: size, width: 'auto', display: 'block' }} />
  )
}
