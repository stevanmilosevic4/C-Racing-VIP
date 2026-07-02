import { useRef, useState } from 'react'

// Horizontal photo gallery for the home page. Files live in /public/gallery.
// Photos that haven't been uploaded yet are hidden automatically (onError),
// so this list can name the full set up front.
const PHOTOS = [
  '191.jpg', '341.jpg', '391.jpg', '421.jpg', '541.jpg', '581.jpg',
  'AR1.jpeg', '621.jpg', 'AR2.jpeg', 'AR3.jpeg', '631.jpg', '681.jpg',
  '741.jpg', '961.jpg', '971.jpg', '1001.jpg', '1011.jpg', '1201.jpg',
  '1211.jpg', '1301.jpg', '1361.jpg', '1371.jpg', '1401.jpg', '1411.jpg',
]

export default function Gallery() {
  const track = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState<Set<string>>(new Set())
  const [zoom, setZoom] = useState<string | null>(null)

  const photos = PHOTOS.filter((p) => !hidden.has(p))
  if (photos.length === 0) return null

  function scroll(dir: -1 | 1) {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.85), behavior: 'smooth' })
  }

  return (
    <>
      <div className="gallery-wrap">
        <button className="g-arrow left" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
        <div className="gallery-track" ref={track}>
          {photos.map((p) => (
            <button key={p} className="g-item" onClick={() => setZoom(p)} title="View">
              <img src={`/gallery/${encodeURIComponent(p)}`} alt="" loading="lazy"
                onError={() => setHidden((h) => new Set(h).add(p))} />
            </button>
          ))}
        </div>
        <button className="g-arrow right" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
      </div>

      {zoom && (
        <div className="g-lightbox" onClick={() => setZoom(null)}>
          <img src={`/gallery/${encodeURIComponent(zoom)}`} alt="" />
          <button className="g-close" aria-label="Close">✕</button>
        </div>
      )}
    </>
  )
}
