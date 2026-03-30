import type {
  BibliotekVerificationCategory,
  BibliotekVerificationDataset,
  BibliotekVerificationOverview,
  BibliotekVerificationSummary,
  ClaimEvidence,
  CrossReference,
  ResearchMetadata,
  SourceItem,
  SourceType,
  VerificationStatus,
} from "@/types/biblioteket";

type LegacySourceItem = Partial<SourceItem> & {
  type?: string;
};

type LegacyClaimEvidence = Partial<ClaimEvidence> & {
  id?: string;
  statement?: string;
  confidence?: number;
  source?: string;
};

type LegacyResearchMetadata = Partial<ResearchMetadata> & {
  lastVerified?: string;
};

type LegacyCrossReference = Partial<CrossReference> & {
  target?: string;
  description?: string;
};

const ALLOWED_STATUSES = new Set<VerificationStatus>([
  "verified",
  "partially_verified",
  "unverified",
  "disputed",
]);

const ALLOWED_SOURCE_TYPES = new Set<SourceType>([
  "archive",
  "official",
  "news",
  "academic",
  "book",
  "database",
  "interview",
  "other",
]);

const DEFAULT_LINKED_SECTIONS: BibliotekVerificationCategory[] = [
  "historie",
  "litteratur",
  "mediebildet",
  "ildsjeler",
  "idrett",
  "kultur",
];

function toStatus(value: unknown): VerificationStatus {
  return ALLOWED_STATUSES.has(value as VerificationStatus)
    ? (value as VerificationStatus)
    : "unverified";
}

function toSourceType(value: unknown): SourceType {
  if (ALLOWED_SOURCE_TYPES.has(value as SourceType)) {
    return value as SourceType;
  }

  switch (value) {
    case "article":
    case "newspaper":
      return "news";
    case "journal":
    case "thesis":
    case "report":
      return "academic";
    default:
      return "other";
  }
}

function clampCoverage(value: unknown): number {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(1, Number(value.toFixed(2))));
}

function getLegacyLastVerified(
  metadata: Partial<ResearchMetadata> | Partial<LegacyResearchMetadata> | undefined,
): string | undefined {
  if (!metadata || typeof metadata !== "object") return undefined;
  if ("lastVerifiedAt" in metadata && typeof metadata.lastVerifiedAt === "string") {
    return metadata.lastVerifiedAt;
  }
  if ("lastVerified" in metadata && typeof metadata.lastVerified === "string") {
    return metadata.lastVerified;
  }
  return undefined;
}

function pickLastVerifiedDate(
  sources: SourceItem[],
  metadata?: Partial<ResearchMetadata> | Partial<LegacyResearchMetadata>,
): string {
  const lastVerified = getLegacyLastVerified(metadata);
  if (lastVerified) return lastVerified;
  return sources[0]?.accessedAt ?? "1970-01-01";
}

export function normalizeSourceItem(
  input: LegacySourceItem,
  fallbackAccessedAt = "1970-01-01",
): SourceItem {
  return {
    title: input.title ?? "Ukjent kilde",
    url: input.url ?? "",
    publisher: input.publisher,
    publishedAt: input.publishedAt,
    accessedAt: input.accessedAt ?? fallbackAccessedAt,
    sourceType: toSourceType(input.sourceType ?? input.type),
    evidenceLevel: input.evidenceLevel === "primary" ? "primary" : "secondary",
    notes: input.notes,
  };
}

export function normalizeResearchMetadata(
  input: Partial<ResearchMetadata> | Partial<LegacyResearchMetadata> | undefined,
  fallbackLastVerifiedAt: string,
): ResearchMetadata {
  return {
    lastVerifiedAt: getLegacyLastVerified(input) ?? fallbackLastVerifiedAt,
    verifiedBy: input?.verifiedBy ?? "biblioteket-research",
    coverageScore: clampCoverage(input?.coverageScore),
    staleAfterDays:
      typeof input?.staleAfterDays === "number" && input.staleAfterDays > 0
        ? input.staleAfterDays
        : 180,
  };
}

export function normalizeCrossReference(
  input: LegacyCrossReference,
  fallbackSections: BibliotekVerificationCategory[],
): CrossReference {
  return {
    type:
      input.type === "person" ||
      input.type === "place" ||
      input.type === "event" ||
      input.type === "work" ||
      input.type === "organization"
        ? input.type
        : "event",
    idOrName: input.idOrName ?? input.target ?? "ukjent",
    linkedSections:
      Array.isArray(input.linkedSections) && input.linkedSections.length > 0
        ? input.linkedSections
        : fallbackSections,
    note: input.note ?? input.description,
  };
}

export function normalizeClaimEvidence(
  input: LegacyClaimEvidence,
  sources: SourceItem[],
  fallbackLastVerifiedAt: string,
): ClaimEvidence {
  const explicitSources = Array.isArray(input.sources)
    ? input.sources.map((source) =>
        normalizeSourceItem(source as LegacySourceItem, fallbackLastVerifiedAt),
      )
    : [];

  const matchedLegacySource =
    explicitSources.length === 0 && typeof input.source === "string"
      ? sources.find(
          (source) =>
            source.title === input.source ||
            source.url === input.source ||
            `${source.publisher} - ${source.title}` === input.source,
        )
      : undefined;

  return {
    claimId: input.claimId ?? input.id ?? "claim-unknown",
    claim: input.claim ?? input.statement ?? "Uspesifisert påstand",
    status: toStatus(input.status),
    confidenceScore:
      typeof input.confidenceScore === "number"
        ? input.confidenceScore
        : typeof input.confidence === "number"
          ? input.confidence
          : 0.5,
    sources:
      explicitSources.length > 0
        ? explicitSources
        : matchedLegacySource
          ? [matchedLegacySource]
          : [],
    notes: input.notes,
    lastVerifiedAt: input.lastVerifiedAt ?? fallbackLastVerifiedAt,
  };
}

function uniqueBy<T>(items: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function buildVerificationDataset(
  input: Partial<BibliotekVerificationDataset> & {
    id: string;
    category: BibliotekVerificationCategory;
    title: string;
    summary: string;
    scope?: BibliotekVerificationDataset["scope"];
    sources?: LegacySourceItem[];
    claims?: LegacyClaimEvidence[];
    researchMetadata?: Partial<ResearchMetadata> | Partial<LegacyResearchMetadata>;
    crossReferences?: LegacyCrossReference[];
    limitations?: string[];
  },
): BibliotekVerificationDataset {
  const normalizedSources = uniqueBy(
    (input.sources ?? []).map((source) =>
      normalizeSourceItem(
        source,
        getLegacyLastVerified(input.researchMetadata) ?? "1970-01-01",
      ),
    ),
    (source) => `${source.url}|${source.title}`,
  );

  const fallbackLastVerifiedAt = pickLastVerifiedDate(
    normalizedSources,
    input.researchMetadata,
  );

  const normalizedClaims = (input.claims ?? []).map((claim) =>
    normalizeClaimEvidence(claim, normalizedSources, fallbackLastVerifiedAt),
  );

  return {
    id: input.id,
    category: input.category,
    title: input.title,
    summary: input.summary,
    scope: input.scope ?? [],
    sources: normalizedSources,
    claims: normalizedClaims,
    researchMetadata: normalizeResearchMetadata(
      input.researchMetadata,
      fallbackLastVerifiedAt,
    ),
    crossReferences: uniqueBy(
      (input.crossReferences ?? []).map((ref) =>
        normalizeCrossReference(ref, DEFAULT_LINKED_SECTIONS),
      ),
      (ref) => `${ref.type}|${ref.idOrName}|${ref.linkedSections.join(",")}`,
    ),
    limitations: input.limitations ?? [],
  };
}

export function mergeVerificationDatasets(input: {
  id: string;
  category: BibliotekVerificationCategory;
  title: string;
  summary: string;
  datasets: BibliotekVerificationDataset[];
  limitations?: string[];
}): BibliotekVerificationDataset {
  const sources = uniqueBy(
    input.datasets.flatMap((dataset) => dataset.sources),
    (source) => `${source.url}|${source.title}`,
  );
  const claims = input.datasets.flatMap((dataset) => dataset.claims);
  const crossReferences = uniqueBy(
    input.datasets.flatMap((dataset) => dataset.crossReferences),
    (ref) => `${ref.type}|${ref.idOrName}|${ref.linkedSections.join(",")}`,
  );
  const coverageScore =
    input.datasets.length > 0
      ? Number(
          (
            input.datasets.reduce(
              (sum, dataset) => sum + dataset.researchMetadata.coverageScore,
              0,
            ) / input.datasets.length
          ).toFixed(2),
        )
      : 0;

  const lastVerifiedAt = input.datasets
    .map((dataset) => dataset.researchMetadata.lastVerifiedAt)
    .sort()
    .at(-1) ?? "1970-01-01";

  return {
    id: input.id,
    category: input.category,
    title: input.title,
    summary: input.summary,
    scope: input.datasets.flatMap((dataset) => dataset.scope),
    sources,
    claims,
    researchMetadata: {
      lastVerifiedAt,
      verifiedBy: "biblioteket-aggregate",
      coverageScore,
      staleAfterDays: Math.max(
        30,
        ...input.datasets.map((dataset) => dataset.researchMetadata.staleAfterDays),
      ),
    },
    crossReferences,
    limitations: uniqueBy(
      [...(input.limitations ?? []), ...input.datasets.flatMap((dataset) => dataset.limitations ?? [])],
      (value) => value,
    ),
  };
}

export function summarizeVerificationDataset(
  dataset: BibliotekVerificationDataset,
): BibliotekVerificationSummary {
  const verifiedCount = dataset.claims.filter(
    (claim) => claim.status === "verified",
  ).length;
  const partiallyVerifiedCount = dataset.claims.filter(
    (claim) => claim.status === "partially_verified",
  ).length;
  const unverifiedCount = dataset.claims.filter(
    (claim) => claim.status === "unverified",
  ).length;
  const disputedCount = dataset.claims.filter(
    (claim) => claim.status === "disputed",
  ).length;

  let status: VerificationStatus = "unverified";
  if (disputedCount > 0) {
    status = "disputed";
  } else if (
    dataset.claims.length > 0 &&
    verifiedCount === dataset.claims.length
  ) {
    status = "verified";
  } else if (verifiedCount > 0 || partiallyVerifiedCount > 0) {
    status = "partially_verified";
  }

  return {
    category: dataset.category,
    title: dataset.title,
    status,
    sourceCount: dataset.sources.length,
    claimCount: dataset.claims.length,
    verifiedCount,
    partiallyVerifiedCount,
    unverifiedCount,
    disputedCount,
    coverageScore: dataset.researchMetadata.coverageScore,
    lastVerifiedAt: dataset.researchMetadata.lastVerifiedAt,
    limitations: dataset.limitations ?? [],
  };
}

export function summarizeVerificationOverview(
  summaries: BibliotekVerificationSummary[],
): BibliotekVerificationOverview {
  if (summaries.length === 0) {
    return {
      categoryCount: 0,
      sourceCount: 0,
      claimCount: 0,
      verifiedCount: 0,
      partiallyVerifiedCount: 0,
      unverifiedCount: 0,
      disputedCount: 0,
      averageCoverageScore: 0,
      lastVerifiedAt: null,
    };
  }

  return {
    categoryCount: summaries.length,
    sourceCount: summaries.reduce((sum, summary) => sum + summary.sourceCount, 0),
    claimCount: summaries.reduce((sum, summary) => sum + summary.claimCount, 0),
    verifiedCount: summaries.reduce(
      (sum, summary) => sum + summary.verifiedCount,
      0,
    ),
    partiallyVerifiedCount: summaries.reduce(
      (sum, summary) => sum + summary.partiallyVerifiedCount,
      0,
    ),
    unverifiedCount: summaries.reduce(
      (sum, summary) => sum + summary.unverifiedCount,
      0,
    ),
    disputedCount: summaries.reduce(
      (sum, summary) => sum + summary.disputedCount,
      0,
    ),
    averageCoverageScore: Number(
      (
        summaries.reduce((sum, summary) => sum + summary.coverageScore, 0) /
        summaries.length
      ).toFixed(2),
    ),
    lastVerifiedAt: summaries
      .map((summary) => summary.lastVerifiedAt)
      .sort()
      .at(-1) ?? null,
  };
}
