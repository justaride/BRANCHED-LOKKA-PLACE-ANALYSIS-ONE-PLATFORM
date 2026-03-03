# Deep Research: Kultur-seksjonen — Design

**Dato:** 2026-03-02
**Status:** Godkjent
**Metode:** Subagent-driven parallell research (7 agenter)

---

## Mål

1. Berike alle 5 eksisterende kulturseksjoner med komplett faktasjekk og nye datapunkter
2. Øke verification confidence til 0.85+ på alle claims
3. Legge til 2 nye seksjoner: Arkitektur & Byrom + Design & Kreativ Næring

## Nåværende status

| Seksjon | Datapunkter | Confidence | Side |
|---------|-------------|------------|------|
| Jazz | 7 artister, 4 venues, 5 perioder, 2 festivaler | 0.80 | Mangler |
| Hiphop | 6 artister, 3 crews, 4 seksjoner, 2 events | 0.76 | Mangler |
| Film | 10 filmer, 6 filmskapere, 3 kinoer | 0.70 | Ferdig |
| Teater | 9 scener, 3 grupper, 4 stedsspesifikke | 0.78 | Ferdig |
| Billedkunst | 11 kunstnere, 4 gatekunstnere, 7 fotografer | 0.77 | Ferdig |
| Arkitektur | — | — | Ny |
| Design | — | — | Ny |

## Arkitektur

### Parallell subagent-pipeline

```
┌─────────────────────────────────────────────────┐
│              FASE 1: Parallell Research          │
│                  (7 subagenter)                  │
├─────────┬─────────┬─────────┬─────────┬─────────┤
│ Agent 1 │ Agent 2 │ Agent 3 │ Agent 4 │ Agent 5 │
│  Jazz   │ Hiphop  │  Film   │ Teater  │Billedk. │
├─────────┴─────────┴─────────┼─────────┴─────────┤
│         Agent 6             │     Agent 7        │
│    Arkitektur & Byrom       │ Design & Kreativ   │
└─────────────────────────────┴────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│           FASE 2: Konsolidering                 │
│  - Merge JSON-filer                             │
│  - Oppdater kryssreferanser                     │
│  - Oppdater master_alt.json                     │
│  - Valider all data                             │
└─────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│           FASE 3: Implementasjon                │
│  - Bygg jazz-side                               │
│  - Bygg hiphop-side                             │
│  - Bygg arkitektur-side                         │
│  - Bygg design-side                             │
│  - Oppdater navigasjon                          │
│  - Oppdater eksisterende sider med ny data      │
└─────────────────────────────────────────────────┘
```

## Agent-spesifikasjoner

### Agent 1: Jazz Deep Research

**Input:** `src/data/biblioteket/kultur/jazz.json`
**Research-mål:**
- Verifiser alle 8 claims → mål 0.85+ confidence
- ECM Records historie og Løkka-tilknytning (Manfred Eicher)
- Oslo Jazzhus: eksakte åpnings- og lukkingsdatoer
- Blå: etableringsår, nøkkelpersoner, musikalsk profil
- Café Mir: jazz-programmering, aktive perioder
- Nye artister med sterk Løkka-tilknytning (minimum 3 nye)
- Album-referanser for eksisterende artister
- Priser og internasjonale anerkjennelser
- Victoria-forbindelsen til Løkka-jazz
- Jazzklubber og øvingslokaler

**Output:** Oppdatert `jazz.json` med nye datapunkter og høyere confidence

### Agent 2: Hiphop Deep Research

**Input:** `src/data/biblioteket/kultur/hiphop.json`
**Research-mål:**
- Verifiser alle 8 claims → mål 0.85+
- X-Ray Ungdomskulturhus: grunnleggelse 1994, Farooq Farooqi, utvikling
- Manglende fødselsår: Ari Bajgora, Sollin Sæle
- Karpe Diem / Karpe tilknytning til Løkka
- NRK Urørt og Løkka-artister
- Quick Style: opprinnelse, dansekonkurranser, internasjonalt gjennombrudd
- Flere breakdance-crews og graffiti-artister
- Beat-produsenter fra området
- Kulturhus-rollen i hip-hop-utvikling
- Nyere hip-hop-hendelser (2020-2025)

**Output:** Oppdatert `hiphop.json`

### Agent 3: Film Deep Research

**Input:** `src/data/biblioteket/kultur/film.json`
**Research-mål:**
- Øk confidence fra 0.70 til 0.85+ (lavest av alle seksjoner)
- Verifiser Edith Carlmar Løkka-tilknytning (flagget som usikker)
- Parkteatret som kino: eksakte årstall, seter, programmer
- Regina Teater: 1916-1928, ombygging til Evangeliesalen
- Ringen Kino: 2008-nå, programmer, besøkstall
- Nyere filmer satt på Løkka (2020-2025)
- Filminnspillingssteder på Grünerløkka
- TV-serier med Løkka-setting
- Filmfestivaler knyttet til området

**Output:** Oppdatert `film.json`

### Agent 4: Teater Deep Research

**Input:** `src/data/biblioteket/kultur/teater.json`
**Research-mål:**
- Verifiser Hausmania-claim (0.67 confidence)
- Parkteatret teaterhistorie: forestillinger, publikumstall
- Nyere forestillinger (2023-2025) på alle 9 scener
- Flere stedsspesifikke prosjekter
- Dansens Hus programmering og artister
- Riksscenen: folkemusikk, dans, programmering
- Black Box teater: eksperimentell scenekunst
- Frie grupper aktive i området (utover de 3 dokumenterte)
- Publikumstall og anmeldelser der tilgjengelig
- Teaterutdanning (KHiO, Teaterhøgskolen) tilknytning

**Output:** Oppdatert `teater.json`

### Agent 5: Billedkunst Deep Research

**Input:** `src/data/biblioteket/kultur/billedkunst.json`
**Research-mål:**
- Fyll inn tomme keyWorks: Theodor Kittelsen, Frits Thaulow
- Gustav Wentzel: tomme keyWorks-array
- Munch-adresser og perioder: verifiser mot Oslo Museum
- Nyere gatekunstprosjekter (2023-2025)
- Flere gallerier og utstillingsarenaer på Løkka
- Atelier Nord: historie, utstillinger, artister
- Oslo Open: Løkka-deltakere
- Purenkel galleri: historie, profil
- KHiO studentarbeider knyttet til bydelen
- Muraler og offentlig kunst

**Output:** Oppdatert `billedkunst.json`

### Agent 6: Arkitektur & Byrom (NY)

**Research-mål:**
- Bygningsstiler på Grünerløkka:
  - Murgårder (1860-1900): leiegårder, bakgårder
  - Jugendstil (1900-1920): utsmykninger, fasader
  - Funkis (1930-40): modernisering
  - 1960-tall: blokker, saneringsplaner
  - Nybygg (2000+): Vulkan, Mathallen
- Byfornyelsen (1970-2000):
  - Saneringsdebatten: rivingsplaner, beboerprotester
  - Stortingsvedtaket 1976 (utbedring over riving)
  - Rehabilitering av murgårdene
  - Bakgårdssanering
- Ikoniske bygg:
  - Paulus kirke (1892)
  - Schous bryggeri (1870-tallet)
  - Vulkan-området (2010+)
  - Akerselva industribygg
  - Grünerløkka skole
- Parker og torg:
  - Birkelunden (arbeiderbevegelsen, loppemarked)
  - Olaf Ryes plass (urban stue, 17. mai)
  - Sofienbergparken (historie, bruk)
  - Schous plass
- Arkitekter med Løkka-tilknytning
- Bevaringsverdi og kulturminnestatus

**Output:** Ny `arkitektur.json` (samme struktur som andre kultur-filer)

### Agent 7: Design & Kreativ Næring (NY)

**Research-mål:**
- Grafisk design-miljøet:
  - Designbyråer på Løkka
  - Typografi og bokdesign
  - Snøhetta-tilknytning (Brenneriveien)
- Mote og streetwear:
  - Norske merker med Løkka-base
  - Vintage/secondhand-kultur
  - Designerbutikker
- Kreative arbeidsplasser:
  - Mesh (coworking)
  - Sentralen-tilknytning
  - Kreative kontorfellesskap
- Vulkan som kreativt hub:
  - Mathallen (food design)
  - Dansens Hus
  - Westerdals (før flytting)
- Utdanning og rekruttering:
  - KHiO (Kunsthøgskolen i Oslo)
  - Westerdals
  - Studentmiljø og kreativt næringsliv
- Kreative næringer i tall:
  - Antall kreative bedrifter
  - Bransjemiks
  - Utviklingstrender

**Output:** Ny `design-kreativ.json` (samme struktur som andre kultur-filer)

## JSON-struktur for nye filer

Følger eksisterende mønster:

```typescript
{
  "id": "arkitektur" | "design-kreativ",
  "title": string,
  "subtitle": string,
  "intro": string,
  "sections": Section[],
  "sources": Source[],
  "claims": Claim[],
  "researchMetadata": {
    "lastVerified": "2026-03-02",
    "coverageScore": number,
    "staleAfterDays": 180
  },
  "crossReferences": CrossReference[],
  "metadata": {
    // section-specific counts
  }
}
```

## Konsolidering

Etter alle 7 agenter:
1. Valider alle oppdaterte JSON-filer mot TypeScript-interfaces
2. Oppdater `grunerlokka_master_alt.json`:
   - Legg til arkitektur og design i timeline
   - Utvid indeksene (people, venues, places)
   - Oppdater source_files-listen
3. Oppdater kryssreferanser mellom alle seksjoner
4. Kjør `npm run verify` for å sikre dataintegritet

## Implementasjon (etter research)

1. Bygg jazz-side (`kultur/jazz/page.tsx`)
2. Bygg hiphop-side (`kultur/hiphop/page.tsx`)
3. Bygg arkitektur-side (`kultur/arkitektur/page.tsx`)
4. Bygg design-side (`kultur/design/page.tsx`)
5. Oppdater hovedsiden (`kultur/page.tsx`) med nye seksjoner
6. Oppdater navigasjonskort (legg til 2 nye)
7. Oppdater layout-metadata
8. Oppdater eksisterende sider (film, teater, billedkunst) med nye data

## Suksesskriterier

- [ ] Alle claims har confidence ≥ 0.85
- [ ] Alle tomme felter fylt inn
- [ ] Minimum 3 nye datapunkter per seksjon
- [ ] 2 nye seksjoner med minimum 20 datapunkter hver
- [ ] Alle kryssreferanser oppdatert
- [ ] `npm run verify` passerer
- [ ] `npm run build` passerer
