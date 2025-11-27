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
// BIBLIOTEK CATEGORIES
// ============================================================================

export function getBibliotekCategories(): BibliotekCategory[] {
    const ildsjeler = getIldsjeler();
    const litteratur = getLitteratur();
    const historie = getHistorieEvents();
    const kultur = getKulturTimeline();

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
