import type {
    ClaimEvidence,
    CrossReference,
    ResearchMetadata,
    SourceItem,
} from '@/types/biblioteket';

import idrettData from '@/data/biblioteket/idrett/idrett.json';

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
    sources: SourceItem[];
    claims?: ClaimEvidence[];
    researchMetadata?: ResearchMetadata;
    crossReferences?: CrossReference[];
    limitations?: string[];
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
