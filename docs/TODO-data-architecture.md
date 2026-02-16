# Dataarkitektur - Kvalitetssikring og Koordinering

## Status: Planlagt

Opprettet: 2026-01-26

## Bakgrunn

Under oppdatering av kvartalsrapport Q4 2025 ble det identifisert usikkerhet
rundt kategorifordeling (Handel, Mat og opplevelser, Tjenester). BankAxept-data
gir kun totaler, ikke kategorifordeling.

## Prioriterte oppgaver

### 1. Datakilde-kartlegging

- [ ] Kartlegg alle datakilder: Plaace, BankAxept, Telia, SSB
- [ ] Dokumenter hvilke parametere hver kilde gir
- [ ] Identifiser overlapp og hull

### 2. Analyse-koordinering

- [ ] Liste alle analyser med deres respektive utsnitt
  - main-board mikro-områder (5 stk)
  - 2024-arsrapport
  - Eiendomsanalyser (51 eiendommer)
- [ ] Dokumenter parameter-konfigurasjon (1-min, 5-min, område)
- [ ] Identifiser datapunkter som kan syntetiseres

### 3. Eiendomsdata-vurdering

- [ ] Gjennomgå 51 eiendommer
- [ ] Kategoriser: Implementert data vs Screenshots
- [ ] Vurder ekstraksjons-muligheter fra screenshots
- [ ] Planlegg effektiv datahenting (unngå enkelt-søk i Plaace)

### 4. 2025 Årsrapport-forberedelse

- [ ] Identifiser datapunkter som trengs
- [ ] Planlegg batch-eksport fra Plaace
- [ ] Koordiner med eksisterende analyse-struktur

### 5. Kategorifordeling

- [ ] Verifiser opprinnelse av daily-transactions.json
- [ ] Finn genereringsskript (trolig i Google Drive)
- [ ] Beslutt: Behold med disclaimer / Fjern / Rekalkuler

### 6. Sammenligning 2024 - Datainnhenting

Interaktive grafer er implementert for "Områdesammenligning 2024", men bruker delvis syntetiske/placeholder data. Følgende data må innhentes fra Plaace/kilder:

**Korthandel (Sammenligning av 4 områder: Løkka, Bjørvika, Sentrum, Majorstuen)**
- [x] Total omsetning 2024 per område (NOK)
- [x] Årlig vekst per område (%)
- [x] Indeksert vekst per måned 2024 (jan=100 eller jan=basis)
- [x] Ukedagsfordeling (%) per område

**Konkurransebilde**
- [x] Utvikling over tid (2015-2025): Antall enheter/omsetning per kategori (Handel, Servering, Tjenester)
- [x] Markedsandeler vs Oslo Kommune (Over/underandel per kategori)

*Fil som skal oppdateres:* `src/data/main-board/analyser/sammenligning-2024/korthandel-sammenligning.json` og `konkurranse-sammenligning.json`
*Status:* ✅ CSV-filer mottatt og prosessert 26.01.2026.

## Datakilder å kartlegge

| Kilde     | Type        | Parametere                               | Dekning       |
| --------- | ----------- | ---------------------------------------- | ------------- |
| Plaace.co | API/Eksport | Bevegelse, konkurransebilde, konseptmiks | Varierer      |
| BankAxept | CSV         | Daglige totaler                          | 2019-2025     |
| Telia     | ?           | Mobildata/bevegelse                      | ?             |
| SSB       | API         | Demografi                                | Kommune/bydel |

## Analyse-oversikt å komplettere

| Analyse                 | Område-parameter | Status   |
| ----------------------- | ---------------- | -------- |
| 2024-arsrapport         | 1.14 km²         | Komplett |
| nedre-tmg               | 5-min            | Komplett |
| ovre-tmg                | 5-min            | Komplett |
| midt-i-markveien        | 5-min            | Komplett |
| nederst-i-markveien     | 5-min            | Komplett |
| olaf-ryes-plass-7eleven | 5-min            | Komplett |
| olaf-ryes-plass-boots   | 5-min            | Komplett |
| Eiendomsanalyser        | 5-min/1-min      | Varierer |

## Notater

- Unngå individuelle Plaace-søk per eiendom
- Vurder batch-eksport eller API-løsning
- 2024-data er mer komplett enn 2025
- Screenshots kan potensielt OCR-ekstraheres
