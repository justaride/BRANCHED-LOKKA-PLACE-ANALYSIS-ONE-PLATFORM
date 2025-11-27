export type TenantType = 'main-board' | 'company';

export interface TenantConfig {
  slug: string;
  name: string;
  displayName: string;
  type: TenantType;
  logo?: string;
  primaryLogo?: string;
  secondaryLogo?: string;
  websiteUrl?: string;
  description: string;
  keywords: string[];
  passwordEnvVar: string;
  requiresAuth: boolean;
  features: {
    showMainBoardLink: boolean;
    showEiendommer: boolean;
    showAnalyser: boolean;
  };
}

export const TENANTS: Record<string, TenantConfig> = {
  'main-board': {
    slug: 'main-board',
    name: 'Main Board',
    displayName: 'Natural State Place Analysis - Grünerløkka 2025',
    type: 'main-board',
    logo: '/images/logos/natural-state.png',
    description: 'Comprehensive temporal and comparative place analysis of Grünerløkka, Oslo',
    keywords: ['Grünerløkka', 'Oslo', 'place analysis', 'urban analytics', 'temporal analysis'],
    passwordEnvVar: 'MAIN_BOARD_PASSWORD',
    requiresAuth: true,
    features: {
      showMainBoardLink: false,
      showEiendommer: false,
      showAnalyser: true,
    },
  },
  'aspelin-ramm': {
    slug: 'aspelin-ramm',
    name: 'Aspelin Ramm',
    displayName: 'Eiendomsanalyse - Aspelin Ramm',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/aspelin-ramm.png',
    websiteUrl: 'https://aspelinramm.no',
    description: 'Placeanalyser og eiendomsinformasjon for Aspelin Ramm sin portefølje på Vulkan, Oslo',
    keywords: ['Oslo', 'Vulkan', 'eiendom', 'placeanalyse', 'Aspelin Ramm'],
    passwordEnvVar: 'ASPELIN_RAMM_PASSWORD',
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
  'brodrene-evensen': {
    slug: 'brodrene-evensen',
    name: 'Brødrene Evensen',
    displayName: 'Eiendomsanalyse - Brødrene Evensen',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/brodrene-evensen.png',
    websiteUrl: 'https://evenseneiendom.no',
    description: 'Placeanalyser for Brødrene Evensen - Oslo properties',
    keywords: ['Oslo', 'eiendom', 'placeanalyse', 'Brødrene Evensen'],
    passwordEnvVar: 'BRODRENE_EVENSEN_PASSWORD',
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
  'eiendomsspar': {
    slug: 'eiendomsspar',
    name: 'Eiendomsspar',
    displayName: 'Eiendomsanalyse - Eiendomsspar',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/eiendomsspar.png',
    websiteUrl: 'https://eiendomsspar.no',
    description: 'Placeanalyser for Eiendomsspar - Property portfolio',
    keywords: ['Oslo', 'eiendom', 'placeanalyse', 'Eiendomsspar'],
    passwordEnvVar: 'EIENDOMSSPAR_PASSWORD',
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
  'front-real-estate': {
    slug: 'front-real-estate',
    name: 'Front Real Estate',
    displayName: 'Eiendomsanalyse - Front Real Estate',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/malling-co.png', // Keeping old logo for now as requested/implied
    websiteUrl: 'https://malling.no', // Keeping old URL for now or should I update? User said "Rename... (URL and Text)". I'll keep it as malling.no for the external link unless specified, but internal is front-real-estate.
    description: 'Placeanalyser for Front Real Estate - Grünerløkka Oslo',
    keywords: ['Oslo', 'Grünerløkka', 'eiendom', 'placeanalyse', 'Front Real Estate'],
    passwordEnvVar: 'MALLING_CO_PASSWORD', // Keeping env var same to avoid breaking secrets
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
  'maya-eiendom': {
    slug: 'maya-eiendom',
    name: 'Maya Eiendom',
    displayName: 'Eiendomsanalyse - Maya Eiendom',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/maya-eiendom.png',
    websiteUrl: 'https://mayaeiendom.no',
    description: 'Placeanalyser for Maya Eiendom - Oslo properties',
    keywords: ['Oslo', 'eiendom', 'placeanalyse', 'Maya Eiendom'],
    passwordEnvVar: 'MAYA_EIENDOM_PASSWORD',
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
  'roger-vodal': {
    slug: 'roger-vodal',
    name: 'Roger Vodal',
    displayName: 'Eiendomsanalyse - Roger Vodal',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/roger-vodal.png',
    websiteUrl: 'https://rogervodal.no',
    description: 'Placeanalyser for Roger Vodal - Property portfolio',
    keywords: ['Oslo', 'eiendom', 'placeanalyse', 'Roger Vodal'],
    passwordEnvVar: 'ROGER_VODAL_PASSWORD',
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
  'sio': {
    slug: 'sio',
    name: 'SiO',
    displayName: 'Eiendomsanalyse - SiO',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/sio.png',
    websiteUrl: 'https://sio.no',
    description: 'Placeanalyser for SiO (Studentsamskipnaden i Oslo og Akershus) - Property portfolio',
    keywords: ['Oslo', 'eiendom', 'placeanalyse', 'SiO', 'student housing'],
    passwordEnvVar: 'SIO_PASSWORD',
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
  'spabo': {
    slug: 'spabo',
    name: 'Spabo Eiendom',
    displayName: 'Eiendomsanalyse - Spabo Eiendom',
    type: 'company',
    primaryLogo: '/images/logos/natural-state.png',
    secondaryLogo: '/images/logos/spabo.png',
    websiteUrl: 'https://spabo.no',
    description: 'Placeanalyser for Spabo Eiendom - Grünerløkka properties',
    keywords: ['Oslo', 'Grünerløkka', 'eiendom', 'placeanalyse', 'Spabo Eiendom'],
    passwordEnvVar: 'SPABO_PASSWORD',
    requiresAuth: true,
    features: {
      showMainBoardLink: true,
      showEiendommer: true,
      showAnalyser: false,
    },
  },
};

export function getTenant(slug: string): TenantConfig | null {
  return TENANTS[slug] || null;
}

export function getAllTenants(): TenantConfig[] {
  return Object.values(TENANTS);
}

export function getCompanyTenants(): TenantConfig[] {
  return Object.values(TENANTS).filter((t) => t.type === 'company');
}

export function getMainBoardTenant(): TenantConfig {
  return TENANTS['main-board'];
}

export function isValidTenant(slug: string): boolean {
  return slug in TENANTS;
}
