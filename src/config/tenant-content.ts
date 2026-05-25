import type { CompanyTenantSlug } from '@/config/tenants';

export interface TenantFeature {
  title: string;
  description: string;
}

export interface TenantStat {
  value: string;
  label: string;
}

export interface TenantHomeContent {
  heroTitle: string;
  heroDescription: string;
  heroLogoImage?: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  heroImage: string;
  heroImageAlt: string;
  heroOverlayTitle: string;
  heroOverlaySubtitle: string;
  developmentIcon: string;
  developmentTitle: string;
  developmentDescription: string;
  propertiesCtaTitle: string;
  propertiesCtaDescription: string;
  propertiesCtaLabel: string;
  propertiesCtaHref?: string;
  featuresHeading: string;
  features: TenantFeature[];
  stats?: TenantStat[];
  showNaturalStateCard?: boolean;
}

export interface TenantAboutContent {
  metadataTitle: string;
  metadataDescription: string;
  purposeLead: string;
  purposeDetails: string;
  dataSources: string[];
  feedbackDescription?: string;
  feedbackUrl?: string;
}

export interface TenantPropertiesContent {
  metadataTitle: string;
  metadataDescription: string;
  headingDescription: string;
}

export interface TenantPageContent {
  home: TenantHomeContent;
  about: TenantAboutContent;
  properties: TenantPropertiesContent;
}

const DEFAULT_FEATURES: TenantFeature[] = [
  {
    title: 'Placeanalyser',
    description:
      'Detaljerte Plaace-rapporter med demografi, markedsdata og statistikk for hver eiendom.',
  },
  {
    title: 'Markedsinnsikt',
    description:
      'Prisnivåer, leieinntekter, transaksjonsdata og utviklingstrender for å forstå det lokale markedet.',
  },
  {
    title: 'Demografisk Data',
    description:
      'Befolkningssammensetning, inntektsnivå, aldersfordeling og andre nøkkeltall for området.',
  },
];

const DEFAULT_DEVELOPMENT_DESCRIPTION =
  'Dette er et analyseverktøy under kontinuerlig utvikling og vil være i prosess og berikelse gjennom hele prosjektet. Vi ønsker dine tilbakemeldinger, spørsmål, potensielle feil du oppdager, eller innsikter du gjerne skulle kikket nærmere på.';

const DEFAULT_DATA_SOURCES = [
  'Plaace-rapporter med demografi, handel og bevegelsesmønstre',
  'Historisk informasjon om bygningene',
  'Miljødata og bærekraftmetrikker',
  'Kartdata og geografisk informasjon',
];

export const TENANT_PAGE_CONTENT: Record<CompanyTenantSlug, TenantPageContent> = {
  'aspelin-reitan': {
    home: {
      heroTitle: 'Aspelin Reitan Vulkan',
      heroDescription:
        'Omfattende placeanalyser og eiendomsinformasjon for Aspelin Reitans portefolje på Vulkan. Utforsk demografi, markedsdata og utviklingstrender for seks bærekraftige eiendommer i FutureBuilt-området.',
      primaryCtaLabel: 'Se Eiendommer',
      secondaryCtaLabel: 'Om Prosjektet',
      heroImage: '/images/companies/aspelin-reitan.webp',
      heroImageAlt: 'Vulkan - Aspelin Reitan portefolje',
      heroOverlayTitle: 'Aspelin Reitan Vulkan',
      heroOverlaySubtitle: '6 eiendommer på Vulkan',
      developmentIcon: '🚧',
      developmentTitle: 'Verktøy under utvikling',
      developmentDescription: DEFAULT_DEVELOPMENT_DESCRIPTION,
      propertiesCtaTitle: 'Utforsk Våre Eiendommer',
      propertiesCtaDescription:
        'Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for alle 6 eiendommer i Aspelin Reitan sin portefolje på Vulkan.',
      propertiesCtaLabel: 'Se Alle Eiendommer →',
      featuresHeading: 'Hva du finner her',
      features: [
        {
          ...DEFAULT_FEATURES[0],
          description:
            'Detaljerte Plaace-rapporter med demografi, markedsdata og statistikk for hver eiendom i Vulkan-området.',
        },
        DEFAULT_FEATURES[1],
        DEFAULT_FEATURES[2],
      ],
    },
    about: {
      metadataTitle: 'Om Prosjektet - Aspelin Reitan',
      metadataDescription:
        'Informasjon om Place Analysis for Aspelin Reitans eiendommer på Vulkan',
      purposeLead:
        'Dette er en dedikert plattform for placeanalyser av Aspelin Reitans eiendommer på Vulkan-området. Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender for å gi et helhetlig bilde av hver eiendom.',
      purposeDetails:
        'Vulkan-området representerer et unikt FutureBuilt-prosjekt med fokus på bærekraftig byutvikling, energieffektivitet og sosial bærekraft. Disse analysene hjelper oss å forstå og dokumentere områdets utvikling og attraktivitet.',
      dataSources: [
        'Plaace-rapporter med demografi, handel og bevegelsesmønstre',
        'Historisk informasjon om bygningene og deres rolle i FutureBuilt',
        'Energidata og bærekraftmetrikker',
        'Kartdata og geografisk informasjon',
      ],
    },
    properties: {
      metadataTitle: 'Aspelin Reitan Eiendommer',
      metadataDescription: 'Oversikt over Aspelin Reitans eiendommer på Vulkan',
      headingDescription:
        'Utforsk placeanalyser og eiendomsinformasjon for Aspelin Reitans portefolje på Vulkan',
    },
  },
  'brodrene-evensen': {
    home: {
      heroTitle: 'Brødrene Evensen',
      heroDescription:
        'Omfattende placeanalyser og eiendomsinformasjon for Brødrene Evensens eiendommer på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for tre eiendommer i området.',
      primaryCtaLabel: 'Se Eiendommer',
      secondaryCtaLabel: 'Om Prosjektet',
      heroImage: '/images/companies/brodrene-evensen.webp',
      heroImageAlt: 'Grünerløkka område - Brødrene Evensen portefølje',
      heroOverlayTitle: 'Brødrene Evensen',
      heroOverlaySubtitle: '3 eiendommer på Grünerløkka',
      developmentIcon: '🚧',
      developmentTitle: 'Verktøy under utvikling',
      developmentDescription: DEFAULT_DEVELOPMENT_DESCRIPTION,
      propertiesCtaTitle: 'Utforsk Våre Eiendommer',
      propertiesCtaDescription:
        'Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for alle 3 eiendommer i Brødrene Evensen sin portefølje på Grünerløkka.',
      propertiesCtaLabel: 'Se Alle Eiendommer →',
      featuresHeading: 'Hva du finner her',
      features: DEFAULT_FEATURES,
    },
    about: {
      metadataTitle: 'Om Prosjektet - Brødrene Evensen',
      metadataDescription:
        'Informasjon om Place Analysis for Brødrene Evensens eiendommer i Oslo',
      purposeLead:
        'Dette er en dedikert plattform for placeanalyser av Brødrene Evensens eiendommer i Oslo. Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender for å gi et helhetlig bilde av hver eiendom.',
      purposeDetails:
        'Analysene hjelper oss å forstå og dokumentere eiendommenes utvikling, attraktivitet og potensial i et dynamisk bylandskap.',
      dataSources: DEFAULT_DATA_SOURCES,
    },
    properties: {
      metadataTitle: 'Brødrene Evensen Eiendommer',
      metadataDescription: 'Oversikt over Brødrene Evensens eiendommer på Grünerløkka',
      headingDescription:
        'Utforsk placeanalyser og eiendomsinformasjon for Brødrene Evensens portefølje på Grünerløkka',
    },
  },
  carucel: {
    home: {
      heroTitle: 'Carucel',
      heroLogoImage: '/images/companies/carucel/logo.png',
      heroDescription:
        'Omfattende 1-minutts gangavstand analyse for Olaf Ryes plass 4 på Grünerløkka. Utforsk hyperlokal demografi, bevegelsesmønster, korthandel og konkurransebilde i Oslos mest levende bydel.',
      primaryCtaLabel: 'Se Eiendomsanalyse',
      heroImage: '/images/companies/carucel/olaf-ryes-plass-4-omradebildet.png',
      heroImageAlt: 'Olaf Ryes plass - Carucel eiendomsportefølje',
      heroOverlayTitle: 'Olaf Ryes Plass 4',
      heroOverlaySubtitle: '1 minutts gangavstand analyse - Grünerløkka, Oslo',
      developmentIcon: '🔬',
      developmentTitle: '1-minutts gangavstand analyse',
      developmentDescription:
        'Denne rapporten fokuserer på det hyperlokale området rundt Olaf Ryes plass 4 - ca. 80 meters radius. Data inkluderer demografi, bevegelsesmønster, korthandel, konkurransebilde og aktørkartlegging fra Plaace, BankAxept, Telia og SSB.',
      propertiesCtaTitle: 'Utforsk Eiendomsanalysen',
      propertiesCtaDescription:
        'Se detaljerte visualiseringer av demografi, bevegelse, korthandel og konkurransebilde for Olaf Ryes plass 4.',
      propertiesCtaLabel: 'Se Full Analyse →',
      propertiesCtaHref: '/carucel/eiendommer/olaf-ryes-plass-4',
      featuresHeading: 'Hva analysen inneholder',
      features: [
        {
          title: 'Demografi',
          description:
            'Aldersfordeling, inntektsnivå, husholdningstyper og befolkningsutvikling for området rundt eiendommen.',
        },
        {
          title: 'Bevegelsesmønster',
          description:
            'Besøkende per time og ukedag, hvor de kommer fra geografisk, og internasjonale besøkende per kvartal.',
        },
        {
          title: 'Konkurransebilde',
          description:
            'Konseptmiks, kjeder vs. uavhengige, over-/underindeks sammenlignet med Oslo kommune.',
        },
      ],
      stats: [
        { value: '616', label: 'Innbyggere' },
        { value: '3 495', label: 'Daglige besøkende' },
        { value: '21', label: 'Næringsaktører' },
        { value: '236M', label: 'Total omsetning (NOK)' },
      ],
      showNaturalStateCard: true,
    },
    about: {
      metadataTitle: 'Om Prosjektet - Carucel',
      metadataDescription: 'Informasjon om 1-minutts analyse for Carucel',
      purposeLead:
        'Dette er en dedikert plattform for hyperlokal placeanalyse rundt Olaf Ryes plass 4. Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender for å gi et helhetlig bilde av eiendommen.',
      purposeDetails:
        'Analysen er strukturert rundt 1-minutts gangavstand for å gi ekstra detaljert innsikt i den umiddelbare konteksten rundt eiendommen.',
      dataSources: [
        'Plaace-rapporter med demografi, handel og bevegelsesmønstre',
        'BankAxept-transaksjonsdata',
        'Telia mobilitetsdata',
        'SSB demografi og nøkkeltall',
      ],
    },
    properties: {
      metadataTitle: 'Carucel Eiendomsportefølje',
      metadataDescription:
        'Oversikt over Carucel sin eiendom på Olaf Ryes plass, Grünerløkka',
      headingDescription:
        'Utforsk placeanalyser og eiendomsinformasjon for Carucel sin portefølje på Grünerløkka',
    },
  },
  'eiendomsspar': {
    home: {
      heroTitle: 'Eiendomsspar',
      heroDescription:
        'Omfattende placeanalyser og eiendomsinformasjon for Eiendomsspars portefølje på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for tre eiendommer på Thorvald Meyers gate.',
      primaryCtaLabel: 'Se Eiendommer',
      secondaryCtaLabel: 'Om Prosjektet',
      heroImage: '/images/companies/eiendomsspar.jpg',
      heroImageAlt: 'Grünerløkka område - Eiendomsspar portefølje',
      heroOverlayTitle: 'Eiendomsspar',
      heroOverlaySubtitle: '2 eiendommer på Grünerløkka',
      developmentIcon: '🚧',
      developmentTitle: 'Verktøy under utvikling',
      developmentDescription: DEFAULT_DEVELOPMENT_DESCRIPTION,
      propertiesCtaTitle: 'Utforsk Våre Eiendommer',
      propertiesCtaDescription:
        'Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for begge eiendommene i Eiendomsspar sin portefølje på Grünerløkka.',
      propertiesCtaLabel: 'Se Alle Eiendommer →',
      featuresHeading: 'Hva du finner her',
      features: [
        {
          ...DEFAULT_FEATURES[0],
          description:
            'Detaljerte Plaace-rapporter med demografi, markedsdata og statistikk for hver eiendom på Thorvald Meyers gate.',
        },
        DEFAULT_FEATURES[1],
        DEFAULT_FEATURES[2],
      ],
    },
    about: {
      metadataTitle: 'Om Prosjektet - Eiendomsspar',
      metadataDescription:
        'Informasjon om Place Analysis for Eiendomsspars eiendomsportefølje',
      purposeLead:
        'Dette er en dedikert plattform for placeanalyser av Eiendomsspars eiendomsportefølje. Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender for å gi et helhetlig bilde av hver eiendom.',
      purposeDetails:
        'Analysene hjelper oss å forstå og dokumentere eiendommenes utvikling, attraktivitet og potensial i et dynamisk bylandskap.',
      dataSources: DEFAULT_DATA_SOURCES,
    },
    properties: {
      metadataTitle: 'Eiendomsspar Portefølje',
      metadataDescription:
        'Oversikt over Eiendomsspars eiendommer på Thorvald Meyers gate',
      headingDescription:
        'Utforsk placeanalyser og eiendomsinformasjon for Eiendomsspars portefølje på Thorvald Meyers gate',
    },
  },
  'front-real-estate': {
    home: {
      heroTitle: 'Front Real Estate',
      heroDescription:
        'Omfattende placeanalyser og eiendomsinformasjon for Front Real Estate sine eiendommer på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for to eiendommer i området.',
      primaryCtaLabel: 'Se Eiendommer',
      secondaryCtaLabel: 'Om Prosjektet',
      heroImage: '/images/companies/malling-co.jpg',
      heroImageAlt: 'Grünerløkka område - Front Real Estate portefølje',
      heroOverlayTitle: 'Front Real Estate',
      heroOverlaySubtitle: '1 eiendom på Grünerløkka',
      developmentIcon: '🚧',
      developmentTitle: 'Verktøy under utvikling',
      developmentDescription: DEFAULT_DEVELOPMENT_DESCRIPTION,
      propertiesCtaTitle: 'Utforsk Våre Eiendommer',
      propertiesCtaDescription:
        'Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for Front Real Estate sin eiendom på Grünerløkka.',
      propertiesCtaLabel: 'Se Alle Eiendommer →',
      featuresHeading: 'Hva du finner her',
      features: DEFAULT_FEATURES,
    },
    about: {
      metadataTitle: 'Om Prosjektet - Front Real Estate',
      metadataDescription:
        'Informasjon om Place Analysis for Front Real Estate eiendommer på Grünerløkka',
      purposeLead:
        'Dette er en dedikert plattform for placeanalyser av Front Real Estate eiendommer på Grünerløkka, Oslo. Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender for å gi et helhetlig bilde av hver eiendom.',
      purposeDetails:
        'Grünerløkka er et av Oslos mest dynamiske og attraktive områder, med rik historie og kontinuerlig utvikling. Analysene hjelper oss å forstå og dokumentere eiendommenes rolle i dette levende bydelsbildet.',
      dataSources: DEFAULT_DATA_SOURCES,
    },
    properties: {
      metadataTitle: 'Front Real Estate Eiendommer',
      metadataDescription:
        'Oversikt over Front Real Estate sine eiendommer på Grünerløkka',
      headingDescription:
        'Utforsk placeanalyser og eiendomsinformasjon for Front Real Estate sin portefølje på Grünerløkka',
    },
  },
  'maya-eiendom': {
    home: {
      heroTitle: 'Maya Eiendom',
      heroDescription:
        'Omfattende placeanalyser og eiendomsinformasjon for Maya Eiendoms eiendommer på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for fire eiendommer på Markveien.',
      primaryCtaLabel: 'Se Eiendommer',
      secondaryCtaLabel: 'Om Prosjektet',
      heroImage: '/images/companies/maya-eiendom.jpg',
      heroImageAlt: 'Grünerløkka område - Maya Eiendom portefølje',
      heroOverlayTitle: 'Maya Eiendom',
      heroOverlaySubtitle: '4 eiendommer på Grünerløkka',
      developmentIcon: '🚧',
      developmentTitle: 'Verktøy under utvikling',
      developmentDescription: DEFAULT_DEVELOPMENT_DESCRIPTION,
      propertiesCtaTitle: 'Utforsk Våre Eiendommer',
      propertiesCtaDescription:
        'Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for alle 4 eiendommer i Maya Eiendom sin portefølje på Grünerløkka.',
      propertiesCtaLabel: 'Se Alle Eiendommer →',
      featuresHeading: 'Hva du finner her',
      features: [
        {
          ...DEFAULT_FEATURES[0],
          description:
            'Detaljerte Plaace-rapporter med demografi, markedsdata og statistikk for hver eiendom på Markveien.',
        },
        DEFAULT_FEATURES[1],
        DEFAULT_FEATURES[2],
      ],
    },
    about: {
      metadataTitle: 'Om Prosjektet - Maya Eiendom',
      metadataDescription:
        'Informasjon om Place Analysis for Maya Eiendoms eiendommer i Oslo',
      purposeLead:
        'Dette er en dedikert plattform for placeanalyser av Maya Eiendoms eiendommer i Oslo. Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender for å gi et helhetlig bilde av hver eiendom.',
      purposeDetails:
        'Analysene hjelper oss å forstå og dokumentere eiendommenes utvikling, attraktivitet og potensial i et dynamisk bylandskap.',
      dataSources: DEFAULT_DATA_SOURCES,
    },
    properties: {
      metadataTitle: 'Maya Eiendom Portefølje',
      metadataDescription: 'Oversikt over Maya Eiendoms eiendommer på Markveien',
      headingDescription:
        'Utforsk placeanalyser og eiendomsinformasjon for Maya Eiendoms portefølje på Markveien',
    },
  },
  'roger-vodal': {
    home: {
      heroTitle: 'Roger Vodal',
      heroDescription:
        'Omfattende placeanalyser og eiendomsinformasjon for Roger Vodals eiendommer på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for tre eiendommer på Brenneriveien.',
      primaryCtaLabel: 'Se Eiendommer',
      secondaryCtaLabel: 'Om Prosjektet',
      heroImage: '/images/companies/roger-vodal.jpg',
      heroImageAlt: 'Grünerløkka område - Roger Vodal portefølje',
      heroOverlayTitle: 'Roger Vodal',
      heroOverlaySubtitle: '3 eiendommer på Grünerløkka',
      developmentIcon: '🚧',
      developmentTitle: 'Verktøy under utvikling',
      developmentDescription: DEFAULT_DEVELOPMENT_DESCRIPTION,
      propertiesCtaTitle: 'Utforsk Våre Eiendommer',
      propertiesCtaDescription:
        'Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for Roger Vodal sin portefølje på Grünerløkka.',
      propertiesCtaLabel: 'Se Alle Eiendommer →',
      featuresHeading: 'Hva du finner her',
      features: [
        {
          ...DEFAULT_FEATURES[0],
          description:
            'Detaljerte Plaace-rapporter med demografi, markedsdata og statistikk for hver eiendom på Brenneriveien.',
        },
        DEFAULT_FEATURES[1],
        DEFAULT_FEATURES[2],
      ],
    },
    about: {
      metadataTitle: 'Om Prosjektet - Roger Vodal',
      metadataDescription:
        'Informasjon om Place Analysis for Roger Vodals eiendomsportefølje',
      purposeLead:
        'Dette er en dedikert plattform for placeanalyser av Roger Vodals eiendomsportefølje. Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender for å gi et helhetlig bilde av hver eiendom.',
      purposeDetails:
        'Analysene hjelper oss å forstå og dokumentere eiendommenes utvikling, attraktivitet og potensial i et dynamisk bylandskap.',
      dataSources: DEFAULT_DATA_SOURCES,
    },
    properties: {
      metadataTitle: 'Roger Vodal Eiendommer',
      metadataDescription: 'Oversikt over Roger Vodals eiendommer på Brenneriveien',
      headingDescription:
        'Utforsk placeanalyser og eiendomsinformasjon for Roger Vodals portefølje på Brenneriveien',
    },
  },
  sio: {
    home: {
      heroTitle: 'SiO Studentsamskipnaden',
      heroDescription:
        'Omfattende placeanalyser og eiendomsinformasjon for SiOs studentboliger på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for tre eiendommer i området.',
      primaryCtaLabel: 'Se Eiendommer',
      secondaryCtaLabel: 'Om Prosjektet',
      heroImage: '/images/companies/sio.jpg',
      heroImageAlt: 'Grünerløkka område - SIO portefølje',
      heroOverlayTitle: 'SIO',
      heroOverlaySubtitle: '3 eiendommer på Grünerløkka',
      developmentIcon: '🚧',
      developmentTitle: 'Verktøy under utvikling',
      developmentDescription: DEFAULT_DEVELOPMENT_DESCRIPTION,
      propertiesCtaTitle: 'Utforsk Våre Eiendommer',
      propertiesCtaDescription:
        'Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for alle 3 eiendommer i SIO sin portefølje på Grünerløkka.',
      propertiesCtaLabel: 'Se Alle Eiendommer →',
      featuresHeading: 'Hva du finner her',
      features: [
        {
          ...DEFAULT_FEATURES[0],
          description:
            'Detaljerte Plaace-rapporter med demografi, markedsdata og statistikk for hver studentbolig på Grünerløkka.',
        },
        DEFAULT_FEATURES[1],
        DEFAULT_FEATURES[2],
      ],
    },
    about: {
      metadataTitle: 'Om Prosjektet - SiO',
      metadataDescription: 'Informasjon om Place Analysis for SiOs eiendomsportefølje',
      purposeLead:
        'Dette er en dedikert plattform for placeanalyser av SiO (Studentsamskipnaden i Oslo og Akershus) sin eiendomsportefølje. Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender for å gi et helhetlig bilde av hver eiendom.',
      purposeDetails:
        'SiOs eiendommer spiller en sentral rolle i studentlivet i Oslo-regionen. Analysene hjelper oss å forstå og dokumentere eiendommenes utvikling, attraktivitet og funksjon i det studentøkologiske landskapet.',
      dataSources: DEFAULT_DATA_SOURCES,
    },
    properties: {
      metadataTitle: 'SiO Studentboliger',
      metadataDescription: 'Oversikt over SiOs studentboliger på Grünerløkka',
      headingDescription:
        'Utforsk placeanalyser og eiendomsinformasjon for SiOs studentboliger på Grünerløkka',
    },
  },
  spabo: {
    home: {
      heroTitle: 'SPABO Eiendom',
      heroDescription:
        'Omfattende placeanalyser og eiendomsinformasjon for SPABO Eiendoms portefølje på Grünerløkka. Utforsk demografi, markedsdata og utviklingstrender for fem eiendommer i området.',
      primaryCtaLabel: 'Se Eiendommer',
      secondaryCtaLabel: 'Om Prosjektet',
      heroImage: '/images/companies/spabo.jpg',
      heroImageAlt: 'Grünerløkka område - SPABO Eiendom portefølje',
      heroOverlayTitle: 'SPABO Eiendom',
      heroOverlaySubtitle: '22 eiendommer på Grünerløkka',
      developmentIcon: '🚧',
      developmentTitle: 'Verktøy under utvikling',
      developmentDescription: DEFAULT_DEVELOPMENT_DESCRIPTION,
      propertiesCtaTitle: 'Utforsk Våre Eiendommer',
      propertiesCtaDescription:
        'Se detaljerte placeanalyser, markedsdata og nøkkelinformasjon for alle 22 eiendommer i SPABO sin portefølje på Grünerløkka.',
      propertiesCtaLabel: 'Se Alle Eiendommer →',
      featuresHeading: 'Hva du finner her',
      features: DEFAULT_FEATURES,
    },
    about: {
      metadataTitle: 'Om Prosjektet - Spabo Eiendom',
      metadataDescription:
        'Informasjon om Place Analysis for Spabo Eiendoms eiendommer på Grünerløkka',
      purposeLead:
        'Dette er en dedikert plattform for placeanalyser av Spabo Eiendoms eiendommer på Grünerløkka, Oslo. Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender for å gi et helhetlig bilde av hver eiendom.',
      purposeDetails:
        'Grünerløkka er et av Oslos mest dynamiske og attraktive områder, med rik historie og kontinuerlig utvikling. Analysene hjelper oss å forstå og dokumentere eiendommenes rolle i dette levende bydelsbildet.',
      dataSources: DEFAULT_DATA_SOURCES,
    },
    properties: {
      metadataTitle: 'SPABO Eiendom Portefølje',
      metadataDescription: 'Oversikt over SPABO Eiendoms eiendommer på Grünerløkka',
      headingDescription:
        'Utforsk placeanalyser og eiendomsinformasjon for SPABO Eiendoms portefølje på Grünerløkka',
    },
  },
};

export function getTenantPageContent(slug: CompanyTenantSlug): TenantPageContent {
  return TENANT_PAGE_CONTENT[slug];
}
