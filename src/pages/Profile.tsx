import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSynced, useToast } from '../hooks'
import HotelPrompt from '../components/HotelPrompt'
import { HOTELS_KEY, WHATSAPP_URL, type HotelRecord } from '../data/hotels'

// A guest's uploaded ticket — stored per user and synced to the backend,
// so it follows them across devices. Images are downscaled client-side;
// PDFs are stored as-is (size-capped).
type StoredTicket = { fileName: string; mime: string; dataUrl: string; uploadedAt: number }

const MAX_PDF_BYTES = 3 * 1024 * 1024 // ~3 MB raw

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = reject
    r.readAsDataURL(file)
  })
}

// Downscale an image to max 1600px on the long side, JPEG — keeps the
// stored payload small enough to sync comfortably.
async function imageToDataUrl(file: File): Promise<string> {
  const raw = await fileToDataUrl(file)
  const img = new Image()
  await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = raw })
  const scale = Math.min(1, 1600 / Math.max(img.width, img.height))
  if (scale === 1 && file.size < 900_000) return raw
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(img.width * scale)
  canvas.height = Math.round(img.height * scale)
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.85)
}

export default function Profile() {
  const { user } = useAuth()
  const { msg, show } = useToast()
  const name = user?.name ?? 'guest'
  const [ticket, setTicket] = useSynced<StoredTicket | null>(`cxa2rl.myticket:${name}`, null)
  const [hotels] = useSynced<Record<string, HotelRecord>>(HOTELS_KEY, {})
  const [hotelOpen, setHotelOpen] = useState(false)
  const hotel = hotels?.[name.trim().toLowerCase()]
  const [busy, setBusy] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function onFile(file: File | undefined | null) {
    if (!file) return
    setBusy(true)
    try {
      const isImage = file.type.startsWith('image/')
      const isPdf = file.type === 'application/pdf'
      if (!isImage && !isPdf) { show('Please upload a photo or a PDF'); return }
      if (isPdf && file.size > MAX_PDF_BYTES) { show('PDF too large — max 3 MB. A photo/screenshot of the ticket works too.'); return }
      const dataUrl = isImage ? await imageToDataUrl(file) : await fileToDataUrl(file)
      setTicket({ fileName: file.name, mime: isPdf ? 'application/pdf' : 'image/jpeg', dataUrl, uploadedAt: Date.now() })
      show('Ticket saved ✓ — it will be here whenever you need it')
    } catch {
      show('Could not read that file — try another one')
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="wrap">
      <div className="eyebrow">Your Space</div>
      <h1 className="page-title" style={{ marginTop: 10 }}>Profile</h1>

      <div className="card" style={{ padding: 22, marginTop: 26, display: 'flex', alignItems: 'center', gap: 16, maxWidth: 640 }}>
        <div className="avatar" style={{ width: 56, height: 56, fontSize: 22 }}>{name.trim().slice(0, 1).toUpperCase()}</div>
        <div>
          <div style={{ fontWeight: 900, fontSize: 20 }}>{name}</div>
          <div className="muted" style={{ fontSize: 13, fontWeight: 700 }}>{user?.role === 'admin' ? 'Organizer' : 'VIP Crew'}{user?.company ? ` · ${user.company}` : ''} · A2RL Imola Series</div>
          {user?.email && <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>{user.email}</div>}
        </div>
      </div>

      <div className="section-head" style={{ marginTop: 34 }}>
        <div><div className="eyebrow">Stay & Chat</div><h2 style={{ marginTop: 8 }}>Hotel & WhatsApp</h2></div>
      </div>
      <div className="card" style={{ padding: 20, marginTop: 18, maxWidth: 640 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>
              {hotel ? (hotel.hasHotel ? `🏨 ${hotel.hotelName}` : '🏨 No hotel booked yet') : '🏨 Hotel — not answered yet'}
            </div>
            <div className="muted" style={{ fontSize: 13, marginTop: 3 }}>
              Tell us where you're staying so we can plan transfers — and join the guest WhatsApp group for live updates.
            </div>
          </div>
          <button className="btn btn-dark btn-sm" onClick={() => setHotelOpen(true)}>{hotel ? 'Update' : 'Answer now'}</button>
          <a className="btn btn-ghost btn-sm" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp group →</a>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: 34 }}>
        <div><div className="eyebrow">Race Day Pass</div><h2 style={{ marginTop: 8 }}>My ticket</h2></div>
      </div>
      <p className="page-sub" style={{ maxWidth: 640 }}>
        Your entry for the A2RL Imola finals on 5 September. Once your official ticket arrives, store it
        here — it stays with your account and is ready to show at the gate from any device.
      </p>

      <div style={{ marginTop: 22, maxWidth: 640 }}>
        <div>
          {ticket ? (
            <div className="card" style={{ padding: 18 }}>
              {ticket.mime === 'application/pdf'
                ? (
                  <object data={ticket.dataUrl} type="application/pdf" style={{ width: '100%', height: 460, borderRadius: 12 }}>
                    <div style={{ padding: 24, textAlign: 'center', fontSize: 14 }}>
                      PDF stored ✓ — <a href={ticket.dataUrl} download={ticket.fileName} style={{ fontWeight: 800 }}>open / download it here</a>
                    </div>
                  </object>
                )
                : <img src={ticket.dataUrl} alt="Your ticket" style={{ width: '100%', borderRadius: 12, display: 'block' }} />}
              <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <button className="btn btn-dark btn-sm" onClick={() => fileRef.current?.click()} disabled={busy}>Replace</button>
                <button className="btn btn-ghost btn-sm" onClick={() => { setTicket(null); show('Ticket removed') }}>Remove</button>
                <span className="muted" style={{ fontSize: 12, marginLeft: 'auto' }}>{ticket.fileName}</span>
              </div>
            </div>
          ) : (
            <div className="ticket-upload">
              <div style={{ fontSize: 40 }}>🎟️</div>
              <h3 style={{ fontSize: 20, marginTop: 10 }}>Tickets — coming soon</h3>
              <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, marginTop: 8, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
                Official race tickets haven't been distributed yet. As soon as yours arrives, upload it
                here (photo, screenshot or PDF) and it will always be ready on this page.
              </p>
              <button className="btn btn-red" style={{ marginTop: 18 }} onClick={() => fileRef.current?.click()} disabled={busy}>
                {busy ? 'Saving…' : 'Upload my ticket'}
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*,application/pdf"
            style={{ display: 'none' }}
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </div>
      </div>

      {hotelOpen && <HotelPrompt onClose={() => setHotelOpen(false)} />}
      {msg && <div className="toast"><span className="ok">●</span>{msg}</div>}
    </div>
  )
}
