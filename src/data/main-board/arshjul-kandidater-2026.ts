import type { HjulKategori } from "@/types/arshjul";

export const ARSHJUL_KANDIDAT_STATUSER = [
  "klar",
  "sjekk",
  "oppdater",
] as const;

export type ArshjulKandidatStatus = (typeof ARSHJUL_KANDIDAT_STATUSER)[number];

export interface ArshjulKandidat {
  id: string;
  tittel: string;
  start?: string;
  slutt?: string;
  rytme?: string;
  sted: string;
  kategori: HjulKategori;
  vurdering: ArshjulKandidatStatus;
  beskrivelse: string;
  avklaring?: string;
  kilde: string;
}

export const arshjulKandidater2026: ArshjulKandidat[] = [
  {
    id: "kandidat-lokkadagene-host-2026",
    tittel: "Løkkadagene høst",
    start: "2026-09-12",
    slutt: "2026-09-13",
    sted: "Markveien, Olaf Ryes plass, Thorvald Meyers gate",
    kategori: "arrangement",
    vurdering: "klar",
    beskrivelse:
      "Direkte lokal handels- og bydelsaktivitet der butikker, serveringssteder, kulturaktører, frivillige organisasjoner og bydelen viser frem Løkka.",
    kilde: "https://visitlokka.no/lokkadagene/",
  },
  {
    id: "kandidat-sondagsmarkedet-ingens-gate-2026",
    tittel: "Søndagsmarkedet i Ingens gate / Blå",
    rytme: "Søndager året rundt",
    sted: "Ingens gate / Blå",
    kategori: "marked",
    vurdering: "klar",
    beskrivelse:
      "Fast lokal besøksdriver med kunst, håndverk, vintage og småskala handel. Passer best som gjentakende markedsanker.",
    kilde:
      "https://www.visitoslo.com/en/product/?name=Sunday-market-in-Ingensgate&tlp=2981313",
  },
  {
    id: "kandidat-piknik-i-parken-2026",
    tittel: "Piknik i Parken",
    start: "2026-06-11",
    slutt: "2026-06-13",
    sted: "Sofienbergparken",
    kategori: "kultur",
    vurdering: "klar",
    beskrivelse:
      "Stor sommerfestival på Løkka med tydelig publikumsstrøm, nabolagseffekt og behov for lokal planlegging.",
    kilde: "https://pipfest.no/",
  },
  {
    id: "kandidat-oslo-vegetarfestival-2026",
    tittel: "Oslo Vegetarfestival",
    start: "2026-05-30",
    slutt: "2026-05-31",
    sted: "Kubaparken, ved Vulkan",
    kategori: "arrangement",
    vurdering: "klar",
    beskrivelse:
      "Mat, grønn profil, marked og høy aktivitet tett på Vulkan og Grünerløkka. Relevans for servering, besøk og byliv.",
    kilde: "https://www.oslovegetarfestival.no/english",
  },
  {
    id: "kandidat-oslo-comics-expo-2026",
    tittel: "Oslo Comics Expo",
    start: "2026-06-11",
    slutt: "2026-06-13",
    sted: "Serieteket, Deichman Grünerløkka",
    kategori: "kultur",
    vurdering: "klar",
    beskrivelse:
      "Lokal kulturfestival med publikum for tegneserier, design, bokhandel, trykk, kafé og kulturaktører.",
    kilde: "https://www.oslocomicsexpo.no/2026/",
  },
  {
    id: "kandidat-grunerlokka-for-alle-2026",
    tittel: "Grünerløkka for alle",
    start: "2026-08-28",
    sted: "Sofienbergparken",
    kategori: "arrangement",
    vurdering: "klar",
    beskrivelse:
      "Bydels- og inkluderingsarrangement med stands, aktiviteter og lokalt fellesskap. God kandidat for nabolags- og foreningskalenderen.",
    kilde: "https://visitlokka.no/grunerlokka-for-alle-28-august/",
  },
  {
    id: "kandidat-oslo-street-art-festival-2026",
    tittel: "Oslo Street Art Festival / Meeting of Styles Oslo",
    start: "2026-07-10",
    slutt: "2026-07-12",
    sted: "Grünerløkka / Helgesens gate-området",
    kategori: "kultur",
    vurdering: "klar",
    beskrivelse:
      "Gatekunst, byrom, workshops og synlig stedsidentitet. Sterk kobling til Løkkas kultur- og byromsprofil.",
    kilde: "https://oslostreetartfestival.no/program/",
  },
  {
    id: "kandidat-bylarm-2026",
    tittel: "by:Larm",
    start: "2026-09-10",
    slutt: "2026-09-12",
    sted: "Blå, Vulkan Arena, Pokalen og flere Oslo-scener",
    kategori: "kultur",
    vurdering: "klar",
    beskrivelse:
      "Musikkbransje, konserter og kveldsliv med flere lokale Løkkascener. Relevant for servering, natteliv og logistikk.",
    kilde: "https://bylarm.no/about/by-larm-2026",
  },
  {
    id: "kandidat-oslo-kulturnatt-2026",
    tittel: "Oslo Kulturnatt",
    start: "2026-09-11",
    sted: "Bydekkende, lokale scener kan delta",
    kategori: "kultur",
    vurdering: "klar",
    beskrivelse:
      "Gratis endags kulturfestival. God anledning for samordnet kveldsåpent, åpne hus og lokal kulturprogrammering.",
    kilde: "https://www.oslokulturnatt.no/en/om-oss",
  },
  {
    id: "kandidat-coda-2026",
    tittel: "CODA Oslo International Dance Festival",
    start: "2026-10-08",
    slutt: "2026-10-18",
    sted: "Dansens Hus, Black Box teater, Riksscenen m.fl.",
    kategori: "kultur",
    vurdering: "klar",
    beskrivelse:
      "Treffer Vulkan/Dansens Hus og scenekunstprofilen på Løkka. Relevant som høstlig kulturanker.",
    kilde:
      "https://www.visitoslo.com/en/product/?name=CODA-Oslo-International-Dance-Festival&tlp=4993413",
  },
  {
    id: "kandidat-oslo-world-2026",
    tittel: "Oslo World",
    start: "2026-10-27",
    slutt: "2026-11-01",
    sted: "Blå, Parkteatret, Riksscenen m.fl.",
    kategori: "kultur",
    vurdering: "klar",
    beskrivelse:
      "Internasjonal musikkfestival med flere lokale scener. Relevant for kveldsliv og kulturprofil.",
    kilde: "https://osloworld.no/",
  },
  {
    id: "kandidat-julestjerne-juleapning-2026",
    tittel: "Tenning av julestjernen / juleåpning",
    rytme: "Ca. 28. november 2026",
    sted: "Olaf Ryes plass",
    kategori: "sesong",
    vurdering: "klar",
    beskrivelse:
      "Naturlig startpunkt for julehandel, lokal belysning og vinteraktivitet.",
    avklaring: "Dato og arrangør bør bekreftes før innlegging.",
    kilde: "https://visitlokka.no/",
  },
  {
    id: "kandidat-birkelunden-marked-fast-2026",
    tittel: "Birkelunden marked som fast markedsanker",
    rytme: "Søndager / sesongavhengig åpningstid",
    sted: "Birkelunden",
    kategori: "marked",
    vurdering: "sjekk",
    beskrivelse:
      "Årshjulet har allerede enkeltmarkeder i Birkelunden. Avklar om dette skal ligge som fast markedsanker, ikke ukentlig duplikat.",
    kilde: "https://vintageoslo.no/markeder/birkelunden-marked/",
  },
  {
    id: "kandidat-grunerlokka-skole-loppemarked-2026",
    tittel: "Grünerløkka skole loppemarked",
    start: "2026-04-18",
    slutt: "2026-04-19",
    sted: "Grünerløkka skole, Toftes gate 44",
    kategori: "marked",
    vurdering: "sjekk",
    beskrivelse:
      "Vårdato er funnet. Høstdato bør bekreftes for eventuell innlegging.",
    kilde: "https://grunerkorps.no/loppis",
  },
  {
    id: "kandidat-bondens-marked-birkelunden-2026",
    tittel: "Bondens marked Birkelunden",
    rytme: "Vår-/høstdatoer varierer",
    sted: "Birkelunden",
    kategori: "marked",
    vurdering: "sjekk",
    beskrivelse:
      "God mat- og lokalprodusent-match, men datoer må bekreftes for hver forekomst.",
    kilde: "https://bondensmarked.no/markedsplasser/birkelunden-gr-nerloekka",
  },
  {
    id: "kandidat-mathallen-program-2026",
    tittel: "Mathallen / Kulinarisk Akademi-program",
    rytme: "Løpende",
    sted: "Mathallen / Vulkan",
    kategori: "arrangement",
    vurdering: "sjekk",
    beskrivelse:
      "Mange enkeltkurs og arrangementer. Avklar om årshjulet skal ha en generell programperiode eller bare større åpne publikumsarrangementer.",
    kilde: "https://mathallenoslo.no/en/",
  },
  {
    id: "kandidat-heddadagene-2026",
    tittel: "Heddadagene",
    start: "2026-06-08",
    slutt: "2026-06-14",
    sted: "Oslo, med mulig lokal scenedeltakelse",
    kategori: "kultur",
    vurdering: "sjekk",
    beskrivelse:
      "Legg bare inn hvis Black Box eller andre lokale Løkkascener har relevant program.",
    kilde: "https://www.heddadagene.no/",
  },
  {
    id: "kandidat-queer-the-wack-2026",
    tittel: "Queer the W*ack",
    start: "2026-06-25",
    slutt: "2026-06-26",
    sted: "Dansens Hus, Vulkan",
    kategori: "kultur",
    vurdering: "sjekk",
    beskrivelse:
      "Sterk lokal kulturkandidat, men mer nisje. Passer hvis årshjulet skal vise Pride-/sceneaktivitet.",
    kilde: "https://www.dansenshus.com/en/performances/queer-the-w-ack",
  },
  {
    id: "kandidat-oslo-pix-2026",
    tittel: "Oslo Pix",
    start: "2026-08-24",
    slutt: "2026-08-30",
    sted: "Oslo / mulige lokale visningssteder",
    kategori: "kultur",
    vurdering: "sjekk",
    beskrivelse:
      "Bør knyttes til konkret lokal visning eller uteromsaktivitet på Løkka for å passe godt.",
    kilde: "https://www.oslopix.no/no/",
  },
  {
    id: "kandidat-oppdater-elvelangs-2026",
    tittel: "Elvelangs i fakkellys: oppdater dato",
    start: "2026-09-24",
    sted: "Akerselva, inkludert Grünerløkka/Vulkan-korridoren",
    kategori: "kultur",
    vurdering: "oppdater",
    beskrivelse:
      "Finnes allerede i årshjulet, men kilde viser 24. september 2026 kl. 20.00-23.00.",
    kilde: "https://www.elvelangs.no/",
  },
];
