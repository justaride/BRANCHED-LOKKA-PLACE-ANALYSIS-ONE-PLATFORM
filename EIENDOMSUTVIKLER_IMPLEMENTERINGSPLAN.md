# Implementeringsplan: Eiendomsutvikler-sider

## Oversikt
Denne planen beskriver hvordan alle 8 eiendomsutvikler-sider skal implementeres i den nye multi-tenant plattformen.

## Status: Main Board ✅ FERDIG
- ✅ `/main-board` - Landing page med hero banner
- ✅ `/main-board/analyser` - Analyser listing  
- ✅ `/main-board/analyser/kvartalsrapport-banktransaksjoner` - Kvartalrapport
- ✅ `/main-board/analyser/2024-arsrapport` - Årsrapport
- ✅ `/main-board/analyser/sammenligning-2024` - Områdesammenligning
- ✅ `/main-board/analyser/demografi-2017-2023` - Demografi

## 8 Eiendomsutviklere som skal implementeres

### Komplett liste:
1. **Aspelin Ramm** (`/aspelin-ramm`)
2. **Brødrene Evensen** (`/brodrene-evensen`)
3. **Eiendomsspar** (`/eiendomsspar`)
4. **Malling & Co** (`/malling-co`)
5. **Maya Eiendom** (`/maya-eiendom`)
6. **Roger Voda** (`/roger-vodal`)
7. **SiO** (`/sio`)
8. **SPABO Eiendom** (`/spabo-eiendom`)

## Sidestruktur per utvikler

### 1. Landing Page (`/[company]`)
**Innhold:**
- Hero-seksjon med selskapsinformasjon
- Oversikt over portefølje
- Nøkkeltall
- Lenker til undersider

**Komponenter:**
- Hero med gradient
- Stats cards
- Portfolio grid
- CTA-seksjoner

### 2. Eiendommer Listing (`/[company]/eiendommer`)
**Innhold:**
- Grid med alle eiendommer
- Filtreringsmuligheter
- Kort info per eiendom

**Komponenter:**
- PropertyCard (liste over alle eiendommer)
- Filter/sort functionality

### 3. Eiendom Detail (`/[company]/eiendommer/[id]`)
**Innhold:**
- Detaljert informasjon om en spesifikk eiendom
- Kart og bilder
- Nøkkeltall
- Stedsanalyse-data fra Plaace

**Komponenter:**
- PropertyHeader
- PropertyStats
- PropertyMap
- PlaceData integration

### 4. Om Prosjektet (`/[company]/om-prosjektet`)
**Innhold:**
- Informasjon om analyseverktøyet
- Kontaktinformasjon
- Datakilder

## Datastruktur

### Lokasjon av originale prosjekter:
```
/Users/gabrielboen/Downloads/LØKKA PROJECTS UPDATED AND BACKUPS FOLDER/
├── place-analysis-aspelin-ramm-BACKUP-20251119-143837/
├── place-analysis-brodreneevensen-BACKUP-20251119-142224/
├── place-analysis-eiendomsspar-BACKUP-20251119-151226/
├── Place-Analysis-Lokka-Malling-Co-BACKUP-20251119-153600/
├── place-analysis-maya-eiendom-BACKUP-20251119-152331/
├── place-analysis-roger-vodal-BACKUP-20251119-144644/
├── place-analysis-sio-BACKUP-20251119-154842/
└── place-analysis-lokka-SPABO-EIENDOM-backup-20251119-160804/
```

### Data per utvikler:
Hver utvikler har:
- `src/data/eiendommer/*.json` - JSON-filer med eiendomsdata
- `public/images/` - Bilder av eiendommer og selskap
- `src/app/page.tsx` - Landing page
- `src/app/eiendommer/page.tsx` - Eiendomsliste
- `src/app/eiendommer/[id]/page.tsx` - Eiendomsdetalj
- `src/app/om-prosjektet/page.tsx` - Om-side

## Implementeringsstrategi

### Fase 1: Data-migrering (Per utvikler)
1. **Kopier eiendomsdata**
   ```bash
   cp -r [original]/src/data/eiendommer/*.json → 
   /Users/gabrielboen/Downloads/lokka-gardeierforening-platform/src/data/[company]/
   ```

2. **Kopier bilder**
   ```bash
   cp -r [original]/public/images/* → 
   /Users/gabrielboen/Downloads/lokka-gardeierforening-platform/public/images/[company]/
   ```

3. **Opprett loader i `src/lib/loaders/[company].ts`**
   ```typescript
   export const AspelinRammLoaders = {
     loadAllEiendommer: async () => {
       const files = ['bellonabygget', 'vulkan-arena', ...];
       const data = await Promise.all(
         files.map(id => import(`@/data/aspelin-ramm/${id}.json`))
       );
       return data.map(m => m.default);
     },
     loadEiendom: async (id: string) => {
       return await import(`@/data/aspelin-ramm/${id}.json`);
     }
   };
   ```

### Fase 2: Side-migrering (Per utvikler)

#### A. Landing page (`/[company]/page.tsx`)
**Prosess:**
1. Les original `src/app/page.tsx`
2. Kopier komplett struktur
3. Endre data loading til loader
4. Oppdater bildesti til `/images/[company]/`

#### B. Eiendommer listing (`/[company]/eiendommer/page.tsx`)
**Prosess:**
1. Les original `src/app/eiendommer/page.tsx`
2. Kopier komplett struktur
3. Endre til `[company]Loaders.loadAllEiendommer()`
4. Oppdater routes til `/[company]/eiendommer/[id]`

#### C. Eiendom detail (`/[company]/eiendommer/[id]/page.tsx`)
**Prosess:**
1. Les original `src/app/eiendommer/[id]/page.tsx`
2. Kopier komplett struktur
3. Håndter async params (Next.js 16)
4. Endre til `[company]Loaders.loadEiendom(id)`

#### D. Om-side (`/[company]/om-prosjektet/page.tsx`)
**Prosess:**
1. Les original `src/app/om-prosjektet/page.tsx`
2. Kopier komplett struktur
3. Oppdater tenant-spesifikk info

### Fase 3: Komponent-deling

**Gjenbrukbare komponenter (allerede eksisterende):**
- `Card`, `CardHeader`, `CardTitle`, `CardContent`
- `Container`
- `Button`
- `NaturalStateCard`

**Nye komponenter som må lages:**
- `PropertyCard` - For eiendomsliste
- `PropertyHeader` - For eiendom detail header
- `PropertyStats` - For nøkkeltall
- `PropertyMap` - For kart-visning

## Implementeringsrekkefølge

### Anbefalt rekkefølge (basert på kompleksitet):

1. **Aspelin Ramm** (Start her - mest komplett)
   - 4 eiendommer (Bellonabygget, Nye Broverkstedet, Scandic Hotel Vulkan, Vulkan Arena)
   - Mest data og best dokumentert

2. **SiO** (Enkel struktur)
   - Færre eiendommer
   - God mal å bygge videre på

3. **Brødrene Evensen**
4. **Roger Voda**
5. **Eiendomsspar**
6. **Maya Eiendom**
7. **Malling & Co**
8. **SPABO Eiendom**

## Automatisering

### Script for batch-migrering:
```bash
#!/bin/bash
# migrate-company.sh [company-name]

COMPANY=$1
ORIGINAL="/Users/gabrielboen/Downloads/LØKKA PROJECTS UPDATED AND BACKUPS FOLDER/place-analysis-$COMPANY-BACKUP-*"
TARGET="/Users/gabrielboen/Downloads/lokka-gardeierforening-platform"

# 1. Kopier data
mkdir -p "$TARGET/src/data/$COMPANY"
cp -r "$ORIGINAL/src/data/eiendommer/"*.json "$TARGET/src/data/$COMPANY/"

# 2. Kopier bilder
mkdir -p "$TARGET/public/images/$COMPANY"
cp -r "$ORIGINAL/public/images/"* "$TARGET/public/images/$COMPANY/"

# 3. Kopier sider
mkdir -p "$TARGET/src/app/$COMPANY"
cp -r "$ORIGINAL/src/app/"* "$TARGET/src/app/$COMPANY/"

echo "Migrasjon fullført for $COMPANY"
```

## Testing per utvikler

### Sjekkliste etter implementering:
- [ ] Landing page laster (`/[company]`)
- [ ] Eiendommer-liste vises (`/[company]/eiendommer`)
- [ ] Alle eiendommer har detail-sider
- [ ] Bilder laster korrekt
- [ ] Om-siden vises
- [ ] Ingen console errors
- [ ] All data vises korrekt

## Estimat

### Tid per utvikler:
- **Data-migrering:** 15-30 min
- **Side-implementering:** 30-45 min
- **Testing og feilretting:** 15-30 min
- **Total:** ~1-1.5 timer per utvikler

### Total tid for 8 utviklere:
- **8-12 timer** totalt

## Neste session: Start med Aspelin Ramm

### Konkret plan:
1. Opprett `src/data/aspelin-ramm/` mappe
2. Kopier alle 4 eiendoms-JSON filer
3. Opprett `src/lib/loaders/aspelin-ramm.ts`
4. Implementer loader-funksjoner
5. Kopier bilder til `public/images/aspelin-ramm/`
6. Implementer `/aspelin-ramm/page.tsx`
7. Implementer `/aspelin-ramm/eiendommer/page.tsx`
8. Implementer `/aspelin-ramm/eiendommer/[id]/page.tsx`
9. Implementer `/aspelin-ramm/om-prosjektet/page.tsx`
10. Test alle sider

## Notater

- **Token-økonomi:** Bruk batch-operasjoner når mulig
- **Gjenbruk:** Maksimer gjenbruk av komponenter og mønstre
- **Konsistens:** Følg samme mønster som Main Board
- **Testing:** Test hver utvikler før neste
- **Dokumentasjon:** Oppdater denne planen etter hvert

---
**Sist oppdatert:** 2025-11-19
**Status:** Klar for implementering
**Neste:** Start Aspelin Ramm-migrering
