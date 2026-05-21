# Kvartalsrapport - tallgrunnlag som bør oppdateres

Opprettet: 2026-05-21

## Formål

Dette notatet samler hvilke datapunkter som bør oppdateres ved neste revisjon av kvartalsrapporten for banktransaksjoner på Grünerløkka.

## Primær oppdatering

1. Legg inn nytt kvartal i `src/data/main-board/quarterly/banktransaksjoner-2019-2025.json`.
   - Nåværende dataserie stopper på Q4 2025.
   - Q4 2025 er registrert som 643,668 MNOK.
   - Ved Q1 2026-oppdatering bør filnavn, metadata og synlige tekster vurderes oppdatert fra `2019-2025` til `2019-2026`.

2. Beregn og kontroller nøkkeltall:
   - Q1 2026 total bankhandel.
   - YoY mot Q1 2025.
   - QoQ mot Q4 2025.
   - Rullerende siste 4 kvartaler.
   - Avvik mot historisk Q1-snitt.

## Data som bør hentes samtidig

1. Daglig transaksjonsserie
   - `src/data/main-board/quarterly/daily-transactions.json` er sist merket `2025-11-16`.
   - Hent ny daglig eksport hvis tilgjengelig, helst med full Q4 2025 og Q1 2026.
   - Ikke bruk kategorifordelingen Handel / Mat og opplevelser / Tjenester som hardt tallgrunnlag uten verifisering.

2. Kategorifordeling
   - Eksisterende repo-notat sier at BankAxept-data gir totaler, ikke verifisert kategorifordeling.
   - Avklar om kategorier kan hentes fra Plaace, annen kilde eller må fjernes/merkes tydelig som estimat.

3. Bevegelse/fotfall
   - Totaltrafikk for samme kvartal.
   - Besøk per ukedag og time.
   - Besøksopphav / hvor besøkende kommer fra.
   - Sammenlign endring i trafikk mot endring i bankhandel.

4. Aktør- og konkurransebilde
   - Nye og utgåtte konsepter siden forrige kvartal.
   - Kjeder vs uavhengige.
   - Konseptmiks.
   - Omsetningsendringer per hovedkategori.

5. Bolig- og lokalmarkedsindikatorer
   - Krogsveen/Eiendom Norge-kontekst for Grünerløkka: kvartalsendring, kvadratmeterpris, salgstid og solgte boliger.
   - Brukes som kontekst, ikke som primær kilde for handelstall.

6. Demografi
   - Oslo Statistikkbanken har 2026-oppdaterte bydelstabeller.
   - Relevante felt: folkemengde, alder, landbakgrunn og husholdninger hvis rapporten skal forklare kundegrunnlag.

7. Betalingsmarked / makro
   - Vurder kort notat om BankAxept, mobilbetaling og betalingsmiks dersom dette påvirker tolkning av BankAxept-/kortdata over tid.

## Kilder og arbeidsflater

- Primær rapportside: `/main-board/analyser/kvartalsrapport-banktransaksjoner`
- Kvartalsdata: `src/data/main-board/quarterly/banktransaksjoner-2019-2025.json`
- Dagligdata: `src/data/main-board/quarterly/daily-transactions.json`
- Datakvalitetsnotat: `docs/TODO-data-architecture.md`
- Offisiell demografikilde: Oslo Statistikkbanken / Bydelsfakta
- Boligmarkedsreferanse: Krogsveen prisstatistikk for Oslo: Grünerløkka

## Anbefalt arbeidsrekkefølge

1. Importer verifisert Q1 2026-total.
2. Oppdater metadata, fil-/sidetekster og siste oppdateringsdato.
3. Kjør beregninger for YoY, QoQ og rullerende 4 kvartaler.
4. Hent eller avklar dagligdata og kategorifordeling.
5. Suppler med bevegelse, aktørstatus, demografi og boligmarkedskontekst.
6. Kjør datavalidering og visuell QA av rapporten.
