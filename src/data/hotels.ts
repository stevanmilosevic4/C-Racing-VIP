// Hotel status per guest + the guest WhatsApp group.
// Answers are stored in one shared map (keyed by guest name) so the
// organisers see everyone's status on the admin Guests page.

export type HotelRecord = {
  guest: string
  company: string
  email: string
  hasHotel: boolean
  hotelName: string // empty when hasHotel is false
  ts: number
}

export const HOTELS_KEY = 'cxa2rl.hotels'
export const WHATSAPP_URL = 'https://chat.whatsapp.com/BBJL8besqgQ3a2k3PfMuKb?mode=gi_t'
