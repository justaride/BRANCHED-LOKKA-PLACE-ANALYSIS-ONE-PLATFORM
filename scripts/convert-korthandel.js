/**
 * Convert korthandel CSV to JSON format for 1-minute analysis
 * This splits total transaction amounts into mat_opplevelser, handel, tjenester
 * based on konseptmiks distribution
 */

const fs = require('fs');
const path = require('path');

// Property configurations with konseptmiks-based percentages
const properties = {
  'olaf-ryes-plass-3': {
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Olaf Ryes Plass 3',
    csvFile: 'Korthandel i valgt tidsrom KORTHANDEL.csv',
    outputDir: 'src/data/roger-vodal/olaf-ryes-plass-3/1min',
    // From konseptmiks: Mat og opplevelser=106, Handel=75, Tjenester=31, Total=212
    percentages: { mat_opplevelser: 0.50, handel: 0.354, tjenester: 0.146 }
  },
  'thorvald-meyersgate-33': {
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gata 33',
    csvFile: 'Korthandel i valgt tidsrom KORTHANDEL.csv',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-33/1min',
    // Similar distribution
    percentages: { mat_opplevelser: 0.50, handel: 0.35, tjenester: 0.15 }
  },
  'thorvald-meyersgate-40': {
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gate 40',
    csvFile: 'Korthandel i valgt tidsrom KORTHANDEL.csv',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-40/1min',
    percentages: { mat_opplevelser: 0.50, handel: 0.35, tjenester: 0.15 }
  },
  'thorvald-meyersgate-44': {
    sourceDir: '/Users/gabrielboen/Downloads/Løkka additions - 09.12.25/Thorvald Meyers gate 44',
    csvFile: 'Korthandel i valgt tidsrom KORTHANDEL.csv',
    outputDir: 'src/data/roger-vodal/thorvald-meyersgate-44/1min',
    percentages: { mat_opplevelser: 0.50, handel: 0.35, tjenester: 0.15 }
  }
};

function parseCSV(content) {
  const lines = content.split('\n').filter(line => line.trim());
  const result = [];

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Format: "January  1, 2023","January  1, 2023",0.797,"2023-01-01"
    // Split by comma but respect quotes
    const parts = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    parts.push(current.trim());

    // parts: [DateTime, Area, sumTransactionAmount, batchDate]
    if (parts.length >= 4) {
      const amount = parseFloat(parts[2]) || 0;
      const dateStr = parts[3].replace(/"/g, '');

      if (dateStr && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        result.push({ date: dateStr, total: amount });
      }
    }
  }

  return result;
}

function convertProperty(propertyId, config) {
  const csvPath = path.join(config.sourceDir, config.csvFile);

  if (!fs.existsSync(csvPath)) {
    console.log(`Skipping ${propertyId}: CSV not found at ${csvPath}`);
    return false;
  }

  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const dailyData = parseCSV(csvContent);

  console.log(`${propertyId}: Found ${dailyData.length} days of data`);

  // Convert to tidsserie format
  const tidsserie = dailyData.map(day => ({
    date: day.date,
    mat_opplevelser: Math.round(day.total * config.percentages.mat_opplevelser * 1000) / 1000,
    handel: Math.round(day.total * config.percentages.handel * 1000) / 1000,
    tjenester: Math.round(day.total * config.percentages.tjenester * 1000) / 1000
  }));

  const output = { tidsserie };

  const outputPath = path.join(process.cwd(), config.outputDir, 'korthandel.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`${propertyId}: Written ${tidsserie.length} records to ${outputPath}`);
  return true;
}

// Process all properties
console.log('Converting korthandel CSV to JSON...\n');

for (const [propertyId, config] of Object.entries(properties)) {
  try {
    convertProperty(propertyId, config);
  } catch (error) {
    console.error(`Error processing ${propertyId}:`, error.message);
  }
}

console.log('\nDone!');
