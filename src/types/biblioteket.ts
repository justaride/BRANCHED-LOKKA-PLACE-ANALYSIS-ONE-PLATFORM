// Types for Biblioteket (Library) content

// Ildsjeler (Local Heroes)
export interface Ildsjel {
    id: string;
    name: string;
    birthYear: number | null;
    deathYear: number | null;
    mainPeriod: {
        from: number;
        to: number | null;
    };
    categories: string[];
    summary: string;
    description: string;
    connectionToGrunerlokka: string;
    relatedPlaces: string[];
    relatedOrganizations: string[];
    relatedPlaceIds: string[];
    imageUrl: string;
    profileUrl: string;
    links: string[];
    isLiving: boolean | null;
}

export interface IldsjelKategori {
    id: string;
    name: string;
    description: string;
}

export interface IldsjelPlace {
    id: string;
    name: string;
    type: string;
    address: string;
    lat: number | null;
    lng: number | null;
    description: string;
}

export interface IldsjelTidslinjeEvent {
    id: string;
    year: number;
    title: string;
    description: string;
    category: string;
    ildsjelIds: string[];
    place: string;
    placeId: string | null;
}

// Litteratur (Literature)
export interface LitteraryWork {
    id: string;
    title: string;
    authors: string[];
    year: number;
    type: 'book' | 'article' | 'thesis' | 'report' | 'chapter' | 'booklet' | 'reference';
    topics: string[];
    note: string;
}

export interface LitteraturData {
    works: LitteraryWork[];
}

// Historie (Urban Development History)
export interface HistorieTimelineEvent {
    id: string;
    label: string;
    start_year: number;
    end_year: number;
    precision: 'year' | 'decade' | 'range_years';
    section_id: string;
    summary: string;
    tags: string[];
    entities: string[];
}

export interface HistorieTimeline {
    id: string;
    title: string;
    place: {
        name: string;
        city: string;
        country: string;
    };
    time_span: {
        start_year: number;
        end_year: number;
    };
    events: HistorieTimelineEvent[];
    version: number;
}

export interface HistorieCard {
    document_id: string;
    slug: string;
    title: string;
    subtitle: string;
    years: string;
    primary_tag: string;
    secondary_tags: string[];
    teaser: string;
    hero_image: string;
}

export interface HistorieEntityMention {
    section_id: string;
    event_ids: string[];
}

export interface HistorieEntity {
    id: string;
    name: string;
    type: string;
    subtype?: string;
    roles?: string[];
    description: string;
    mentions: HistorieEntityMention[];
}

export interface HistorieEntitiesData {
    id: string;
    topic_id: string;
    place: {
        id: string;
        name: string;
        city: string;
        country: string;
    };
    version: number;
    entities: HistorieEntity[];
}

// Kultur og Musikk (Culture and Music)
export interface KulturTimelineEvent {
    period: string;
    event: string;
    names: string[];
    places: string[];
    categories: string[];
}

export interface KulturIndexes {
    people: string[];
    groups_and_bands: string[];
    venues_and_institutions: string[];
    geographical_places: string[];
    works_and_publications: string[];
    festivals_and_series: string[];
    organisations_and_publishers: string[];
}

export interface KulturMasterData {
    title: string;
    language: string;
    source_files: string[];
    master_text: string;
    timeline: KulturTimelineEvent[];
    indexes: KulturIndexes;
}

// Category types for the main biblioteket page
export interface BibliotekCategory {
    slug: string;
    title: string;
    description: string;
    image: string;
    itemCount: number;
    color: string;
}

// Mediebildet (Media Coverage)
export interface MediaItem {
    id: string;
    title: string;
    source: string;
    author?: string;
    date: string;
    url?: string;
    summary: string;
    themes: string[];
    locations?: string[];
    people?: string[];
    significance: 'høy' | 'medium' | 'lav';
}

export interface AvisItem extends MediaItem {
    type: 'artikkel' | 'kronikk' | 'debatt' | 'reportasje' | 'intervju';
}

export interface TvFilmItem extends MediaItem {
    type: 'dokumentar' | 'nyhetsinnslag' | 'serie' | 'film' | 'reportasje';
    director?: string;
    duration?: string;
}

export interface PodcastItem extends MediaItem {
    podcastName: string;
    host?: string;
    duration?: string;
    guests?: string[];
}

export interface DigitalItem extends MediaItem {
    type: 'bloggpost' | 'debattinnlegg' | 'twitter-tråd' | 'reddit' | 'nettartikkel';
    engagement?: string;
}

export interface AkademiskItem extends MediaItem {
    authors: string[];
    type: 'masteroppgave' | 'artikkel' | 'rapport' | 'bokkapittel' | 'doktoravhandling';
    year: number;
    abstract?: string;
    methodology?: 'kvalitativ' | 'kvantitativ' | 'mixed';
    institution?: string;
}

export interface MediaSubsection {
    slug: string;
    title: string;
    description: string;
    count: number;
    color: string;
}

export interface MediebildetData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    subsections: MediaSubsection[];
    themes: string[];
    sources: { title: string; url: string }[];
}

export interface MediaCategoryData<T extends MediaItem> {
    id: string;
    title: string;
    description: string;
    items: T[];
}
