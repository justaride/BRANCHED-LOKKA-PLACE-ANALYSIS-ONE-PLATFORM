export type MethodologySection = {
  id: string
  title: string
  content: string
  icon: string
}

export const METHODOLOGY_SECTIONS: MethodologySection[] = [
  {
    id: 'teledata',
    title: 'Hva er teledata?',
    icon: '📡',
    content:
      'Bevegelsestallene er basert på anonymiserte mobilsignaler fra Telia, Norges nest største mobiloperatør. ' +
      'Når en mobiltelefon er slått på, kommuniserer den jevnlig med nærliggende basestasjoner — ' +
      'hver enhet genererer 200–400 datapunkter daglig, noe som gir over 600 millioner signaler per dag i Norge alene. ' +
      'Plaace.ai samler inn og analyserer disse signalene for å estimere hvor mange mennesker som oppholder seg i et gitt område. ' +
      'Alle data er fullstendig anonymisert — ingen individer kan identifiseres.',
  },
  {
    id: 'measurement',
    title: 'Hvordan måles fottrafikk?',
    icon: '📏',
    content:
      'Hvert mikro-område har en definert geografisk sone (polygon). Når en mobilenhet registreres innenfor denne sonen ' +
      'over en viss tid, telles det som ett besøk. Korte passeringer (f.eks. å kjøre gjennom i bil) filtreres bort. ' +
      'Tallene du ser er daglige gjennomsnitt beregnet over hele måleperioden.',
  },
  {
    id: 'categories',
    title: 'Hva betyr kategoriene?',
    icon: '👥',
    content:
      'Dataen skiller mellom tre typer bevegelse basert på enhetens mønster over tid:\n\n' +
      '• Besøkende — Enheter som verken bor eller jobber i sonen. Dette er folk som aktivt oppsøker området.\n' +
      '• På jobb — Enheter som regelmessig oppholder seg i sonen på dagtid (mandag–fredag). Identifisert gjennom arbeidsmønster.\n' +
      '• Hjemme — Enheter som er registrert som boende i sonen, basert på nattmønster (kl. 00–06).',
  },
  {
    id: 'period',
    title: 'Måleperiode og aggregering',
    icon: '📅',
    content:
      'Tallene er gjennomsnitt over den angitte måleperioden (vanligvis 1–3 år). ' +
      'Daglig gjennomsnitt beregnes ved å summere alle registrerte enheter i perioden og dele på antall dager. ' +
      'Sesongvariasjoner jevnes dermed ut, men kvartalsvis og månedlig data er tilgjengelig i egne visninger.',
  },
  {
    id: 'limitations',
    title: 'Begrensninger og nøyaktighet',
    icon: '⚠️',
    content:
      'Teledata har noen kjente begrensninger:\n\n' +
      '• Kun Telia-abonnenter registreres direkte. Telia har ca. 40% markedsandel i Norge. Plaace.ai ekstrapolerer fra denne dekningen til estimert totalpopulasjon.\n' +
      '• Data anonymiseres irreversibelt med 36 timers forsinkelse, og grupper under 5 personer vises aldri (GDPR-krav).\n' +
      '• Utenlandske turister med roaming-SIM kan ha lavere dekning.\n' +
      '• Innendørs signal kan være svakere, så aktivitet inne i bygninger kan underrapporteres.\n' +
      '• Noen mikro-områder har utilstrekkelig signaldekning og returnerer 0-data.\n\n' +
      'Til tross for dette er teledata den mest brukte metoden for fottrafikk-analyse i norsk byutvikling, ' +
      'og gir et pålitelig bilde av relative mønstre og trender over tid.',
  },
  {
    id: 'sources',
    title: 'Datakilder',
    icon: '🔗',
    content:
      'Plattformen kombinerer flere datakilder for et helhetlig bilde:\n\n' +
      '• Plaace.ai — Fottrafikk og virksomhetsdata (hovedleverandør)\n' +
      '• Telia — Rå teledata (anonymiserte mobilsignaler)\n' +
      '• SSB (Statistisk sentralbyrå) — Demografi, befolkning, inntekt\n' +
      '• BankAxept / Nets — Korttransaksjonsdata (aggregert, anonymisert)',
  },
]

export const METHODOLOGY_INTRO =
  'Tallene i denne analysen er basert på teledata — anonymiserte mobilsignaler som viser ' +
  'hvordan mennesker beveger seg i og gjennom et område. Her forklarer vi hvordan tallene ' +
  'fremkommer og hva de betyr.'

export const METHODOLOGY_COMPACT =
  'Basert på anonymiserte mobilsignaler fra Telia via Plaace.ai.'
