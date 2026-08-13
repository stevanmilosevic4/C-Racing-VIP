import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSynced } from '../hooks'
import { logActivity } from '../activity'

export const WHATSAPP_LINK = 'https://chat.whatsapp.com/BBJL8besqgQ3a2k3PfMuKb?mode=gi_t'

// One shared map of everyone's hotel answers → visible on the admin side.
// booked: true (name in `hotel`) · false (not yet) · null (asked, skipped)
export type HotelAnswer = { booked: boolean | null; hotel: string; ts: number }
export type HotelMap = Record<string, HotelAnswer>

export function useHotels() {
  return useSynced<HotelMap>('cxa2rl.hotels', {})
}

// Shared QR block (used by the popup and the Profile page).
export function WhatsAppBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="wa-block">
      <img src="/whatsapp-qr.png" alt="WhatsApp group QR code" className="wa-qr" style={compact ? { width: 150, height: 150 } : undefined} />
      <div className="wa-copy">
        <b>Join the guest WhatsApp group</b>
        <p>Hotel tips, travel plans, day-by-day updates — everything for Imola in one chat. Scan the code with your phone, or tap the button.</p>
        <a className="btn btn-green btn-sm" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">Open in WhatsApp</a>
      </div>
    </div>
  )
}

// Login popup: asks about the hotel once, then shows the WhatsApp group QR.
export default function HotelCheck() {
  const { user, viewRole } = useAuth()
  const [hotels, setHotels] = useHotels()
  const [step, setStep] = useState<'ask' | 'which' | 'qr'>('ask')
  const [hotelName, setHotelName] = useState('')
  const [closed, setClosed] = useState(false)

  if (!user || viewRole !== 'vip' || closed) return null
  const mine = hotels[user.name]
  // already answered (or explicitly skipped) — but keep showing mid-flow
  if (mine && step === 'ask') return null

  function save(answer: HotelAnswer) {
    setHotels((h) => ({ ...h, [user!.name]: answer }))
  }

  function yes() { setStep('which') }
  function no() {
    save({ booked: false, hotel: '', ts: Date.now() })
    logActivity(user!.name, 'vip', 'Hotel check', 'not booked yet')
    setStep('qr')
  }
  function saveHotel() {
    const h = hotelName.trim()
    if (!h) return
    save({ booked: true, hotel: h, ts: Date.now() })
    logActivity(user!.name, 'vip', 'Hotel check', `booked · ${h}`)
    setStep('qr')
  }
  function dismiss() {
    // X / Done — if nothing was answered yet, mark as asked-but-skipped so the
    // popup doesn't nag every login; it can be redone from Profile → Hotel & travel.
    if (!hotels[user!.name]) save({ booked: null, hotel: '', ts: Date.now() })
    setClosed(true)
  }

  return (
    <div className="g-lightbox" style={{ cursor: 'default' }}>
      <div className="hotel-modal">
        <button className="hm-x" title="Close" onClick={dismiss}>✕</button>

        {step === 'ask' && (
          <>
            <div className="hm-emoji">🏨</div>
            <h3>Quick one, {user.name.split(' ')[0]} — did you book a hotel for Imola?</h3>
            <p className="muted" style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>Race week fills up fast around the circuit — we like to know everyone has a bed.</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn btn-red" style={{ flex: 1 }} onClick={yes}>Yes, booked</button>
              <button className="btn btn-dark" style={{ flex: 1 }} onClick={no}>Not yet</button>
            </div>
          </>
        )}

        {step === 'which' && (
          <>
            <div className="hm-emoji">📍</div>
            <h3>Nice — which hotel?</h3>
            <label className="field" style={{ marginTop: 16 }}>
              <span>Hotel name (and town if outside Imola)</span>
              <input autoFocus value={hotelName} onChange={(e) => setHotelName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveHotel()} placeholder="e.g. Hotel Olimpia, Imola" />
            </label>
            <button className="btn btn-red" style={{ width: '100%' }} onClick={saveHotel} disabled={!hotelName.trim()}>Save</button>
          </>
        )}

        {step === 'qr' && (
          <>
            <h3>{hotelName.trim() ? 'Saved ✓ — one more thing' : 'One more thing —'}</h3>
            <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>Everyone travelling to Imola is in here:</p>
            <WhatsAppBlock />
            <button className="btn btn-ghost" style={{ width: '100%', marginTop: 14 }} onClick={dismiss}>Done</button>
          </>
        )}
      </div>
    </div>
  )
}
