// Common English-to-Norwegian phrase translations for timeline content

export function translateHistorieText(text: string): string {
    const translations: Record<string, string> = {
        // Common verbs
        'established': 'etablert',
        'opens': 'åpner',
        'begins': 'starter',
        'becomes': 'blir',
        'designated': 'utpekt',
        'accelerates': 'akselererer',
        'moves into': 'flytter inn i',
        'giving': 'som gir',
        'incorporated into': 'innlemmet i',
        'reaches': 'når',
        'invests': 'investerer',
        'lays out': 'legger ut',

        // Common nouns/phrases
        'cultural hub': 'kulturelt knutepunkt',
        'heritage area': 'vernedistrikt',
        'middle-class families': 'middelklassefamilier',
        'renovated apartments': 'oppussede leiligheter',
        'bohemian': 'bohemsk',
        'café-oriented character': 'kafépreg',
        'students': 'studenter',
        'artists': 'kunstnere',
        'young': 'unge',
        'the district': 'bydelen',
        'symbol': 'symbol',
        'wave': 'bølge',
        'along': 'langs',
        'opening of café': 'åpning av kafé',
        'becomes a symbol': 'blir et symbol',
        'new café culture': 'nye kafékultur',
        'gentrification wave': 'gentrifiseringsbølge',
        'becomes known for': 'blir kjent for',
        'dense network of': 'tett nettverk av',
        'cafés, bars, venues': 'kafeer, barer, arenaer',
        'creative workplaces': 'kreative arbeidsplasser',
        'while its': 'mens dens',
        'working-class history': 'arbeiderklassehistorie',
        'remains visible': 'forblir synlig',
        'in the built environment': 'i det bygde miljøet',
        'surrounding blocks': 'omkringliggende blokker',
        'with': 'med',
        'buildings are': 'bygninger er',
        'as a protected': 'som et beskyttet',
        'cultural heritage environment': 'kulturarvmiljø',
        'and': 'og',

        // Specific phrases
        'Gentrification accelerates on Grünerløkka': 'Gentrifiseringen akselererer på Grünerløkka',
        'During the 1990s': 'I løpet av 1990-årene',
        'From the 2000s': 'Fra 2000-tallet',
        'Grünerløkka established as cultural hub': 'Grünerløkka etablert som kulturelt knutepunkt',
        'Birkelunden heritage area designated': 'Birkelunden vernedistrikt utpekt',
        'Café \'Fru Hagen\' opens on Thorvald Meyers gate': 'Kafé \'Fru Hagen\' åpner på Thorvald Meyers gate',
        'The opening of café Fru Hagen becomes a symbol of the new café culture and gentrification wave along Thorvald Meyers gate.': 'Åpningen av kafé Fru Hagen blir et symbol på den nye kafékultur og gentrifiseringsbølgen langs Thorvald Meyers gate.',
        'During the 1990s, students, artists and young middle-class families move into renovated apartments, giving the district a bohemian and café-oriented character.': 'I løpet av 1990-årene flytter studenter, kunstnere og unge middelklassefamilier inn i oppussede leiligheter, som gir bydelen et bohemsk og kaféorientert preg.',
        'From the 2000s, Grünerløkka becomes known for a dense network of cafés, bars, venues and creative workplaces, while its working-class history remains visible in the built environment.': 'Fra 2000-tallet blir Grünerløkka kjent for et tett nettverk av kafeer, barer, arenaer og kreative arbeidsplasser, mens arbeiderklassehistorien forblir synlig i det bygde miljøet.',
        'Birkelunden and 15 surrounding blocks with 135 buildings are designated as a protected cultural heritage environment.': 'Birkelunden og 15 omkringliggende blokker med 135 bygninger utpekes som et beskyttet kulturarvmiljø.',
    };

    // Try exact match first
    if (translations[text]) {
        return translations[text];
    }

    // Fall back to partial replacements
    let result = text;
    for (const [eng, nor] of Object.entries(translations)) {
        result = result.replace(new RegExp(eng, 'gi'), nor);
    }

    return result;
}
