import type {
    AkademiskItem,
    AvisItem,
    DigitalItem,
    MediaCategoryData,
    MediaItem,
    MediebildetData,
    PodcastItem,
    TvFilmItem,
} from '@/types/biblioteket';

import mediebildetData from '@/data/biblioteket/mediebildet/mediebildet.json';
import avisData from '@/data/biblioteket/mediebildet/avis.json';
import tvFilmData from '@/data/biblioteket/mediebildet/tv-film.json';
import podcastData from '@/data/biblioteket/mediebildet/podcast.json';
import digitalData from '@/data/biblioteket/mediebildet/digital.json';
import akademiskData from '@/data/biblioteket/mediebildet/akademisk.json';

export function getMediebildetData(): MediebildetData {
    const data = mediebildetData as MediebildetData;
    data.subsections = data.subsections.map(sub => ({
        ...sub,
        count: getMediaItemCount(sub.slug)
    }));
    return data;
}

export function getMediaItemCount(category: string): number {
    switch (category) {
        case 'avis':
            return (avisData as MediaCategoryData<AvisItem>).items.length;
        case 'tv-film':
            return (tvFilmData as MediaCategoryData<TvFilmItem>).items.length;
        case 'podcast':
            return (podcastData as MediaCategoryData<PodcastItem>).items.length;
        case 'digital':
            return (digitalData as MediaCategoryData<DigitalItem>).items.length;
        case 'akademisk':
            return (akademiskData as MediaCategoryData<AkademiskItem>).items.length;
        default:
            return 0;
    }
}

export function getTotalMediaItems(): number {
    return getMediaItemCount('avis') +
        getMediaItemCount('tv-film') +
        getMediaItemCount('podcast') +
        getMediaItemCount('digital') +
        getMediaItemCount('akademisk');
}

export function getAvisData(): MediaCategoryData<AvisItem> {
    return avisData as MediaCategoryData<AvisItem>;
}

export function getAvisItems(): AvisItem[] {
    return (avisData as MediaCategoryData<AvisItem>).items;
}

export function getTvFilmData(): MediaCategoryData<TvFilmItem> {
    return tvFilmData as MediaCategoryData<TvFilmItem>;
}

export function getTvFilmItems(): TvFilmItem[] {
    return (tvFilmData as MediaCategoryData<TvFilmItem>).items;
}

export function getPodcastData(): MediaCategoryData<PodcastItem> {
    return podcastData as MediaCategoryData<PodcastItem>;
}

export function getPodcastItems(): PodcastItem[] {
    return (podcastData as MediaCategoryData<PodcastItem>).items;
}

export function getDigitalData(): MediaCategoryData<DigitalItem> {
    return digitalData as MediaCategoryData<DigitalItem>;
}

export function getDigitalItems(): DigitalItem[] {
    return (digitalData as MediaCategoryData<DigitalItem>).items;
}

export function getAkademiskData(): MediaCategoryData<AkademiskItem> {
    return akademiskData as MediaCategoryData<AkademiskItem>;
}

export function getAkademiskItems(): AkademiskItem[] {
    return (akademiskData as MediaCategoryData<AkademiskItem>).items;
}

export function getAllMediaItems(): MediaItem[] {
    return [
        ...getAvisItems(),
        ...getTvFilmItems(),
        ...getPodcastItems(),
        ...getDigitalItems(),
        ...getAkademiskItems(),
    ];
}

export function getMediaByTheme(theme: string): MediaItem[] {
    return getAllMediaItems().filter(item => item.themes.includes(theme));
}

export function getMediaThemes(): string[] {
    const themes = new Set<string>();
    getAllMediaItems().forEach(item => item.themes.forEach(t => themes.add(t)));
    return Array.from(themes).sort();
}
