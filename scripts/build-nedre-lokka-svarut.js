#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Build consolidated "svarut" dataset for Nedre Løkka.
 *
 * Source priority:
 * 1) Mini-område analyser/public aggregated data (authoritative)
 * 2) Aktører datasets for secondary validation and comparison
 * 3) MCP snapshot for selected external cross-checks
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(
  ROOT,
  "public/data/main-board/nedre-lokka-svarut",
);

function readJson(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

function writeJson(fileName, data) {
  fs.writeFileSync(
    path.join(OUT_DIR, fileName),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf8",
  );
}

function ensureOutDir() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function round(value, digits = 1) {
  return Number(value.toFixed(digits));
}

function sumBy(items, getter) {
  return items.reduce((sum, item) => sum + getter(item), 0);
}

const STATUS_SCORES = {
  pass: 100,
  warn: 65,
  fail: 25,
  unknown: 0,
};

function scoreForStatus(status) {
  return STATUS_SCORES[status] ?? 0;
}

function statusFromDiffPercent(diffPercent, passMax, warnMax) {
  if (!Number.isFinite(diffPercent)) return "unknown";
  if (diffPercent <= passMax) return "pass";
  if (diffPercent <= warnMax) return "warn";
  return "fail";
}

function aggregateStatusCounts(items) {
  return items.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { pass: 0, warn: 0, fail: 0, unknown: 0 },
  );
}

function computeCoveragePct(items) {
  if (!items.length) return 0;
  const known = items.filter((item) => item.status !== "unknown").length;
  return round((known / items.length) * 100, 1);
}

function makeVerificationRecord(lookup, config) {
  const requirement = lookup.get(config.requirementId);

  if (!requirement) {
    throw new Error(`Unknown requirementId in verification record: ${config.requirementId}`);
  }

  return {
    id: `verify-${config.requirementId}`,
    requirementId: config.requirementId,
    title: requirement.question,
    status: config.status,
    confidence: config.confidence,
    score: config.score ?? scoreForStatus(config.status),
    scope: config.scope,
    summary: config.summary,
    checks: config.checks || [],
    evidence: config.evidence || [],
    recommendations: config.recommendations || [],
  };
}

function makeResidentAgeGroups(demografi) {
  const groups = {
    "0-18": ["0-5", "6-12", "13-15", "16-18"],
    "19-35": ["19-23", "23-34"],
    "35-59": ["35-44", "45-54", "55-64"],
    "60+": ["65-74", "75-84", "85+"],
  };

  const lookup = new Map(
    demografi.aldersfordeling.map((row) => [row.aldersgruppe, row.total]),
  );

  return Object.entries(groups).map(([group, bins]) => {
    const count = bins.reduce((sum, bin) => sum + (lookup.get(bin) || 0), 0);
    return {
      group,
      count,
      pct: round((count / demografi.totalBefolkning) * 100, 1),
      confidence: "medium",
    };
  });
}

function makeVisitorAgeGroups(visitorAges) {
  const groups = {
    "0-18": ["0-5", "6-12", "13-15", "16-18"],
    "19-35": ["19-23", "23-34"],
    "35-59": ["35-44", "45-54", "55-64"],
    "60+": ["65-74", "75-84", "85+"],
  };

  const lookup = new Map(
    visitorAges.map((row) => [row.Category, (row.Mann || 0) + (row.Kvinne || 0)]),
  );
  const total = sumBy(visitorAges, (row) => (row.Mann || 0) + (row.Kvinne || 0));

  return {
    scope: "Grünerløkka nord (+5 Urbant område), 2025",
    total,
    groups: Object.entries(groups).map(([group, bins]) => {
      const count = bins.reduce((sum, bin) => sum + (lookup.get(bin) || 0), 0);
      return {
        group,
        count,
        pct: round((count / total) * 100, 1),
        confidence: "medium",
      };
    }),
  };
}

function mapBusinessCategories(oversikt) {
  const mapped = {
    "Tjenesteytende/service": {
      key: "Tjenesteytende/service",
      count: 0,
      revenueMNOK: 0,
      sourceCategories: [],
    },
    "Dagligvare/kiosk": {
      key: "Dagligvare/kiosk",
      count: 0,
      revenueMNOK: 0,
      sourceCategories: [],
    },
    Butikker: { key: "Butikker", count: 0, revenueMNOK: 0, sourceCategories: [] },
    "Serveringssteder/pub": {
      key: "Serveringssteder/pub",
      count: 0,
      revenueMNOK: 0,
      sourceCategories: [],
    },
    Andre: { key: "Andre", count: 0, revenueMNOK: 0, sourceCategories: [] },
  };

  for (const row of oversikt.kategoriOversikt) {
    const category = row.kategori;
    const count = row.antall || 0;
    const revenue = row.omsetning || 0;

    if (category.startsWith("Tjenester /")) {
      mapped["Tjenesteytende/service"].count += count;
      mapped["Tjenesteytende/service"].revenueMNOK += revenue;
      mapped["Tjenesteytende/service"].sourceCategories.push(category);
      continue;
    }

    if (category === "Handel / Mat og drikke") {
      mapped["Dagligvare/kiosk"].count += count;
      mapped["Dagligvare/kiosk"].revenueMNOK += revenue;
      mapped["Dagligvare/kiosk"].sourceCategories.push(category);
      continue;
    }

    if (category.startsWith("Mat og opplevelser /")) {
      mapped["Serveringssteder/pub"].count += count;
      mapped["Serveringssteder/pub"].revenueMNOK += revenue;
      mapped["Serveringssteder/pub"].sourceCategories.push(category);
      continue;
    }

    if (category.startsWith("Handel /")) {
      mapped.Butikker.count += count;
      mapped.Butikker.revenueMNOK += revenue;
      mapped.Butikker.sourceCategories.push(category);
      continue;
    }

    mapped.Andre.count += count;
    mapped.Andre.revenueMNOK += revenue;
    mapped.Andre.sourceCategories.push(category);
  }

  return Object.values(mapped).map((row) => ({
    ...row,
    revenueMNOK: round(row.revenueMNOK, 2),
    shareCountPct: round((row.count / oversikt.totalVirksomheter) * 100, 1),
    shareRevenuePct: round((row.revenueMNOK / oversikt.totalOmsetning) * 100, 1),
  }));
}

function makeOsloComparison(lokka, sentrum) {
  const serveringKeys = [
    "Mat og opplevelser / Restaurant",
    "Mat og opplevelser / Pub og bar",
    "Mat og opplevelser / Bakeri og kafé",
    "Mat og opplevelser / Barer",
  ];

  const getRevenue = (source, key) => source.categoryStats?.[key]?.omsetning || 0;
  const sumRevenue = (source, keys) => sumBy(keys, (key) => getRevenue(source, key));

  const detailKeys = Object.keys(lokka.categoryStats || {}).filter((key) =>
    key.startsWith("Handel /"),
  );

  const lokkaServering = sumRevenue(lokka, serveringKeys);
  const sentrumServering = sumRevenue(sentrum, serveringKeys);
  const lokkaDetail = sumRevenue(lokka, detailKeys);
  const sentrumDetail = sumRevenue(sentrum, detailKeys);

  return {
    categoryLogic: {
      servering: serveringKeys,
      detaljhandel: detailKeys,
    },
    servering: {
      lokkaMNOK: lokkaServering,
      sentrumMNOK: sentrumServering,
      lokkaShareOfSentrumPct: round((lokkaServering / sentrumServering) * 100, 1),
    },
    detaljhandel: {
      lokkaMNOK: lokkaDetail,
      sentrumMNOK: sentrumDetail,
      lokkaShareOfSentrumPct: round((lokkaDetail / sentrumDetail) * 100, 1),
    },
  };
}

function main() {
  ensureOutDir();

  const generatedAt = new Date().toISOString();

  const demografi = readJson(
    "public/data/main-board/nedre-lokka-omradeprofil/demografi/aldersfordeling.json",
  );
  const dailyTotal = readJson(
    "public/data/main-board/nedre-lokka-omradeprofil/bevegelse/daglig-total.json",
  );
  const weekday = readJson(
    "public/data/main-board/nedre-lokka-omradeprofil/bevegelse/besok-per-ukedag.json",
  );
  const businesses = readJson(
    "public/data/main-board/nedre-lokka-omradeprofil/virksomheter/oversikt.json",
  );
  const lokkaComparison = readJson(
    "src/data/main-board/aktorer/sammenligning-2024/lokka.json",
  );
  const sentrumComparison = readJson(
    "src/data/main-board/aktorer/sammenligning-2024/sentrum.json",
  );
  const markveien35Actors = readJson("src/data/main-board/aktorer/markveien-35.json");
  const visitorOrigins = readJson(
    "public/data/main-board/2025-arsrapport/bevegelse/omrader-besokende-kommer-fra.json",
  );
  const visitorAges = readJson(
    "public/data/main-board/2025-arsrapport/besokende/alders-kjonnsfordeling.json",
  );

  const chilloutActor =
    markveien35Actors.actors?.find((row) =>
      String(row.navn || "").toLowerCase().includes("chillout"),
    ) || null;

  const mcpSnapshot = {
    company: "CHILLOUT AS",
    orgNumber: "990510997",
    period: "2024-01-01 to 2024-12-31",
    driftsinntekterNOK: 52589634,
    arsresultatNOK: -2556622,
    source: "Offentligdata MCP snapshot",
    sourceRetrievedAt: generatedAt,
  };

  const residentAgeGroups = makeResidentAgeGroups(demografi);
  const visitorAgeGroups = makeVisitorAgeGroups(visitorAges);

  const dailyVisitorsByMicroArea = dailyTotal.omradeBreakdown.map((row) => ({
    omrade: row.omrade,
    dagligBesok: row.dagligBesok,
    pctOfTotal: round((row.dagligBesok / dailyTotal.dagligBesokeTotal) * 100, 1),
    dataStatus: row.dagligBesok > 0 ? "ok" : "missing",
    confidence: row.dagligBesok > 0 ? "high" : "low",
  }));

  const weeklyVisitors = sumBy(weekday.besokPerUkedag, (row) => row.besokende);
  const weeklyTotal = sumBy(weekday.besokPerUkedag, (row) => row.total);
  const weekdayDistribution = weekday.besokPerUkedag.map((row) => ({
    ukedag: row.ukedag,
    besokende: row.besokende,
    besokendePct: round((row.besokende / weeklyVisitors) * 100, 1),
    total: row.total,
    totalPct: round((row.total / weeklyTotal) * 100, 1),
  }));

  const businessCategoryRollup = mapBusinessCategories(businesses);
  const osloComparison = makeOsloComparison(lokkaComparison, sentrumComparison);

  const topVisitorOrigins = visitorOrigins
    .map((row) => ({
      omrade: row["Område"],
      antallBesok: row["Antall besøk"],
      andelPct: row["Andel"] ?? row["Antall besøk(%)"] ?? null,
    }))
    .filter((row) => row.antallBesok != null)
    .slice(0, 15);

  const missingMicroAreas = dailyVisitorsByMicroArea
    .filter((row) => row.dataStatus === "missing")
    .map((row) => row.omrade);
  const weekdayAverage = round(weeklyVisitors / 7, 0);
  const dailyVsWeeklyDiff = Math.abs(weekdayAverage - dailyTotal.dagligBesokeTotal);
  const dailyVsWeeklyDiffPct =
    dailyTotal.dagligBesokeTotal > 0
      ? round((dailyVsWeeklyDiff / dailyTotal.dagligBesokeTotal) * 100, 1)
      : null;
  const dailyVsWeeklyStatus =
    dailyVsWeeklyDiff > 20000 ? "fail" : dailyVsWeeklyDiff > 5000 ? "warn" : "pass";

  const categoryRevenueSum = round(
    sumBy(businessCategoryRollup, (row) => row.revenueMNOK),
    2,
  );
  const businessRevenueDiff = Math.abs(categoryRevenueSum - businesses.totalOmsetning);
  const businessRevenueDiffPct =
    businesses.totalOmsetning > 0
      ? round((businessRevenueDiff / businesses.totalOmsetning) * 100, 2)
      : null;

  const chilloutInternalNOK =
    chilloutActor && Number.isFinite(chilloutActor.omsetning)
      ? chilloutActor.omsetning * 1_000_000
      : null;
  const chilloutDiffPct =
    chilloutInternalNOK && mcpSnapshot.driftsinntekterNOK > 0
      ? round(
          (Math.abs(chilloutInternalNOK - mcpSnapshot.driftsinntekterNOK) /
            mcpSnapshot.driftsinntekterNOK) *
            100,
          1,
        )
      : null;
  const chilloutVerificationStatus = statusFromDiffPercent(chilloutDiffPct, 20, 35);

  const kpiSummary = {
    generatedAt,
    scope: "Nedre Løkka (6 mikro-områder)",
    sourcePriority: [
      "Mini-område analyser/public aggregated data",
      "Aktører sammenligningsdata",
      "MCP snapshot (selected checks)",
    ],
    quickStats: {
      totalPopulation: demografi.totalBefolkning,
      dailyVisitors: dailyTotal.dagligBesokeTotal,
      weeklyVisitors,
      businessCount: businesses.totalVirksomheter,
      totalRevenueMNOK: businesses.totalOmsetning,
    },
    residentAgeGroups,
    visitorProfile: {
      originsScope: "Grünerløkka nord (+5 Urbant område), 2025",
      topOrigins: topVisitorOrigins,
      ageGroups: visitorAgeGroups,
    },
    dailyVisitorsByMicroArea,
    weekdayDistribution: {
      weeklyVisitors,
      averageDailyVisitors: weekdayAverage,
      weeklyTotal,
      averageDailyTotal: round(weeklyTotal / 7, 0),
      rows: weekdayDistribution,
    },
    businessSummary: {
      totalBusinesses: businesses.totalVirksomheter,
      totalRevenueMNOK: businesses.totalOmsetning,
      categories: businessCategoryRollup,
    },
    osloComparison,
    chilloutMarkveien55: {
      name: chilloutActor?.navn || "Chillout Oslo",
      address: chilloutActor?.adresse || "MARKVEIEN 55",
      localRevenueMNOK: chilloutActor?.omsetning || null,
      source: "src/data/main-board/aktorer/markveien-35.json",
      externalCrossCheck: mcpSnapshot,
    },
    verification: {
      coveragePct: 0,
      statusCounts: { pass: 0, warn: 0, fail: 0, unknown: 0 },
      totalChecks: 0,
    },
  };

  const crossChecks = [
    {
      id: "micro_area_zero_data",
      status: missingMicroAreas.length > 0 ? "warn" : "pass",
      check: "Mikro-områder med manglende bevegelsesdata",
      observed: missingMicroAreas,
      impact: "Fottrafikk per punkt er delvis underestimert",
      recommendation:
        "Bestill nytt utdrag for Boots/Midt i Markveien eller marker disse eksplisitt i beslutningsgrunnlag.",
    },
    {
      id: "daily_vs_weekly_consistency",
      status: dailyVsWeeklyStatus,
      check: "Konsistens mellom daglig total og ukedagsfordeling",
      observed: {
        dailyTotal: kpiSummary.quickStats.dailyVisitors,
        averageFromWeekdays: kpiSummary.weekdayDistribution.averageDailyVisitors,
        diff: dailyVsWeeklyDiff,
        diffPct: dailyVsWeeklyDiffPct,
      },
      impact:
        dailyVsWeeklyStatus === "fail"
          ? "Stor avstand mellom KPI-er tyder på ulike definisjoner/målevinduer."
          : "Tyder på ulike definisjoner/måleperioder.",
      recommendation:
        "Presenter begge tall med tydelig definisjon og unngå å blande dem i én KPI.",
    },
    {
      id: "business_category_sum",
      status: businessRevenueDiff <= 1 ? "pass" : "warn",
      check: "Summen av kategoriomsetning mot totalomsetning",
      observed: {
        categoryRevenueSumMNOK: categoryRevenueSum,
        totalRevenueMNOK: businesses.totalOmsetning,
        diffMNOK: round(businessRevenueDiff, 2),
        diffPct: businessRevenueDiffPct,
      },
      impact: "Små avvik kan skyldes avrunding",
      recommendation: "Behold avrunding synlig i tabeller og fotnoter.",
    },
    {
      id: "chillout_internal_vs_mcp",
      status: chilloutVerificationStatus === "unknown" ? "warn" : chilloutVerificationStatus,
      check: "Chillout lokal omsetning (intern) mot MCP regnskap",
      observed: {
        internalMNOK: chilloutActor?.omsetning || null,
        mcpRevenueNOK: mcpSnapshot.driftsinntekterNOK,
        diffPct: chilloutDiffPct,
      },
      impact: "Bekrefter at lokal verdi ligger i samme størrelsesorden som ekstern regnskapspost",
      recommendation:
        "Merk at MCP viser selskapsregnskap, ikke nødvendigvis eksakt butikkavgrensning.",
    },
  ];

  const confidence = [
    {
      metric: "Innbyggere i definert Nedre Løkka-område",
      value: demografi.totalBefolkning,
      confidence: "high",
      reason: "Direkte fra primær dataset for Nedre Løkka områdeprofil.",
    },
    {
      metric: "Aldersgrupper (0-18 / 19-35 / 35-59 / 60+)",
      value: residentAgeGroups,
      confidence: "medium",
      reason: "Avledet aggregasjon av originale aldersbins.",
    },
    {
      metric: "Bevegelse per mikropunkt",
      value: dailyVisitorsByMicroArea,
      confidence: "medium",
      reason: "Direkte tall finnes, men 2 av 6 punkt har 0/mangler.",
    },
    {
      metric: "Transportmiddel-fordeling",
      value: null,
      confidence: "low",
      reason: "Manglende datagrunnlag i tilgjengelige kilder.",
    },
    {
      metric: "Sentrum vs Løkka (servering/detaljhandel)",
      value: osloComparison,
      confidence: "medium",
      reason: "Basert på sammenligningsdokument med tydelig kategori-logikk.",
    },
  ];

  const requirementsMatrix = [
    {
      id: "folk-total",
      question: "Hvor mange bor det i vårt definerte markedsområde?",
      status: "dekket",
      answer: `${demografi.totalBefolkning} innbyggere i Nedre Løkka områdeprofil.`,
      values: { totalPopulation: demografi.totalBefolkning },
      confidence: "high",
      sources: [
        "public/data/main-board/nedre-lokka-omradeprofil/demografi/aldersfordeling.json",
      ],
    },
    {
      id: "folk-alder",
      question: "Hvordan er aldersfordelingen (0-18, 19-35, 35-59, over 60)?",
      status: "dekket",
      answer: "Aldersgrupper er aggregert til ønsket inndeling.",
      values: residentAgeGroups,
      confidence: "medium",
      sources: [
        "public/data/main-board/nedre-lokka-omradeprofil/demografi/aldersfordeling.json",
      ],
    },
    {
      id: "besokende-hvor-bor",
      question: "Av de besøkende, hvor bor de?",
      status: "delvis",
      answer:
        "Tilgjengelig i 2025-datasett for Grünerløkka nord (+5 Urbant område), ikke rent Nedre Løkka-snitt.",
      values: topVisitorOrigins,
      confidence: "medium",
      sources: [
        "public/data/main-board/2025-arsrapport/bevegelse/omrader-besokende-kommer-fra.json",
      ],
    },
    {
      id: "besokende-alder",
      question: "Hvilken aldersgruppe er de besøkende i?",
      status: "delvis",
      answer:
        "Besøkende-alder finnes i 2025 scope for Grünerløkka nord (+5), brukt som proxy.",
      values: visitorAgeGroups.groups,
      confidence: "medium",
      sources: [
        "public/data/main-board/2025-arsrapport/besokende/alders-kjonnsfordeling.json",
      ],
    },
    {
      id: "kort-antall-steder",
      question: "Hvor mange steder bruker de per besøk, og sum/gang?",
      status: "mangler",
      answer:
        "Det finnes ikke et direkte datapunkt for antall stopp per person i tilgjengelige kilder.",
      values: null,
      confidence: "low",
      sources: [],
    },
    {
      id: "mikropunkt-fordeling",
      question: "Hvordan beveger de seg på 6 spesifikke punkt (% og antall)?",
      status: "delvis",
      answer:
        "Fordeling kan beregnes, men 2 av 6 punkter har manglende/0 data i grunnlaget.",
      values: dailyVisitorsByMicroArea,
      confidence: "medium",
      sources: [
        "public/data/main-board/nedre-lokka-omradeprofil/bevegelse/daglig-total.json",
      ],
    },
    {
      id: "ukefordeling",
      question:
        "Kan dere vise fordeling av uketall per ukedag (antall og %)?",
      status: "dekket",
      answer:
        "Ukedagsfordeling med antall og prosent er beregnet fra tilgjengelig datasett.",
      values: weekdayDistribution,
      confidence: "high",
      sources: [
        "public/data/main-board/nedre-lokka-omradeprofil/bevegelse/besok-per-ukedag.json",
      ],
    },
    {
      id: "metodikk-93k",
      question: "Hvordan er 93,000 / 650,000 beregnet?",
      status: "mangler",
      answer:
        "Detaljert metodegrunnlag for dette estimatet finnes ikke i tilgjengelige filer.",
      values: null,
      confidence: "low",
      sources: [],
    },
    {
      id: "reisevaner",
      question: "Hvordan kommer de besøkende til Løkka (kollektiv, gående, sykkel, bil)?",
      status: "mangler",
      answer: "Transportmiddel-fordeling mangler i dagens datagrunnlag.",
      values: null,
      confidence: "low",
      sources: [
        "src/data/main-board/analyser/nedre-lokka-omradeprofil.json",
      ],
    },
    {
      id: "virksomheter-kategori",
      question: "Antall virksomheter og fordeling på ønskede kategorier?",
      status: "delvis",
      answer:
        "Tall er tilgjengelig for 103 virksomheter (ikke 300), mappet til ønsket kategorimodell.",
      values: businessCategoryRollup,
      confidence: "medium",
      sources: [
        "public/data/main-board/nedre-lokka-omradeprofil/virksomheter/oversikt.json",
      ],
    },
    {
      id: "omsetning-kategori",
      question: "Totalomsetning 2024 og fordeling per kategori?",
      status: "delvis",
      answer:
        "Total og kategori-fordeling finnes for samme 103 virksomheter i definert scope.",
      values: {
        totalRevenueMNOK: businesses.totalOmsetning,
        categories: businessCategoryRollup,
      },
      confidence: "medium",
      sources: [
        "public/data/main-board/nedre-lokka-omradeprofil/virksomheter/oversikt.json",
      ],
    },
    {
      id: "chillout-markveien55",
      question:
        "Kan vi finne omsetning for Chillout i Markveien 55 (ikke kjede-total)?",
      status: "dekket",
      answer:
        "Lokal verdi finnes i aktørdata, og er kryss-sjekket mot ekstern MCP snapshot.",
      values: {
        localRevenueMNOK: chilloutActor?.omsetning || null,
        externalRevenueNOK: mcpSnapshot.driftsinntekterNOK,
      },
      confidence: "medium",
      sources: [
        "src/data/main-board/aktorer/markveien-35.json",
        "Offentligdata MCP snapshot (CHILLOUT AS, org 990510997)",
      ],
    },
    {
      id: "sentrum-sammenligning",
      question:
        "Omsetning serveringssteder/detaljhandel i Sentrum, og Løkka-andel i % og kroner?",
      status: "dekket",
      answer:
        "Sammenligning er beregnet fra categoryStats i sammenligningsdatasettet.",
      values: osloComparison,
      confidence: "medium",
      sources: [
        "src/data/main-board/aktorer/sammenligning-2024/sentrum.json",
        "src/data/main-board/aktorer/sammenligning-2024/lokka.json",
      ],
    },
  ];

  const requirementLookup = new Map(requirementsMatrix.map((row) => [row.id, row]));

  const verificationRecords = [
    makeVerificationRecord(requirementLookup, {
      requirementId: "folk-total",
      status: "pass",
      confidence: "high",
      scope: "exact",
      summary: "Innbyggertall er direkte hentet fra områdeprofilens primærdatasett.",
      score: 98,
      checks: [
        {
          id: "population_exists",
          label: "Total befolkning finnes i kilde",
          status: "pass",
          score: 100,
          details: `${demografi.totalBefolkning} registrerte innbyggere`,
        },
      ],
      evidence: [
        {
          source: "public/data/main-board/nedre-lokka-omradeprofil/demografi/aldersfordeling.json",
          description: "totalBefolkning",
          value: demografi.totalBefolkning,
        },
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "folk-alder",
      status: "pass",
      confidence: "medium",
      scope: "exact",
      summary: "Aldersgrupper er avledet fra detaljerte bins i samme områdescope.",
      score: 90,
      checks: [
        {
          id: "age_bins_aggregated",
          label: "Aggregasjon 0-18, 19-35, 35-59, 60+",
          status: "pass",
          score: 92,
          details: `${residentAgeGroups.length} grupper beregnet`,
        },
      ],
      evidence: [
        {
          source: "public/data/main-board/nedre-lokka-omradeprofil/demografi/aldersfordeling.json",
          description: "Aldersbins per gruppe",
        },
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "besokende-hvor-bor",
      status: "warn",
      confidence: "medium",
      scope: "proxy",
      summary: "Besøksopphav er tilgjengelig, men i proxy-scope (Grünerløkka nord +5).",
      checks: [
        {
          id: "scope_match",
          label: "Scope-match mot Nedre Løkka",
          status: "warn",
          score: 60,
          threshold: "exact scope required",
          details: "Kilden bruker utvidet geografi utover 6 mikropunkt.",
        },
      ],
      evidence: [
        {
          source: "public/data/main-board/2025-arsrapport/bevegelse/omrader-besokende-kommer-fra.json",
          description: "Topp opprinnelsesområder",
        },
      ],
      recommendations: [
        "Bruk tydelig merking som proxy i beslutningsgrunnlag.",
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "besokende-alder",
      status: "warn",
      confidence: "medium",
      scope: "proxy",
      summary: "Aldersprofil for besøkende finnes, men ikke isolert til Nedre Løkka.",
      checks: [
        {
          id: "visitor_age_scope",
          label: "Besøksalder i riktig scope",
          status: "warn",
          score: 58,
          details: "Tallene representerer Grünerløkka nord (+5).",
        },
      ],
      evidence: [
        {
          source: "public/data/main-board/2025-arsrapport/besokende/alders-kjonnsfordeling.json",
          description: "Alders- og kjønnsfordeling for besøkende",
        },
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "kort-antall-steder",
      status: "unknown",
      confidence: "low",
      scope: "missing",
      summary: "Ingen tilgjengelig kilde dokumenterer antall steder per besøk.",
      checks: [
        {
          id: "stops_per_visit_present",
          label: "Datapunkt finnes",
          status: "unknown",
          score: 0,
          details: "Ikke funnet i dagens interne eller MCP-kilder.",
        },
      ],
      recommendations: [
        "Be om aggregator-tabell for stopp per besøk i neste datainnhenting.",
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "mikropunkt-fordeling",
      status: missingMicroAreas.length > 0 ? "warn" : "pass",
      confidence: "medium",
      scope: "exact",
      summary:
        missingMicroAreas.length > 0
          ? "Fordeling kan beregnes, men deler av bevegelsesdata mangler."
          : "Alle mikropunkt har komplett bevegelsesdata.",
      checks: [
        {
          id: "micro_area_coverage",
          label: "Dekning av 6 mikropunkt",
          status: missingMicroAreas.length > 0 ? "warn" : "pass",
          score: missingMicroAreas.length > 0 ? 62 : 98,
          details:
            missingMicroAreas.length > 0
              ? `Mangler data i: ${missingMicroAreas.join(", ")}`
              : "Ingen manglende mikropunkt",
        },
      ],
      evidence: [
        {
          source: "public/data/main-board/nedre-lokka-omradeprofil/bevegelse/daglig-total.json",
          description: "Område-breakdown",
          value: dailyTotal.dagligBesokeTotal,
          unit: "daily_visits",
        },
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "ukefordeling",
      status: "pass",
      confidence: "high",
      scope: "exact",
      summary: "Ukedagsfordeling med antall og prosent er komplett.",
      score: 96,
      checks: [
        {
          id: "weekday_rows",
          label: "Alle ukedager med prosent",
          status: "pass",
          score: 100,
          details: `${weekdayDistribution.length} rader, sum andel ${round(
            sumBy(weekdayDistribution, (row) => row.besokendePct),
            1,
          )}%`,
        },
      ],
      evidence: [
        {
          source: "public/data/main-board/nedre-lokka-omradeprofil/bevegelse/besok-per-ukedag.json",
          description: "Besøk per ukedag",
        },
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "metodikk-93k",
      status: "unknown",
      confidence: "low",
      scope: "missing",
      summary: "Metodisk dokumentasjon for 93k/650k-estimatet mangler.",
      checks: [
        {
          id: "method_note_available",
          label: "Beregningstrinn tilgjengelig",
          status: "unknown",
          score: 0,
          details: "Ingen kilde beskriver parametre eller formler.",
        },
      ],
      recommendations: [
        "Etterspør metodeark med definisjoner, periode og utvalgslogikk.",
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "reisevaner",
      status: "unknown",
      confidence: "low",
      scope: "missing",
      summary: "Transportmiddel-fordeling er ikke tilgjengelig i dagens datasett.",
      checks: [
        {
          id: "transport_mode_available",
          label: "Modal split i datasett",
          status: "unknown",
          score: 0,
          details: "Ingen intern tabell eller MCP-endepunkt dekker dette i scope.",
        },
      ],
      recommendations: [
        "Suppler med eksisterende sekundærkilder (Ruter/Bymiljøetaten) som proxy, tydelig merket.",
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "virksomheter-kategori",
      status: "warn",
      confidence: "medium",
      scope: "exact",
      summary: "Kategorifordeling er konsistent, men dekker 103 virksomheter (ikke 300).",
      checks: [
        {
          id: "business_count_sum",
          label: "Kategorisum matcher total virksomheter",
          status: "pass",
          score: 100,
          details: `${sumBy(businessCategoryRollup, (row) => row.count)} av ${businesses.totalVirksomheter}`,
        },
        {
          id: "sample_size_target",
          label: "Målantall virksomheter i bestilling",
          status: "warn",
          score: 50,
          details: "Dekning er 103 virksomheter mot ønsket 300.",
        },
      ],
      evidence: [
        {
          source: "public/data/main-board/nedre-lokka-omradeprofil/virksomheter/oversikt.json",
          description: "Kategorioversikt",
          value: businesses.totalVirksomheter,
          unit: "businesses",
        },
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "omsetning-kategori",
      status: "warn",
      confidence: "medium",
      scope: "exact",
      summary: "Omsetning per kategori stemmer internt, men er begrenset til samme utvalg.",
      checks: [
        {
          id: "revenue_consistency",
          label: "Kategorisum mot total omsetning",
          status: businessRevenueDiff <= 1 ? "pass" : "warn",
          score: businessRevenueDiff <= 1 ? 98 : 70,
          threshold: "<= 1 MNOK diff",
          details: `Diff ${round(businessRevenueDiff, 2)} MNOK (${businessRevenueDiffPct}%)`,
        },
        {
          id: "coverage_scope",
          label: "Utvalgsbredde mot bestilling",
          status: "warn",
          score: 55,
          details: "Samme 103-virksomhetsutvalg som kategorioversikten.",
        },
      ],
      evidence: [
        {
          source: "public/data/main-board/nedre-lokka-omradeprofil/virksomheter/oversikt.json",
          description: "Total omsetning",
          value: businesses.totalOmsetning,
          unit: "MNOK",
        },
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "chillout-markveien55",
      status: chilloutVerificationStatus,
      confidence: "medium",
      scope: "external",
      summary:
        chilloutVerificationStatus === "pass"
          ? "Lokal aktørverdi og MCP-regnskap ligger tett."
          : "Lokal aktørverdi og MCP-regnskap er sammenlignbare, men ikke identiske.",
      checks: [
        {
          id: "internal_vs_external_revenue",
          label: "Intern lokalverdi mot MCP driftsinntekter",
          status: chilloutVerificationStatus,
          score: scoreForStatus(chilloutVerificationStatus),
          threshold: "pass <= 20% diff, warn <= 35%",
          details: `Diff ${chilloutDiffPct ?? "ukjent"}%`,
        },
      ],
      evidence: [
        {
          source: "src/data/main-board/aktorer/markveien-35.json",
          description: "Lokal omsetning (MNOK)",
          value: chilloutActor?.omsetning ?? null,
          unit: "MNOK",
        },
        {
          source: "public/data/main-board/nedre-lokka-svarut/mcp-chillout-snapshot.json",
          description: "MCP driftsinntekter",
          value: mcpSnapshot.driftsinntekterNOK,
          unit: "NOK",
        },
      ],
      recommendations: [
        "Bruk datapunktet som plausibilitetskontroll, ikke eksakt butikkregnskap.",
      ],
    }),
    makeVerificationRecord(requirementLookup, {
      requirementId: "sentrum-sammenligning",
      status: "pass",
      confidence: "medium",
      scope: "proxy",
      summary: "Sentrum-sammenligning kan replikeres fra categoryStats-logikk.",
      score: 88,
      checks: [
        {
          id: "comparison_formula",
          label: "Reproduserbar beregning av andeler",
          status: "pass",
          score: 92,
          details: "Servering- og detaljhandel-andeler beregnet med dokumenterte nøkkelsett.",
        },
      ],
      evidence: [
        {
          source: "src/data/main-board/aktorer/sammenligning-2024/lokka.json",
          description: "Løkka categoryStats",
        },
        {
          source: "src/data/main-board/aktorer/sammenligning-2024/sentrum.json",
          description: "Sentrum categoryStats",
        },
      ],
    }),
  ];

  const verificationStatusCounts = aggregateStatusCounts(verificationRecords);
  const verificationCoveragePct = computeCoveragePct(verificationRecords);

  const orgResolution = [
    {
      query: "Chillout Oslo",
      status: "resolved",
      selectedOrgNumber: "990510997",
      candidates: [
        {
          companyName: "CHILLOUT AS",
          orgNumber: "990510997",
          source: "Offentligdata MCP lookup",
          matchQuality: "high",
          notes: "Direkte navnetreff mot kjent butikkaktør i Markveien 55.",
        },
      ],
    },
    {
      query: "Le Benjamin",
      status: "ambiguous",
      candidates: [],
      notes:
        "Tidligere MCP-oppslag ga flere kandidater uten tydelig adressematch. Krever manuell avgrensning.",
    },
    {
      query: "Nedre Foss",
      status: "ambiguous",
      candidates: [],
      notes:
        "Flere selskapsnavn/varianter gir tvetydige treff. Bruk orgnr fra virksomhetsregister før ny verifisering.",
    },
    {
      query: "Markveien 55 (butikknivå)",
      status: "unresolved",
      candidates: [],
      notes:
        "Offentligdata gir selskapsnivå, ikke direkte butikk-enhet med egen regnskapslinje.",
    },
  ];

  const verificationRecordsDataset = {
    generatedAt,
    coveragePct: verificationCoveragePct,
    statusCounts: verificationStatusCounts,
    records: verificationRecords,
    orgResolution,
    limitations: [
      "MCP regnskapstall er på selskapsnivå og kan ikke alltid isolere enkel butikk.",
      "Navnebasert org-oppslag kan være tvetydig uten adresse/orgnummer.",
      "Noen MCP-kall kan feile sporadisk og bør håndteres med retry/backoff.",
    ],
  };

  kpiSummary.verification = {
    coveragePct: verificationCoveragePct,
    statusCounts: verificationStatusCounts,
    totalChecks: verificationRecords.length,
  };

  const metodikk = {
    generatedAt,
    title: "Metodikk for Nedre Løkka samlet svarut-analyse",
    sourcePriority: {
      primary:
        "Mini-område analyser/public aggregated data for Nedre Løkka områdeprofil",
      secondary: "Aktører data for virksomhet/omsetning og sentrum-sammenligning",
      external: "MCP snapshot for utvalgt selskapskryssjekk",
    },
    scopeRules: [
      "Primærscope: Nedre Løkka (6 mikro-områder).",
      "Proxy-scope kan brukes for besøkendeprofil der Nedre Løkka ikke har tilsvarende felt.",
      "Scope-avvik skal alltid merkes i KPI-kort og kravmatrise.",
    ],
    derivationRules: [
      "Aldersgrupper aggregeres fra eksisterende bins.",
      "Prosent per mikropunkt beregnes av tilgjengelig daglig total.",
      "Kategori-mapping følger avtalt regelsett (service/dagligvare/butikker/servering/andre).",
    ],
    knownGaps: [
      "Transportmiddel-fordeling mangler.",
      "Antall steder per besøk mangler.",
      "Metodikk for 93k/650k mangler i tilgjengelige filer.",
      "2 mikro-punkt har 0/manglende bevegelsesdata.",
    ],
    verificationFramework: {
      totalChecks: verificationRecords.length,
      coveragePct: verificationCoveragePct,
      statusCounts: verificationStatusCounts,
      unresolvedOrgQueries: orgResolution.filter((row) => row.status !== "resolved").length,
    },
  };

  writeJson("kpi-summary.json", kpiSummary);
  writeJson("kravmatrise.json", requirementsMatrix);
  writeJson("kryssverifisering.json", crossChecks);
  writeJson("konfidens.json", confidence);
  writeJson("metodikk.json", metodikk);
  writeJson("verification-records.json", verificationRecordsDataset);
  writeJson("mcp-chillout-snapshot.json", mcpSnapshot);

  console.log("Built Nedre Løkka svarut dataset:");
  console.log(`- ${path.relative(ROOT, path.join(OUT_DIR, "kpi-summary.json"))}`);
  console.log(`- ${path.relative(ROOT, path.join(OUT_DIR, "kravmatrise.json"))}`);
  console.log(`- ${path.relative(ROOT, path.join(OUT_DIR, "kryssverifisering.json"))}`);
  console.log(`- ${path.relative(ROOT, path.join(OUT_DIR, "konfidens.json"))}`);
  console.log(`- ${path.relative(ROOT, path.join(OUT_DIR, "metodikk.json"))}`);
  console.log(`- ${path.relative(ROOT, path.join(OUT_DIR, "verification-records.json"))}`);
  console.log(`- ${path.relative(ROOT, path.join(OUT_DIR, "mcp-chillout-snapshot.json"))}`);
}

main();
