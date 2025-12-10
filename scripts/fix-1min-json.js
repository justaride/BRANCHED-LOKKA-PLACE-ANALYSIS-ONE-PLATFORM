/**
 * Fix 1-minute analysis JSON files for roger-vodal properties
 * - Add opprinnelseOmråder to bevegelse.json
 * - Fix aktorer.json structure to match AktorerData type
 */

const fs = require('fs');
const path = require('path');

const properties = [
  {
    id: 'olaf-ryes-plass-3',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Olaf Ryes Plass 3',
    outputDir: 'src/data/roger-vodal/olaf-ryes-plass-3/1min'
  },
  {
    id: 'thorvald-meyersgate-33',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gata 33',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-33/1min'
  },
  {
    id: 'thorvald-meyersgate-40',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gate 40',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-40/1min'
  },
  {
    id: 'thorvald-meyersgate-44',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gate 44',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-44/1min'
  }
];

function parseOpprinnelseCSV(content) {
  const lines = content.split('\n').filter(line => line.trim());
  const result = [];

  // Skip header
  for (let i = 1; i < lines.length && result.length < 50; i++) {
    const line = lines[i];
    // Format: "Grünerløkka";7744103;"19,47";;
    const parts = line.split(';');
    if (parts.length >= 3) {
      const område = parts[0].replace(/"/g, '').trim();
      const prosentStr = parts[2].replace(/"/g, '').replace(',', '.').trim();
      const prosent = parseFloat(prosentStr) || 0;

      if (område && prosent > 0) {
        result.push({ område, prosent });
      }
    }
  }

  return result;
}

function fixBevegelse(property) {
  const bevegelseFile = path.join(process.cwd(), property.outputDir, 'bevegelse.json');
  const opprinnelseFile = path.join(property.sourceDir, 'Omrader_besokende_kommer_fra BESØKENDE.csv');

  if (!fs.existsSync(bevegelseFile)) {
    console.log(`  Skipping bevegelse: file not found`);
    return;
  }

  const bevegelse = JSON.parse(fs.readFileSync(bevegelseFile, 'utf8'));

  // Add opprinnelseOmråder if CSV exists
  if (fs.existsSync(opprinnelseFile)) {
    const csvContent = fs.readFileSync(opprinnelseFile, 'utf8');
    bevegelse.opprinnelseOmråder = parseOpprinnelseCSV(csvContent);
    console.log(`  Added ${bevegelse.opprinnelseOmråder.length} opprinnelseOmråder`);
  } else {
    // Use default empty array
    bevegelse.opprinnelseOmråder = [];
    console.log(`  Added empty opprinnelseOmråder (no CSV)`);
  }

  fs.writeFileSync(bevegelseFile, JSON.stringify(bevegelse, null, 2));
}

function fixAktorer(property) {
  const aktorerFile = path.join(process.cwd(), property.outputDir, 'aktorer.json');

  if (!fs.existsSync(aktorerFile)) {
    console.log(`  Skipping aktorer: file not found`);
    return;
  }

  const oldData = JSON.parse(fs.readFileSync(aktorerFile, 'utf8'));

  // Transform topAktører to actors format
  const actors = (oldData.topAktører || []).map((actor, index) => ({
    rank: `#${actor.rank || index + 1}`,
    navn: actor.navn,
    type: actor.kategori || actor.type,
    adresse: actor.adresse,
    kommune: 'Oslo',
    omsetning: actor.omsetning,
    kjedeProsent: null,
    yoyVekst: actor.yoyVekst,
    ansatteLokalt: 0,
    ansatteKjede: 0,
    kjedeLokasjoner: 1,
    markedsandel: actor.markedsandel
  }));

  // Build categoryStats from kategorifordeling
  const categoryStats = {};
  if (oldData.kategorifordeling) {
    oldData.kategorifordeling.forEach(cat => {
      categoryStats[cat.kategori] = {
        count: cat.antall,
        totalRevenue: cat.omsetning,
        avgRevenue: cat.antall > 0 ? Math.round(cat.omsetning / cat.antall * 10) / 10 : 0
      };
    });
  }

  const newData = {
    actors,
    categoryStats,
    metadata: {
      totalActors: oldData.nøkkeltall?.totaltAntall || actors.length,
      totalCategories: Object.keys(categoryStats).length,
      totalRevenue: oldData.nøkkeltall?.totalOmsetning || 0,
      generatedAt: new Date().toISOString().split('T')[0],
      analysisType: '1min-gange',
      areaSize: '0.89 km²'
    }
  };

  fs.writeFileSync(aktorerFile, JSON.stringify(newData, null, 2));
  console.log(`  Fixed aktorer: ${actors.length} actors, ${Object.keys(categoryStats).length} categories`);
}

console.log('Fixing 1-minute analysis JSON files...\n');

for (const property of properties) {
  console.log(`Processing ${property.id}:`);
  try {
    fixBevegelse(property);
    fixAktorer(property);
  } catch (error) {
    console.error(`  Error: ${error.message}`);
  }
}

console.log('\nDone!');
