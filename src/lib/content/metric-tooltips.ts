export const METRIC_TOOLTIPS = {
  dagligeBesokende:
    'Gjennomsnittlig antall unike mobilenheter registrert i sonen per dag. Basert på Telia teledata via Plaace.ai. Tallet ekstrapoleres fra Telias markedsandel (~25%) til estimert totalpopulasjon.',
  befolkning:
    'Registrerte innbyggere i området. Kilde: SSB folkeregisterdata.',
  virksomheter:
    'Antall registrerte kommersielle lokaler i området. Kilde: Plaace.ai bedriftsregister basert på Brønnøysundregistrene.',
  omsetning:
    'Estimert årlig omsetning for virksomhetene i området. Basert på Plaace.ai analyse av registrerte virksomheter og offentlige regnskapstall.',
  besokPerTime:
    'Gjennomsnittlig antall mobilenheter registrert per klokketime, beregnet over hele måleperioden. Viser når på døgnet området er mest besøkt.',
  besokPerUkedag:
    'Gjennomsnittlig besøkstall fordelt på ukedager. Basert på teledata over hele måleperioden.',
  bevegelsesmonster:
    'Utvikling i bevegelsesmønster over tid (kvartalsvis). Viser trender i besøk, arbeid og boaktivitet i sonen.',
  omraderBesokende:
    'Hvilke bydeler/nabolag de besøkende kommer fra. Beregnet ut fra hvor mobilenhetene har sitt nattmønster (kl. 00–06), som indikerer hjemmeadresse.',
} as const

export type MetricTooltipKey = keyof typeof METRIC_TOOLTIPS
