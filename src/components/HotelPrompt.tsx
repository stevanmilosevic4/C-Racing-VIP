import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSynced } from '../hooks'
import { HOTELS_KEY, WHATSAPP_URL, type HotelRecord } from '../data/hotels'

// Hotel check-in popup: asks whether the guest booked a hotel; YES captures
// which one (shown to organisers), and both paths end on the WhatsApp-group
// QR. Rendered conditionally by its parent, so state resets on each open.

export default function HotelPrompt({ onClose }: { onClose: () => void }) {
  const { user } = useAuth()
  const [hotels, setHotels] = useSynced<Record<string, HotelRecord>>(HOTELS_KEY, {})
  const key = (user?.name ?? '').trim().toLowerCase()
  const existing = hotels?.[key]
  const [step, setStep] = useState<'ask' | 'which' | 'qr'>('ask')
  const [hotelName, setHotelName] = useState(existing?.hotelName ?? '')
  if (!user) return null

  function save(hasHotel: boolean, name: string) {
    if (!user) return
    setHotels((m) => ({
      ...(m ?? {}),
      [key]: { guest: user.name, company: user.company ?? '', email: user.email ?? '', hasHotel, hotelName: name.trim(), ts: Date.now() },
    }))
  }

  return (
    <div className="g-lightbox" style={{ cursor: 'default' }} onClick={onClose}>
      <div className="cal-form hp-card" onClick={(e) => e.stopPropagation()}>
        <button className="hp-x" onClick={onClose} title="Close">✕</button>

        {step === 'ask' && (
          <>
            <div className="eyebrow">Quick question</div>
            <h3 style={{ fontSize: 20, marginTop: 8 }}>Did you book a hotel for Imola?</h3>
            <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 8 }}>
              It helps us plan transfers and coordinate everyone around race day.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18 }}>
              <button className="btn btn-red" onClick={() => setStep('which')}>Yes</button>
              <button className="btn btn-dark" onClick={() => { save(false, ''); setStep('qr') }}>Not yet</button>
            </div>
          </>
        )}

        {step === 'which' && (
          <>
            <div className="eyebrow">Great!</div>
            <h3 style={{ fontSize: 20, marginTop: 8 }}>Which hotel?</h3>
            <form onSubmit={(e) => { e.preventDefault(); if (hotelName.trim()) { save(true, hotelName); setStep('qr') } }}>
              <label className="field" style={{ marginTop: 14 }}>
                <span>Hotel name (and town, if outside Imola)</span>
                <input value={hotelName} onChange={(e) => setHotelName(e.target.value)} placeholder="e.g. Hotel Olimpia, Imola" autoFocus />
              </label>
              <button className="btn btn-red" style={{ width: '100%' }} type="submit" disabled={!hotelName.trim()}>Save</button>
            </form>
          </>
        )}

        {step === 'qr' && (
          <>
            <div className="eyebrow">One more thing</div>
            <h3 style={{ fontSize: 20, marginTop: 8 }}>Join the guest WhatsApp group</h3>
            <p className="muted" style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 8 }}>
              Travel tips, hotel help and live updates around race day — all in one place.
            </p>
            <div className="hp-qr">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><img src="/whatsapp-qr.png" alt="WhatsApp group QR code" /></a>
            </div>
            <a className="btn btn-red" style={{ width: '100%', textAlign: 'center', display: 'block' }} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Open the group in WhatsApp
            </a>
            <p className="muted" style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>
              On your phone? Just tap the button. On a computer, scan the code with your phone's camera.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
