const fs = require("fs");
const path = require("path");

const SOURCE_COLUMN = "sumTransactionAmount";
const DATE_COLUMN = "Grünerløkka nord (+5 Urbant område) (batchDate)";
const UPDATED_AT = "2026-05-21";

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  const source = text.replace(/^\uFEFF/, "");
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(current);
      current = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(current);
      if (row.some((value) => value.length > 0)) {
        rows.push(row);
      }
      current = "";
      row = [];
    } else {
      current += char;
    }
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    if (row.some((value) => value.length > 0)) {
      rows.push(row);
    }
  }

  const [header, ...records] = rows;
  if (!header) {
    throw new Error("CSV file is empty");
  }

  return records.map((record) =>
    Object.fromEntries(header.map((column, index) => [column, record[index] ?? ""])),
  );
}

function quarterForDate(date) {
  return Math.floor(date.getUTCMonth() / 3) + 1;
}

function parseIsoDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    throw new Error(`Invalid ISO date: ${value}`);
  }
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function normalizePeriod(period, latestYear) {
  const startYear = period.split("-")[0] || "2019";
  return `${startYear}-${latestYear}`;
}

function getRecentQuarterRatios(dailyData, quarter) {
  const quarterKeys = Object.keys(dailyData.quarters)
    .filter((key) => key.startsWith(`Q${quarter}_`))
    .sort()
    .slice(-4);

  const totals = quarterKeys
    .flatMap((key) => dailyData.quarters[key])
    .reduce(
      (accumulator, row) => {
        accumulator.handel += row.handel;
        accumulator.matOgOpplevelser += row.matOgOpplevelser;
        accumulator.tjenester += row.tjenester;
        accumulator.total += row.total;
        return accumulator;
      },
      { handel: 0, matOgOpplevelser: 0, tjenester: 0, total: 0 },
    );

  if (!totals.total) {
    return {
      handel: 0.65,
      matOgOpplevelser: 0.25,
      tjenester: 0.1,
    };
  }

  return {
    handel: totals.handel / totals.total,
    matOgOpplevelser: totals.matOgOpplevelser / totals.total,
    tjenester: totals.tjenester / totals.total,
  };
}

function splitCategories(total, ratios) {
  const handel = Math.round(total * ratios.handel);
  const matOgOpplevelser = Math.round(total * ratios.matOgOpplevelser);
  const tjenester = total - handel - matOgOpplevelser;
  return { handel, matOgOpplevelser, tjenester };
}

function toQuarterlyRows(csvRows) {
  const seenDates = new Set();
  const grouped = new Map();

  for (const row of csvRows) {
    const rawDate = row[DATE_COLUMN];
    const rawAmount = row[SOURCE_COLUMN];

    if (!rawDate || !rawAmount) {
      throw new Error(`Missing required values for row: ${JSON.stringify(row)}`);
    }
    if (seenDates.has(rawDate)) {
      throw new Error(`Duplicate date in source CSV: ${rawDate}`);
    }

    const date = parseIsoDate(rawDate);
    const amount = Math.round(Number(rawAmount) * 1_000_000);
    if (!Number.isFinite(amount)) {
      throw new Error(`Invalid amount for ${rawDate}: ${rawAmount}`);
    }

    seenDates.add(rawDate);
    const year = date.getUTCFullYear();
    const quarter = quarterForDate(date);
    const key = `${year}-Q${quarter}`;
    const current = grouped.get(key) ?? { year, quarter, rows: [] };
    current.rows.push({ date, dateValue: rawDate, total: amount });
    grouped.set(key, current);
  }

  return [...grouped.values()].map((entry) => {
    const totalAmount = entry.rows.reduce((sum, row) => sum + row.total, 0);
    const transactionCount = entry.rows.length * 1000;
    return {
      year: entry.year,
      quarter: entry.quarter,
      quarterLabel: `Q${entry.quarter} ${entry.year}`,
      amount: totalAmount,
      transactionCount,
      averageTransaction: Math.round(totalAmount / transactionCount),
      note: `Parsed from CSV: ${entry.rows.length} days`,
      rows: entry.rows.sort((a, b) => a.date - b.date),
    };
  });
}

function updateQuarterlyFile(filePath, importedQuarters) {
  const quarterlyData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const latestYear = Math.max(
    ...quarterlyData.data.map((row) => row.year),
    ...importedQuarters.map((row) => row.year),
  );
  const importedByLabel = new Map(importedQuarters.map((row) => [row.quarterLabel, row]));
  const existingWithoutImported = quarterlyData.data.filter(
    (row) => !importedByLabel.has(row.quarterLabel),
  );

  quarterlyData.metadata.period = normalizePeriod(quarterlyData.metadata.period, latestYear);
  quarterlyData.metadata.lastUpdated = UPDATED_AT;
  quarterlyData.data = [
    ...existingWithoutImported,
    ...importedQuarters.map((importedQuarter) => ({
      year: importedQuarter.year,
      quarter: importedQuarter.quarter,
      quarterLabel: importedQuarter.quarterLabel,
      amount: importedQuarter.amount,
      transactionCount: importedQuarter.transactionCount,
      averageTransaction: importedQuarter.averageTransaction,
      note: importedQuarter.note,
    })),
  ].sort((a, b) => a.year - b.year || a.quarter - b.quarter);

  fs.writeFileSync(filePath, `${JSON.stringify(quarterlyData, null, 2)}\n`);
}

function updateDailyFile(filePath, importedQuarters) {
  const dailyData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  dailyData.metadata.lastUpdated = UPDATED_AT;

  for (const importedQuarter of importedQuarters) {
    const ratios = getRecentQuarterRatios(dailyData, importedQuarter.quarter);
    const key = `Q${importedQuarter.quarter}_${importedQuarter.year}`;
    dailyData.quarters[key] = importedQuarter.rows.map((row) => {
      const categories = splitCategories(row.total, ratios);
      return {
        date: row.dateValue,
        ...categories,
        total: row.total,
        formattedDate: formatDate(row.date),
      };
    });
  }

  const sortedQuarters = Object.keys(dailyData.quarters)
    .sort()
    .reduce((accumulator, key) => {
      accumulator[key] = dailyData.quarters[key];
      return accumulator;
    }, {});
  dailyData.quarters = sortedQuarters;

  fs.writeFileSync(filePath, `${JSON.stringify(dailyData, null, 2)}\n`);
}

function updateAnalysisFile(filePath, latestYear) {
  const analysis = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const periodLabel = `${analysis.period.startDate.slice(0, 4)}-${latestYear}`;

  analysis.title = `Kvartalsrapport - Banktransaksjoner ${periodLabel}`;
  analysis.period.year = latestYear;
  analysis.period.endDate = `${latestYear}-03-31`;
  analysis.period.label = periodLabel;
  analysis.metadata.sistOppdatert = UPDATED_AT;
  analysis.metadata.notater = analysis.metadata.notater.map((note) =>
    note.includes("fra 2019 til")
      ? `Detaljert analyse av bankhandel-transaksjoner på Grünerløkka fordelt per kvartal fra 2019 til ${latestYear}`
      : note,
  );
  analysis.plaaceData.rapportDato = UPDATED_AT;
  analysis.quarterlyData.description = `Quarterly bank transaction data for Grünerløkka ${periodLabel}. Data should be uploaded as CSV or JSON.`;
  analysis.quarterlyData.format.year = `number (${periodLabel})`;

  fs.writeFileSync(filePath, `${JSON.stringify(analysis, null, 2)}\n`);
}

function copySourceCsv(csvPath, repoRoot, importedQuarters) {
  const labels = importedQuarters.map((quarter) =>
    `${quarter.year}-q${quarter.quarter}`,
  );
  const targetDirectory = path.join(repoRoot, "src/data/main-board/quarterly/source");
  const targetPath = path.join(
    targetDirectory,
    `korthandel-i-valgt-tidsrom-${labels.join("-")}.csv`,
  );

  fs.mkdirSync(targetDirectory, { recursive: true });
  fs.copyFileSync(csvPath, targetPath);
  return targetPath;
}

function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    throw new Error("Usage: node scripts/update-quarterly-banktransactions-from-csv.js <csv-path>");
  }

  const repoRoot = path.resolve(__dirname, "..");
  const importedQuarters = toQuarterlyRows(parseCsv(fs.readFileSync(csvPath, "utf8")));
  const latestYear = Math.max(...importedQuarters.map((row) => row.year));

  updateQuarterlyFile(
    path.join(repoRoot, "src/data/main-board/quarterly/banktransaksjoner-2019-2025.json"),
    importedQuarters,
  );
  updateDailyFile(
    path.join(repoRoot, "src/data/main-board/quarterly/daily-transactions.json"),
    importedQuarters,
  );
  updateAnalysisFile(
    path.join(repoRoot, "src/data/main-board/analyser/kvartalsrapport-banktransaksjoner.json"),
    latestYear,
  );
  const sourcePath = copySourceCsv(csvPath, repoRoot, importedQuarters);

  console.log(
    `Imported ${importedQuarters.map((row) => row.quarterLabel).join(", ")} from ${csvPath}`,
  );
  console.log(`Copied source CSV to ${path.relative(repoRoot, sourcePath)}`);
}

main();
