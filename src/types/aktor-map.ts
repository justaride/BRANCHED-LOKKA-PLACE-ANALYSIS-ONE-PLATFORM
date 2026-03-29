export type AktorCategory = 'Handel' | 'Mat og opplevelser' | 'Tjenester'

export type AktorWithCoordinates = {
  rank: string
  navn: string
  type: string
  adresse: string
  omsetning: number
  yoy_vekst: number | null
  ansatte: number
  markedsandel: number
  lat: number
  lng: number
  category: AktorCategory
}

export type CoordinateLookup = Record<string, { lat: number; lng: number } | null>
