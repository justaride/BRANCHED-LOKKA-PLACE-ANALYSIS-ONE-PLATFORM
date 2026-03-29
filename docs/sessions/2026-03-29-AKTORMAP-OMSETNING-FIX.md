# Session: Interaktivt Aktørkart + Omsetning Enhetsfiks

**Dato:** 2026-03-29
**Fokus:** Kartvisualisering av aktører + kritisk datafiks

---

## Gjennomført

### 1. Interaktivt Aktørkart (Leaflet)

Bygget interaktivt kart for årsrapport 2025 som viser 329 av 350 aktører på Grünerløkka.

**Nye filer:**
- `src/components/analyser/AktorMap.tsx` — Leaflet-kart med CircleMarkers, kategorifilter, popup
- `src/components/analyser/AktorMapWrapper.tsx` — SSR-safe wrapper (Next.js 16 krever dette)
- `src/types/aktor-map.ts` — AktorWithCoordinates, AktorCategory, CoordinateLookup
- `src/data/main-board/aktorer/2025-arsrapport-coordinates.json` — 249 geocodede adresser
- `scripts/geocode-actors.mjs` — Nominatim geocoding med rate limiting

**Endrede filer:**
- `src/lib/loaders/main-board.ts` — ny `loadAktorerWithCoordinates2025()`
- `src/app/main-board/analyser/2025-arsrapport/page.tsx` — integrert kart i Konkurransebildet-seksjonen
- `package.json` — leaflet, react-leaflet, @types/leaflet

**Geocoding-resultat:**
- 238 adresser geocodet via Nominatim API
- 11 Olaf Ryes Plass-adresser lagt inn manuelt (Nominatim feiler på disse)
- 21 aktører ekskludert fra kart (adresse utenfor Grünerløkka)

### 2. Omsetning Enhetsfiks (KRITISK)

Oppdaget at 49 aktører (#302-#350) hadde omsetning i tusen (k) feilaktig lagret som millioner.

**Rotårsak:** Plaace raw data bruker to enheter:
- `"NOK X mill."` for aktører med omsetning >= 1M
- `"NOK Xk"` for aktører med omsetning < 1M

Ved original parsing ble tallverdien tatt uten enhetskonvertering, så `"NOK 970k"` ble `omsetning: 970` (som om det var 970 millioner).

**Impact:**
| Metrikk | Før (feil) | Etter (korrigert) |
|---------|-----------|-------------------|
| Total omsetning | 27,748M | 4,072M |
| Handel | 8,423M | 2,129M |
| Mat & opplevelser | 14,187M | 1,629M |
| Tjenester | 5,138M | 313M |

**Kryssvalidering:** Plaace analyse-data (2025-arsrapport.json) rapporterer `handelsomsetning: 4,265,000,000` NOK. Korrigert aktørtotal 4,072M matcher godt (differanse = aktører utenfor topp-350).

**Alle markedsandeler rekalkulert** for samtlige 350 aktører.

### 3. Aktører Utenfor Grünerløkka (21 stk)

Identifisert tre kategorier:
- **Kjeder på hovedkontor-adresse** (Lilleaker, Bogstadveien, Sørkedalsveien)
- **Holdingselskap med "OSLO"** som adresse (Casso, Fyrhuset Kuba, Inventarium, Bacaro)
- **Feil Plaace-registrering** (Sabrura Markveien AS → Olav Tryggvasons Gate, Fitness 24 Seven Markveien → Østre Aker Vei)

---

## Oppdaterte dokumenter

- `PROJECT_STATUS.md` — nye entries for kart og enhetsfiks
- `CLAUDE.md` — Gotcha #12 (omsetning enheter), Gotcha #13 (aktører utenfor kartutsnitt), oppdatert stack/health

---

## Neste steg

- Vurdere opprydding av aktører med feil adresse (flytte til riktig butikkadresse)
- Marker clustering for tettere zoom-nivåer
- Gjenbruke AktorMap på mikro-område-sider
- Validere omsetningsenheter ved fremtidig Plaace-dataimport
