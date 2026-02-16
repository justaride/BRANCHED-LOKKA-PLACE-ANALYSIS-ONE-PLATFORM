#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const inputPath =
  "/Users/gabrielboen/Downloads/2025 løkka manglende data/løkka 2025 - Sheet1.csv";
const outputPath = path.join(
  __dirname,
  "../src/data/main-board/aktorer/2025-arsrapport.json",
);

function parseCSV(content) {
  const actors = [];
  const lines = content.split("\n");

  let currentRecord = [];
  let inQuotes = false;
  let currentField = "";

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === '"' && !inQuotes) {
        inQuotes = true;
      } else if (char === '"' && inQuotes) {
        if (line[j + 1] === '"') {
          currentField += '"';
          j++;
        } else {
          inQuotes = false;
        }
      } else if (char === "," && !inQuotes) {
        currentRecord.push(currentField.trim());
        currentField = "";
      } else {
        currentField += char;
      }
    }

    if (inQuotes) {
      currentField += "\n";
    } else {
      currentRecord.push(currentField.trim());
      currentField = "";

      if (currentRecord.length >= 9 && currentRecord[0].startsWith("#")) {
        const [
          rank,
          navn,
          type,
          adresse,
          kommune,
          omsetningRaw,
          yoyRaw,
          ansatteRaw,
          markedsandelRaw,
        ] = currentRecord;

        const omsetningMatch = omsetningRaw.match(/NOK\s+(\d+)/);
        const omsetning = omsetningMatch ? parseInt(omsetningMatch[1]) : 0;

        const yoyMatch = yoyRaw.match(/(-?\d+\.?\d*)%/);
        const yoyVekst = yoyMatch ? parseFloat(yoyMatch[1]) : null;

        const ansatteMatch = ansatteRaw.match(/^(\d+)/);
        const ansatte = ansatteMatch ? parseInt(ansatteMatch[1]) : 0;

        const markedsandelMatch = markedsandelRaw.match(/(\d+\.?\d*)%/);
        const markedsandel = markedsandelMatch
          ? parseFloat(markedsandelMatch[1])
          : 0;

        actors.push({
          rank,
          navn,
          type,
          adresse,
          kommune,
          omsetning,
          omsetning_raw: omsetningRaw.replace(/\n/g, " ").trim(),
          yoy_vekst: yoyVekst,
          ansatte,
          ansatte_raw: ansatteRaw.replace(/\n/g, " ").trim(),
          markedsandel,
        });
      }

      currentRecord = [];
    }
  }

  return actors;
}

function calculateCategoryStats(actors) {
  const stats = {};

  for (const actor of actors) {
    const mainCategory = actor.type.split(" / ")[0];

    if (!stats[mainCategory]) {
      stats[mainCategory] = { count: 0, omsetning: 0, ansatte: 0 };
    }

    stats[mainCategory].count++;
    stats[mainCategory].omsetning += actor.omsetning;
    stats[mainCategory].ansatte += actor.ansatte;
  }

  return stats;
}

const content = fs.readFileSync(inputPath, "utf8");
const actors = parseCSV(content);

const categoryStats = calculateCategoryStats(actors);

const totalRevenue = actors.reduce((sum, a) => sum + a.omsetning, 0);
const totalEmployees = actors.reduce((sum, a) => sum + a.ansatte, 0);

const output = {
  metadata: {
    generated: "2025-01-27",
    source: "Plaace.ai Aktørkartlegging",
    totalActors: actors.length,
    totalRevenue,
    totalEmployees,
  },
  categoryStats,
  actors,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`Parsed ${actors.length} actors`);
console.log(`Total revenue: ${totalRevenue}M NOK`);
console.log(`Total employees: ${totalEmployees}`);
console.log(`Categories: ${Object.keys(categoryStats).join(", ")}`);
console.log(`Output: ${outputPath}`);
