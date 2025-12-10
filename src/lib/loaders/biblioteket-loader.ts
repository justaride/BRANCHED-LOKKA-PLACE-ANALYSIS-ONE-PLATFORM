/**
 * Biblioteket Data Loader
 * Handles loading of all library content: ildsjeler, litteratur, historie, kultur
 */

import type {
    Ildsjel,
    IldsjelKategori,
    IldsjelPlace,
    IldsjelTidslinjeEvent,
    LitteraryWork,
    LitteraturData,
    HistorieTimeline,
    HistorieCard,
    HistorieEntity,
    HistorieEntitiesData,
    KulturMasterData,
    BibliotekCategory,
} from '@/types/biblioteket';

// Static imports for Vercel compatibility
import ildsjelData from '@/data/biblioteket/ildsjeler/ildsjeler.json';
import kategorierData from '@/data/biblioteket/ildsjeler/kategorier.json';
import placesData from '@/data/biblioteket/ildsjeler/places.json';
import tidslinjeData from '@/data/biblioteket/ildsjeler/tidslinje.json';
import worksData from '@/data/biblioteket/litteratur/works.json';
import historieTimelineData from '@/data/biblioteket/historie/grunerlokka_timeline.json';
import historieCardsData from '@/data/biblioteket/historie/grunerlokka_cards.json';
import historieEntitiesData from '@/data/biblioteket/historie/grunerlokka_entities.json';
import kulturMasterData from '@/data/biblioteket/kultur/grunerlokka_master_alt.json';
import jazzData from '@/data/biblioteket/kultur/jazz.json';
import hiphopData from '@/data/biblioteket/kultur/hiphop.json';
import idrettData from '@/data/biblioteket/idrett/idrett.json';

// ============================================================================
// ILDSJELER (Local Heroes)
// ============================================================================

export function getIldsjeler(): Ildsjel[] {
    return ildsjelData as Ildsjel[];
}

export function getIldsjelById(id: string): Ildsjel | null {
    const ildsjeler = getIldsjeler();
    return ildsjeler.find((i) => i.id === id) || null;
}

export function getIldsjelKategorier(): IldsjelKategori[] {
    return kategorierData as IldsjelKategori[];
}

export function getIldsjelPlaces(): IldsjelPlace[] {
    return placesData as IldsjelPlace[];
}

export function getIldsjelTidslinje(): IldsjelTidslinjeEvent[] {
    return tidslinjeData as IldsjelTidslinjeEvent[];
}

export function getIldsjelByCategory(categoryId: string): Ildsjel[] {
    const ildsjeler = getIldsjeler();
    return ildsjeler.filter((i) => i.categories.includes(categoryId));
}

// ============================================================================
// LITTERATUR (Literature)
// ============================================================================

export function getLitteratur(): LitteraryWork[] {
    return (worksData as LitteraturData).works;
}

export function getLitteraturById(id: string): LitteraryWork | null {
    const works = getLitteratur();
    return works.find((w) => w.id === id) || null;
}

export function getLitteraturByYear(year: number): LitteraryWork[] {
    const works = getLitteratur();
    return works.filter((w) => w.year === year);
}

export function getLitteraturByType(type: string): LitteraryWork[] {
    const works = getLitteratur();
    return works.filter((w) => w.type === type);
}

export function getLitteraturByTopic(topic: string): LitteraryWork[] {
    const works = getLitteratur();
    return works.filter((w) => w.topics.includes(topic));
}

export function getLitteraturTopics(): string[] {
    const works = getLitteratur();
    const topics = new Set<string>();
    works.forEach((w) => w.topics.forEach((t) => topics.add(t)));
    return Array.from(topics).sort();
}

export function getLitteraturTypes(): string[] {
    const works = getLitteratur();
    const types = new Set<string>();
    works.forEach((w) => types.add(w.type));
    return Array.from(types).sort();
}

// ============================================================================
// HISTORIE (Urban Development History)
// ============================================================================

export function getHistorieTimeline(): HistorieTimeline {
    return historieTimelineData as HistorieTimeline;
}

export function getHistorieEvents() {
    const timeline = getHistorieTimeline();
    return timeline.events;
}

export function getHistorieEventsBySection(sectionId: string) {
    const events = getHistorieEvents();
    return events.filter((e) => e.section_id === sectionId);
}

export function getHistorieEventsByTag(tag: string) {
    const events = getHistorieEvents();
    return events.filter((e) => e.tags.includes(tag));
}

export function getHistorieCards(): HistorieCard[] {
    return (historieCardsData as { cards: HistorieCard[] }).cards;
}

export function getHistorieEntities(): HistorieEntity[] {
    return (historieEntitiesData as HistorieEntitiesData).entities;
}

export function getHistorieSections(): string[] {
    const events = getHistorieEvents();
    const sections = new Set<string>();
    events.forEach((e) => sections.add(e.section_id));
    return Array.from(sections);
}

export function getHistorieTags(): string[] {
    const events = getHistorieEvents();
    const tags = new Set<string>();
    events.forEach((e) => e.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
}

// ============================================================================
// KULTUR OG MUSIKK (Culture and Music)
// ============================================================================

export function getKulturMaster(): KulturMasterData {
    return kulturMasterData as KulturMasterData;
}

export function getKulturTimeline() {
    const master = getKulturMaster();
    return master.timeline;
}

export function getKulturIndexes() {
    const master = getKulturMaster();
    return master.indexes;
}

export function getKulturMasterText(): string {
    const master = getKulturMaster();
    return master.master_text;
}

export function getKulturTimelineByCategory(category: string) {
    const timeline = getKulturTimeline();
    return timeline.filter((e) => e.categories.includes(category));
}

export function getKulturPeople(): string[] {
    const indexes = getKulturIndexes();
    return indexes.people;
}

export function getKulturVenues(): string[] {
    const indexes = getKulturIndexes();
    return indexes.venues_and_institutions;
}

// ============================================================================
// JAZZ SUBSECTION
// ============================================================================

export interface JazzData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    timeline: JazzPeriod[];
    venues: JazzVenue[];
    artists: JazzArtist[];
    festivals: JazzFestival[];
    sources: { title: string; url: string }[];
}

export interface JazzPeriod {
    id: string;
    period: string;
    title: string;
    description: string;
    events: { year: number; title: string; description: string }[];
}

export interface JazzVenue {
    id: string;
    name: string;
    address: string;
    period: string;
    description: string;
    status: 'aktiv' | 'nedlagt';
}

export interface JazzArtist {
    id: string;
    name: string;
    birthYear: number;
    deathYear: number | null;
    instrument: string;
    description: string;
    awards?: string[];
    connectionToLokka: string;
}

export interface JazzFestival {
    id: string;
    name: string;
    founded: number;
    description: string;
    location: string;
}

export function getJazzData(): JazzData {
    return jazzData as JazzData;
}

export function getJazzTimeline(): JazzPeriod[] {
    return jazzData.timeline as JazzPeriod[];
}

export function getJazzVenues(): JazzVenue[] {
    return jazzData.venues as JazzVenue[];
}

export function getJazzArtists(): JazzArtist[] {
    return jazzData.artists as JazzArtist[];
}

export function getJazzFestivals(): JazzFestival[] {
    return jazzData.festivals as JazzFestival[];
}

// ============================================================================
// HIPHOP SUBSECTION
// ============================================================================

export interface HiphopData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    sections: HiphopSection[];
    artists: HiphopArtist[];
    crews: HiphopCrew[];
    events: HiphopEvent[];
    sources: { title: string; url: string }[];
}

export interface HiphopSection {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    founded?: number;
    address?: string;
    founder?: string;
    highlights?: string[];
    timeline?: { year: number; title: string; description: string }[];
    pioneers?: string[];
    venues?: { name: string; description: string }[];
}

export interface HiphopArtist {
    id: string;
    name: string;
    members?: string[];
    realName?: string;
    genre: string;
    description: string;
    connectionToLokka: string;
}

export interface HiphopCrew {
    id: string;
    name: string;
    founded: number | null;
    style: string;
    description: string;
    website?: string;
    connectionToLokka?: string;
}

export interface HiphopEvent {
    id: string;
    name: string;
    year?: number;
    type: string;
    description: string;
    location?: string;
}

export function getHiphopData(): HiphopData {
    return hiphopData as HiphopData;
}

export function getHiphopSections(): HiphopSection[] {
    return hiphopData.sections as HiphopSection[];
}

export function getHiphopArtists(): HiphopArtist[] {
    return hiphopData.artists as HiphopArtist[];
}

export function getHiphopCrews(): HiphopCrew[] {
    return hiphopData.crews as HiphopCrew[];
}

export function getHiphopEvents(): HiphopEvent[] {
    return hiphopData.events as HiphopEvent[];
}

// ============================================================================
// IDRETT (Sports)
// ============================================================================

export interface IdrettData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    sections: IdrettSection[];
    timeline: IdrettTimelineEvent[];
    clubs: IdrettClub[];
    pioneers: IdrettPioneer[];
    venues: IdrettVenue[];
    sources: { title: string; url: string }[];
}

export interface IdrettSection {
    id: string;
    title: string;
    description: string;
    founded?: number;
    clubs?: string[];
    sports?: string[];
    facilities?: string[];
    context?: string;
    highlights?: string[];
}

export interface IdrettTimelineEvent {
    year: number;
    title: string;
    description: string;
}

export interface IdrettClub {
    id: string;
    name: string;
    founded: number | null;
    dissolved: number | null;
    type: string;
    sports: string[];
    achievements: string[];
    description: string;
}

export interface IdrettPioneer {
    id: string;
    name: string;
    role: string;
    period: string;
    description: string;
}

export interface IdrettVenue {
    id: string;
    name: string;
    address: string;
    founded: number;
    description: string;
    status: 'aktiv' | 'nedlagt';
}

export function getIdrettData(): IdrettData {
    return idrettData as IdrettData;
}

export function getIdrettSections(): IdrettSection[] {
    return idrettData.sections as IdrettSection[];
}

export function getIdrettTimeline(): IdrettTimelineEvent[] {
    return idrettData.timeline as IdrettTimelineEvent[];
}

export function getIdrettClubs(): IdrettClub[] {
    return idrettData.clubs as IdrettClub[];
}

export function getIdrettPioneers(): IdrettPioneer[] {
    return idrettData.pioneers as IdrettPioneer[];
}

export function getIdrettVenues(): IdrettVenue[] {
    return idrettData.venues as IdrettVenue[];
}

// ============================================================================
// BIBLIOTEK CATEGORIES
// ============================================================================

export function getBibliotekCategories(): BibliotekCategory[] {
    const ildsjeler = getIldsjeler();
    const litteratur = getLitteratur();
    const historie = getHistorieEvents();
    const kultur = getKulturTimeline();
    const idrett = getIdrettTimeline();

    return [
        {
            slug: 'ildsjeler',
            title: 'Ildsjeler',
            description: 'Lokale helter og pionerer som har formet Grünerløkka gjennom tidene.',
            image: '/images/biblioteket/ildsjeler.jpg',
            itemCount: ildsjeler.length,
            color: 'orange',
        },
        {
            slug: 'litteratur',
            title: 'Litteratur',
            description: 'Bøker, artikler og akademiske verk om Grünerløkka fra 1913 til i dag.',
            image: '/images/biblioteket/litteratur.png',
            itemCount: litteratur.length,
            color: 'blue',
        },
        {
            slug: 'historie',
            title: 'Byhistorie',
            description: 'Fra fabrikkbelte til kulturbydel – 170 år med byutvikling.',
            image: '/images/biblioteket/historie.png',
            itemCount: historie.length,
            color: 'amber',
        },
        {
            slug: 'kultur',
            title: 'Kunst og Kultur',
            description: 'Musikk, kunst, teater og kulturmiljøet på Grünerløkka.',
            image: '/images/biblioteket/kultur.png',
            itemCount: kultur.length,
            color: 'purple',
        },
        {
            slug: 'idrett',
            title: 'Idrett',
            description: 'Fra arbeideridretten til Grüner IL – 100 år med folkesport.',
            image: '/images/biblioteket/idrett-hero.png',
            itemCount: idrett.length,
            color: 'green',
        },
    ];
}

export function getBibliotekCategory(slug: string): BibliotekCategory | null {
    const categories = getBibliotekCategories();
    return categories.find((c) => c.slug === slug) || null;
}

// ============================================================================
// STATISTICS
// ============================================================================

export function getBibliotekStats() {
    const ildsjeler = getIldsjeler();
    const litteratur = getLitteratur();
    const historie = getHistorieEvents();
    const kultur = getKulturTimeline();

    return {
        totalItems:
            ildsjeler.length + litteratur.length + historie.length + kultur.length,
        ildsjelerCount: ildsjeler.length,
        litteraturCount: litteratur.length,
        historieCount: historie.length,
        kulturCount: kultur.length,
        yearSpan: {
            litteratur: {
                earliest: Math.min(...litteratur.map((w) => w.year)),
                latest: Math.max(...litteratur.map((w) => w.year)),
            },
            historie: {
                earliest: Math.min(...historie.map((e) => e.start_year)),
                latest: Math.max(...historie.map((e) => e.end_year)),
            },
        },
    };
}

// ============================================================================
// MASTER TIMELINE (Combined view of all categories)
// ============================================================================

export interface MasterTimelineEvent {
    id: string;
    year: number;
    category: 'historie' | 'kultur' | 'litteratur' | 'ildsjeler';
    title: string;
    description: string;
    image?: string;
    link: string;
    color: string;
}

// Import translation function
import { translateHistorieText } from '../translate-historie';

export function getMasterTimelineEvents(): MasterTimelineEvent[] {
    const events: MasterTimelineEvent[] = [];

    // HISTORIE - Significantly expanded selection
    const historieEvents = getHistorieEvents();
    const keyHistorieIds = [
        '1850s_land_subdivision',
        '1856_christiania_seildugsfabrik',
        '1858_city_boundary_expansion',
        '1861_ny_york_growth',
        '1861_thorvald_meyer_invests',
        '1870s_1880s_masonry_expansion',
        '1900s_working_class_neighbourhood',
        '1920s_first_labour_activism',
        '1940s_german_occupation',
        '1950s_postwar_housing_crisis',
        '1970s_grassroots_protests',
        '1972_saneringsplan',
        '1980s_byfornyelse_plans',
        '1980s_alternative_scene',
        '1990_gentrification_begins',
        '1995_fru_hagen',
        '2000s_cultural_hub',
        '2006_birkelunden_heritage'
    ];
    keyHistorieIds.forEach(id => {
        const event = historieEvents.find(e => e.id === id);
        if (event) {
            events.push({
                id: `historie-${event.id}`,
                year: event.start_year,
                category: 'historie',
                title: translateHistorieText(event.label),
                description: translateHistorieText(event.summary),
                link: `/main-board/biblioteket/historie`,
                color: '#d97706' // amber
            });
        }
    });

    // KULTUR - Expanded selection (pick more years)
    const kulturEvents = getKulturTimeline();
    const keyKulturYears = [1900, 1920, 1940, 1960, 1970, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015];
    keyKulturYears.forEach(year => {
        const event = kulturEvents.find(e => e.period.includes(String(year)));
        if (event) {
            events.push({
                id: `kultur-${year}`,
                year: year,
                category: 'kultur',
                title: event.event,
                description: `${event.names.join(', ')} - ${event.places.join(', ')}`,
                link: `/main-board/biblioteket/kultur`,
                color: '#7c3aed' // purple
            });
        }
    });

    // LITTERATUR - More comprehensive selection
    const litteratur = getLitteratur();
    const keyLitteraturYears = [1913, 1920, 1930, 1940, 1950, 1960, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015];
    keyLitteraturYears.forEach(year => {
        const work = litteratur.find(w => w.year === year);
        if (work) {
            events.push({
                id: `litteratur-${work.id}`,
                year: work.year,
                category: 'litteratur',
                title: work.title,
                description: `${work.authors.join(', ')} - ${work.type}`,
                link: `/main-board/biblioteket/litteratur`,
                color: '#1e40af' // blue
            });
        }
    });

    // ILDSJELER - Include all available
    const ildsjeler = getIldsjeler();
    ildsjeler.slice(0, 15).forEach(ildsjel => {
        const fromYear = parseInt(ildsjel.mainPeriod.from.toString());
        if (!isNaN(fromYear) && fromYear >= 1850) {
            events.push({
                id: `ildsjel-${ildsjel.id}`,
                year: fromYear,
                category: 'ildsjeler',
                title: ildsjel.name,
                description: ildsjel.summary,
                image: ildsjel.imageUrl,
                link: `/main-board/biblioteket/ildsjeler/${ildsjel.id}`,
                color: '#c2410c' // orange
            });
        }
    });

    // Sort by year
    return events.sort((a, b) => a.year - b.year);
}
