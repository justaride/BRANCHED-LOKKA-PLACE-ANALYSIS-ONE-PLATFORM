/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Parse aktorer from Sheet1.csv files
 */

const fs = require('fs');
const path = require('path');

const properties = [
  {
    id: 'olaf-ryes-plass-3',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Olaf Ryes Plass 3',
    outputDir: 'src/data/roger-vodal/olaf-ryes-plass-3/1min',
    csvFile: 'Olaf Ryes Plass 3 - Sheet1.csv'
  },
  {
    id: 'thorvald-meyersgate-33',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gata 33',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-33/1min',
    csvFile: 'Thorvald Meyers gata 33 - Sheet1.csv'
  },
  {
    id: 'thorvald-meyersgate-40',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gate 40',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-40/1min',
    csvFile: 'Thorvald Meyers gate 40 AKTØRLISTE - Sheet1.csv'
  },
  {
    id: 'thorvald-meyersgate-44',
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gate 44',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-44/1min',
    csvFile: 'Thorvald Meyers gate 44  - Sheet1 Aktørkartlegging.csv'
  }
];

function parseSheet1(content) {
  // This CSV has multi-line cells enclosed in quotes
  // Format: #,Navn,Type,Adresse,Kommune,Omsetning,YoY-vekst,Ansatte,Markedsandel
  const lines = content.split('\n');
  const actors = [];
  let currentRecord = [];
  let inQuotes = false;
  let currentCell = '';

  // Skip header
  let headerSkipped = false;

  for (const line of lines) {
    if (!headerSkipped && line.startsWith('#,')) {
      headerSkipped = true;
      continue;
    }
    if (!headerSkipped) continue;

    // Track quotes and build cells
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        currentRecord.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }

    if (!inQuotes) {
      // Complete record
      currentRecord.push(currentCell.trim());
      currentCell = '';

      if (currentRecord.length >= 6 && currentRecord[0].startsWith('#')) {
        // Parse the record
        const rank = currentRecord[0];
        const navn = currentRecord[1];
        const type = currentRecord[2];
        const adresse = currentRecord[3];
        const kommune = currentRecord[4] || 'Oslo';

        // Parse omsetning: "NOK 120 mill.\n\n0.6% av kjede"
        const omsetningStr = currentRecord[5] || '';
        const omsetningMatch = omsetningStr.match(/NOK\s*(\d+)/);
        const omsetning = omsetningMatch ? parseInt(omsetningMatch[1]) : 0;

        // Parse kjedeProsent from omsetning field
        const kjedeMatch = omsetningStr.match(/(\d+\.?\d*)%\s*av\s*kjede/);
        const kjedeProsent = kjedeMatch ? kjedeMatch[1] + '%' : null;

        // Parse yoy: "-0.7%\n\n(%)"
        const yoyStr = currentRecord[6] || '';
        const yoyMatch = yoyStr.match(/([-\d.]+)%/);
        const yoyVekst = yoyMatch ? parseFloat(yoyMatch[1]) : null;

        // Parse ansatte: "63\n\n8981 i 184 lokasjoner"
        const ansatteStr = currentRecord[7] || '';
        const ansatteLokaltMatch = ansatteStr.match(/^(\d+)/);
        const ansatteLokalt = ansatteLokaltMatch ? parseInt(ansatteLokaltMatch[1]) : 0;

        const kjedeAnsatteMatch = ansatteStr.match(/(\d+)\s*i\s*(\d+)\s*lokasjoner/);
        const ansatteKjede = kjedeAnsatteMatch ? parseInt(kjedeAnsatteMatch[1]) : 0;
        const kjedeLokasjoner = kjedeAnsatteMatch ? parseInt(kjedeAnsatteMatch[2]) : 1;

        // Parse markedsandel: "7.53%\n\ni området"
        const markedsandelStr = currentRecord[8] || '';
        const markedsandelMatch = markedsandelStr.match(/([\d.]+)%/);
        const markedsandel = markedsandelMatch ? parseFloat(markedsandelMatch[1]) : 0;

        actors.push({
          rank,
          navn,
          type,
          adresse,
          kommune,
          omsetning,
          kjedeProsent,
          yoyVekst,
          ansatteLokalt,
          ansatteKjede,
          kjedeLokasjoner,
          markedsandel
        });
      }

      currentRecord = [];
    } else {
      // Continue with newline in quoted cell
      currentCell += '\n';
    }
  }

  return actors;
}

function buildCategoryStats(actors) {
  const stats = {};
  for (const actor of actors) {
    const cat = actor.type;
    if (!stats[cat]) {
      stats[cat] = { count: 0, totalRevenue: 0, avgRevenue: 0 };
    }
    stats[cat].count++;
    stats[cat].totalRevenue += actor.omsetning;
  }

  for (const cat of Object.keys(stats)) {
    stats[cat].avgRevenue = stats[cat].count > 0
      ? Math.round(stats[cat].totalRevenue / stats[cat].count * 10) / 10
      : 0;
  }

  return stats;
}

console.log('Parsing aktorer from Sheet1.csv files...\n');

for (const property of properties) {
  const csvPath = path.join(property.sourceDir, property.csvFile);
  const outputPath = path.join(process.cwd(), property.outputDir, 'aktorer.json');

  console.log(`Processing ${property.id}:`);

  if (!fs.existsSync(csvPath)) {
    console.log(`  Skipping: CSV not found at ${csvPath}`);
    continue;
  }

  try {
    const content = fs.readFileSync(csvPath, 'utf8');
    const actors = parseSheet1(content);
    const categoryStats = buildCategoryStats(actors);
    const totalRevenue = actors.reduce((sum, a) => sum + a.omsetning, 0);

    const data = {
      actors,
      categoryStats,
      metadata: {
        totalActors: actors.length,
        totalCategories: Object.keys(categoryStats).length,
        totalRevenue,
        generatedAt: new Date().toISOString().split('T')[0],
        analysisType: '1min-gange',
        areaSize: '0.89 km²'
      }
    };

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`  Parsed ${actors.length} actors, ${Object.keys(categoryStats).length} categories`);
  } catch (error) {
    console.error(`  Error: ${error.message}`);
  }
}

console.log('\nDone!');
