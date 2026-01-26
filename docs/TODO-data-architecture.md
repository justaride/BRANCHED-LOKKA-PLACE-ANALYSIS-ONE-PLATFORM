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
