import type {
  OrgResolutionCandidate,
  OrgResolutionResult,
  VerificationStatus,
} from "@/types/verification";

interface RetryOptions {
  maxAttempts: number;
  initialDelayMs: number;
  backoffFactor: number;
  jitterMs: number;
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  initialDelayMs: 350,
  backoffFactor: 2,
  jitterMs: 120,
};

const STATUS_TO_SCORE: Record<VerificationStatus, number> = {
  pass: 100,
  warn: 65,
  fail: 25,
  unknown: 0,
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function round(value: number, digits = 1): number {
  return Number(value.toFixed(digits));
}

export function statusToScore(status: VerificationStatus): number {
  return STATUS_TO_SCORE[status];
}

export function normalizeScore(score: number): number {
  if (!Number.isFinite(score)) return 0;
  return Math.max(0, Math.min(100, round(score, 1)));
}

export function statusFromDiffPercent(
  diffPercent: number,
  passMax: number,
  warnMax: number,
): VerificationStatus {
  if (!Number.isFinite(diffPercent)) return "unknown";
  if (diffPercent <= passMax) return "pass";
  if (diffPercent <= warnMax) return "warn";
  return "fail";
}

export function computeCoveragePct(
  records: Array<{ status: VerificationStatus }>,
): number {
  if (!records.length) return 0;
  const knownCount = records.filter((row) => row.status !== "unknown").length;
  return round((knownCount / records.length) * 100, 1);
}

export function aggregateStatusCounts(
  records: Array<{ status: VerificationStatus }>,
): Record<VerificationStatus, number> {
  const counts: Record<VerificationStatus, number> = {
    pass: 0,
    warn: 0,
    fail: 0,
    unknown: 0,
  };

  for (const row of records) {
    counts[row.status] += 1;
  }

  return counts;
}

export function buildOrgResolutionResult(input: {
  query: string;
  status: OrgResolutionResult["status"];
  candidates: OrgResolutionCandidate[];
  selectedOrgNumber?: string;
  notes?: string;
}): OrgResolutionResult {
  return {
    query: input.query,
    status: input.status,
    selectedOrgNumber: input.selectedOrgNumber,
    candidates: input.candidates,
    notes: input.notes,
  };
}

export function compareInternalVsExternalRevenue(
  internalMNOK: number | null | undefined,
  externalNOK: number | null | undefined,
  thresholds: { passPct: number; warnPct: number } = { passPct: 20, warnPct: 35 },
): {
  status: VerificationStatus;
  score: number;
  internalNOK: number | null;
  externalNOK: number | null;
  diffPct: number | null;
} {
  if (
    internalMNOK == null ||
    !Number.isFinite(internalMNOK) ||
    externalNOK == null ||
    !Number.isFinite(externalNOK) ||
    externalNOK <= 0
  ) {
    return {
      status: "unknown",
      score: statusToScore("unknown"),
      internalNOK: null,
      externalNOK: externalNOK ?? null,
      diffPct: null,
    };
  }

  const internalNOK = internalMNOK * 1_000_000;
  const diffPct = round(
    (Math.abs(internalNOK - externalNOK) / externalNOK) * 100,
    1,
  );
  const status = statusFromDiffPercent(
    diffPct,
    thresholds.passPct,
    thresholds.warnPct,
  );

  return {
    status,
    score: statusToScore(status),
    internalNOK,
    externalNOK,
    diffPct,
  };
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {},
): Promise<T> {
  const settings: RetryOptions = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let latestError: unknown;

  for (let attempt = 1; attempt <= settings.maxAttempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      latestError = error;
      if (attempt >= settings.maxAttempts) break;

      const backoffMs =
        settings.initialDelayMs * settings.backoffFactor ** (attempt - 1);
      const jitterMs =
        settings.jitterMs > 0
          ? Math.floor(Math.random() * settings.jitterMs)
          : 0;
      await sleep(backoffMs + jitterMs);
    }
  }

  throw latestError;
}
