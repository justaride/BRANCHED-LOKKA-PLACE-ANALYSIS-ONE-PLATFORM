export type VerificationStatus = "pass" | "warn" | "fail" | "unknown";
export type ConfidenceLevel = "high" | "medium" | "low";
export type ResolutionStatus = "resolved" | "ambiguous" | "unresolved";

export interface VerificationEvidence {
  source: string;
  description: string;
  value?: number | string | boolean | null;
  unit?: string;
  observedAt?: string;
  reference?: string;
}

export interface VerificationCheck {
  id: string;
  label: string;
  status: VerificationStatus;
  score: number;
  threshold?: string;
  details?: string;
}

export interface VerificationRecord {
  id: string;
  requirementId: string;
  title: string;
  status: VerificationStatus;
  confidence: ConfidenceLevel;
  score: number;
  scope: "exact" | "proxy" | "external" | "missing";
  summary: string;
  checks: VerificationCheck[];
  evidence: VerificationEvidence[];
  recommendations?: string[];
}

export interface OrgResolutionCandidate {
  companyName: string;
  orgNumber: string;
  source: string;
  matchQuality: ConfidenceLevel;
  notes?: string;
}

export interface OrgResolutionResult {
  query: string;
  status: ResolutionStatus;
  selectedOrgNumber?: string;
  candidates: OrgResolutionCandidate[];
  notes?: string;
}

export interface VerificationRecordsDataset {
  generatedAt: string;
  coveragePct: number;
  statusCounts: Record<VerificationStatus, number>;
  records: VerificationRecord[];
  orgResolution: OrgResolutionResult[];
  limitations: string[];
}
