/* eslint-disable @typescript-eslint/no-require-imports */
const COLORS = require("../colors");

const SEMANTIC_RULES = {
  urbanAreas: ["grunerlokka", "bjorvika", "sentrum", "majorstuen"],

  plausibilityChecks: {
    maxEneboliger: 100,
    maxHytter: 10,
    maxSmahus: 500,
  },

  housingTypesInUrbanOslo: {
    Eneboliger: {
      maxPlausible: 100,
      note: "Tette byområder har minimalt med eneboliger",
    },
    Hytter: { maxPlausible: 10, note: "Ingen hytter i sentrale Oslo" },
    Småhus: { maxPlausible: 500, note: "Begrenset i tette byområder" },
  },
};

function validateSemanticPlausibility(data, filePath, context = {}) {
  const issues = [];

  if (filePath.includes("antall-hus.json")) {
    issues.push(...validateHousingData(data, filePath));
  }

  if (filePath.includes("demografi")) {
    issues.push(...validateDemografiData(data, filePath));
  }

  if (filePath.includes("bevegelse")) {
    issues.push(...validateBevegelseData(data, filePath));
  }

  return issues;
}

function validateHousingData(data, filePath) {
  const issues = [];

  if (!Array.isArray(data)) return issues;

  for (const item of data) {
    const category = item.category;
    const rule = SEMANTIC_RULES.housingTypesInUrbanOslo[category];

    if (!rule) continue;

    for (const area of SEMANTIC_RULES.urbanAreas) {
      const value = item[area];

      if (typeof value === "number") {
        if (!Number.isInteger(value)) {
          issues.push({
            severity: "INFO",
            type: "decimal_building_count",
            file: filePath,
            field: `${category}.${area}`,
            value: value,
            message: `"${category}" for ${area} har desimalverdi (${value}). Kan indikere at data representerer noe annet enn bygningsantall.`,
          });
        }

        if (category === "Hytter" && value > rule.maxPlausible) {
          issues.push({
            severity: "INFO",
            type: "semantic_implausibility",
            file: filePath,
            field: `${category}.${area}`,
            value: value,
            expected: `≤${rule.maxPlausible}`,
            message: `"${category}" (${value}) for ${area} er høyt for urbant område. ${rule.note}. Data representerer trolig besøkendes boligtype, ikke bygninger i området.`,
          });
        }

        if (category === "Eneboliger" && value > rule.maxPlausible) {
          issues.push({
            severity: "INFO",
            type: "semantic_implausibility",
            file: filePath,
            field: `${category}.${area}`,
            value: value,
            expected: `≤${rule.maxPlausible}`,
            message: `"${category}" (${value}) for ${area} er høyt. ${rule.note}. Data representerer trolig besøkendes boligtype, ikke bygninger i området.`,
          });
        }
      }
    }
  }

  return issues;
}

function validateDemografiData(data, filePath) {
  const issues = [];

  if (data.nøkkeltall) {
    const pop = data.nøkkeltall.befolkning;
    if (typeof pop === "number" && pop < 0) {
      issues.push({
        severity: "CRITICAL",
        type: "negative_population",
        file: filePath,
        field: "nøkkeltall.befolkning",
        value: pop,
        message: "Befolkning kan ikke være negativ",
      });
    }
  }

  if (data.aldersfordeling) {
    const validateAgeDistribution = (dist, gender) => {
      if (!Array.isArray(dist)) return;

      const total = dist.reduce((sum, item) => sum + (item.antall || 0), 0);
      if (total < 0) {
        issues.push({
          severity: "CRITICAL",
          type: "negative_total",
          file: filePath,
          field: `aldersfordeling.${gender}`,
          value: total,
          message: `Total for ${gender} aldersfordeling er negativ`,
        });
      }
    };

    validateAgeDistribution(data.aldersfordeling.mann, "mann");
    validateAgeDistribution(data.aldersfordeling.kvinne, "kvinne");
  }

  if (Array.isArray(data.inntektsfordeling)) {
    const prev = { category: null, value: 0 };

    for (const item of data.inntektsfordeling) {
      if (item.antall < 0) {
        issues.push({
          severity: "CRITICAL",
          type: "negative_count",
          file: filePath,
          field: "inntektsfordeling",
          value: item.antall,
          category: item.kategori,
          message: `Negativ verdi for inntektskategori "${item.kategori}"`,
        });
      }
    }
  }

  return issues;
}

function validateBevegelseData(data, filePath) {
  const issues = [];

  if (data.nøkkeltall) {
    const { dagligBesøk, besøkPerKm2 } = data.nøkkeltall;

    if (typeof dagligBesøk === "number" && dagligBesøk < 0) {
      issues.push({
        severity: "CRITICAL",
        type: "negative_visits",
        file: filePath,
        field: "nøkkeltall.dagligBesøk",
        value: dagligBesøk,
        message: "Daglige besøk kan ikke være negativ",
      });
    }
  }

  if (Array.isArray(data.perUkedag)) {
    const norwegianDays = [
      "man.",
      "tir.",
      "ons.",
      "tor.",
      "fre.",
      "lør.",
      "søn.",
    ];

    for (const item of data.perUkedag) {
      if (item.dag && !norwegianDays.includes(item.dag)) {
        const isEnglish = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].includes(item.dag);
        if (isEnglish) {
          issues.push({
            severity: "MEDIUM",
            type: "english_day_name",
            file: filePath,
            field: "perUkedag.dag",
            value: item.dag,
            message: `Engelsk dagsnavn "${item.dag}" - bør være norsk`,
          });
        }
      }
    }
  }

  return issues;
}

module.exports = {
  validateSemanticPlausibility,
  validateHousingData,
  validateDemografiData,
  validateBevegelseData,
  SEMANTIC_RULES,
};
