'use client';

import { useEffect, useMemo, useState } from 'react';
import type { VerificationRecordsDataset, VerificationStatus } from '@/types/verification';

interface QuickStats {
  totalPopulation: number;
  dailyVisitors: number;
  weeklyVisitors: number;
  businessCount: number;
  totalRevenueMNOK: number;
}

interface ResidentAgeGroup {
  group: string;
  count: number;
  pct: number;
  confidence: 'high' | 'medium' | 'low';
}

interface DailyMicroArea {
  omrade: string;
  dagligBesok: number;
  pctOfTotal: number;
  dataStatus: 'ok' | 'missing';
  confidence: 'high' | 'medium' | 'low';
}

interface WeekdayRow {
  ukedag: string;
  besokende: number;
  besokendePct: number;
  total: number;
  totalPct: number;
}

interface BusinessCategoryRow {
  key: string;
  count: number;
  revenueMNOK: number;
  shareCountPct: number;
  shareRevenuePct: number;
  sourceCategories: string[];
}

interface OsloComparison {
  servering: {
    lokkaMNOK: number;
    sentrumMNOK: number;
    lokkaShareOfSentrumPct: number;
  };
  detaljhandel: {
    lokkaMNOK: number;
    sentrumMNOK: number;
    lokkaShareOfSentrumPct: number;
  };
}

interface KpiSummaryData {
  generatedAt: string;
  scope: string;
  sourcePriority: string[];
  quickStats: QuickStats;
  residentAgeGroups: ResidentAgeGroup[];
  dailyVisitorsByMicroArea: DailyMicroArea[];
  weekdayDistribution: {
    weeklyVisitors: number;
    averageDailyVisitors: number;
    weeklyTotal: number;
    averageDailyTotal: number;
    rows: WeekdayRow[];
  };
  businessSummary: {
    totalBusinesses: number;
    totalRevenueMNOK: number;
    categories: BusinessCategoryRow[];
  };
  osloComparison: OsloComparison;
  verification?: {
    coveragePct: number;
    statusCounts: Record<VerificationStatus, number>;
    totalChecks: number;
  };
}

interface RequirementRow {
  id: string;
  question: string;
  status: 'dekket' | 'delvis' | 'mangler';
  answer: string;
  confidence: 'high' | 'medium' | 'low';
  sources: string[];
}

interface CrossCheck {
  id: string;
  status: 'pass' | 'warn' | 'fail';
  check: string;
  impact: string;
  recommendation: string;
}

interface ConfidenceRow {
  metric: string;
  confidence: 'high' | 'medium' | 'low';
  reason: string;
}

interface Methodology {
  generatedAt: string;
  knownGaps: string[];
  verificationFramework?: {
    totalChecks: number;
    coveragePct: number;
    statusCounts: Record<VerificationStatus, number>;
    unresolvedOrgQueries: number;
  };
}

function formatInt(value: number): string {
  return value.toLocaleString('nb-NO');
}

function statusPill(status: string): string {
  if (status === 'dekket' || status === 'pass') return 'bg-green-100 text-green-800';
  if (status === 'delvis' || status === 'warn') return 'bg-amber-100 text-amber-800';
  if (status === 'unknown') return 'bg-gray-200 text-gray-700';
  return 'bg-red-100 text-red-800';
}

function confidencePill(level: string): string {
  if (level === 'high') return 'bg-green-100 text-green-800';
  if (level === 'medium') return 'bg-blue-100 text-blue-800';
  return 'bg-gray-200 text-gray-700';
}

export default function NedreLokkaSvarutDashboard() {
  const [kpi, setKpi] = useState<KpiSummaryData | null>(null);
  const [matrix, setMatrix] = useState<RequirementRow[]>([]);
  const [crossChecks, setCrossChecks] = useState<CrossCheck[]>([]);
  const [confidence, setConfidence] = useState<ConfidenceRow[]>([]);
  const [methodology, setMethodology] = useState<Methodology | null>(null);
  const [verificationDataset, setVerificationDataset] = useState<VerificationRecordsDataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const [kpiRes, matrixRes, crossRes, confRes, methodRes, verifyRes] = await Promise.all([
          fetch('/data/main-board/nedre-lokka-svarut/kpi-summary.json'),
          fetch('/data/main-board/nedre-lokka-svarut/kravmatrise.json'),
          fetch('/data/main-board/nedre-lokka-svarut/kryssverifisering.json'),
          fetch('/data/main-board/nedre-lokka-svarut/konfidens.json'),
          fetch('/data/main-board/nedre-lokka-svarut/metodikk.json'),
          fetch('/data/main-board/nedre-lokka-svarut/verification-records.json'),
        ]);

        if (!kpiRes.ok || !matrixRes.ok || !crossRes.ok || !confRes.ok || !methodRes.ok || !verifyRes.ok) {
          throw new Error('Kunne ikke laste svarut-datasettet');
        }

        const [kpiJson, matrixJson, crossJson, confJson, methodJson, verifyJson] = await Promise.all([
          kpiRes.json(),
          matrixRes.json(),
          crossRes.json(),
          confRes.json(),
          methodRes.json(),
          verifyRes.json(),
        ]);

        setKpi(kpiJson);
        setMatrix(matrixJson);
        setCrossChecks(crossJson);
        setConfidence(confJson);
        setMethodology(methodJson);
        setVerificationDataset(verifyJson);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ukjent feil');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const statusCounts = useMemo(() => {
    return {
      dekket: matrix.filter((item) => item.status === 'dekket').length,
      delvis: matrix.filter((item) => item.status === 'delvis').length,
      mangler: matrix.filter((item) => item.status === 'mangler').length,
    };
  }, [matrix]);

  const prioritizedVerification = useMemo(() => {
    if (!verificationDataset) return [];

    return [...verificationDataset.records]
      .filter((row) => row.status !== 'pass')
      .sort((a, b) => a.score - b.score)
      .slice(0, 6);
  }, [verificationDataset]);

  const unresolvedOrgQueries = useMemo(() => {
    if (!verificationDataset) return [];
    return verificationDataset.orgResolution.filter((row) => row.status !== 'resolved');
  }, [verificationDataset]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 rounded bg-gray-200" />
          <div className="h-64 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (error || !kpi || !methodology || !verificationDataset) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-red-800">Feil ved lasting av svarut-analyse: {error || 'Mangler data'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">Innbyggere</div>
          <div className="mt-2 text-2xl font-bold text-natural-forest">{formatInt(kpi.quickStats.totalPopulation)}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">Daglige besøk</div>
          <div className="mt-2 text-2xl font-bold text-natural-forest">{formatInt(kpi.quickStats.dailyVisitors)}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">Ukesbesøk</div>
          <div className="mt-2 text-2xl font-bold text-natural-forest">{formatInt(kpi.quickStats.weeklyVisitors)}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">Virksomheter</div>
          <div className="mt-2 text-2xl font-bold text-natural-forest">{formatInt(kpi.quickStats.businessCount)}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-gray-500">Omsetning</div>
          <div className="mt-2 text-2xl font-bold text-natural-forest">{kpi.quickStats.totalRevenueMNOK} MNOK</div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold text-natural-forest">Kravmatrise</h2>
        <div className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">Dekket: <strong>{statusCounts.dekket}</strong></div>
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Delvis: <strong>{statusCounts.delvis}</strong></div>
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">Mangler: <strong>{statusCounts.mangler}</strong></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-gray-300 text-left text-sm text-gray-600">
                <th className="px-3 py-3">Spørsmål</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Svar</th>
                <th className="px-3 py-3">Konfidens</th>
              </tr>
            </thead>
            <tbody>
              {matrix.map((row) => (
                <tr key={row.id} className="border-b border-gray-200 align-top">
                  <td className="px-3 py-3 text-sm font-medium text-gray-900">{row.question}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusPill(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-700">{row.answer}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${confidencePill(row.confidence)}`}>
                      {row.confidence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-natural-forest">Bevegelse per mikropunkt</h3>
          <div className="space-y-2">
            {kpi.dailyVisitorsByMicroArea.map((row) => (
              <div key={row.omrade} className="rounded-lg border border-gray-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium text-gray-900">{row.omrade}</div>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusPill(row.dataStatus === 'ok' ? 'pass' : 'warn')}`}>
                    {row.dataStatus === 'ok' ? 'data' : 'mangler'}
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  {formatInt(row.dagligBesok)} besøk ({row.pctOfTotal}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-natural-forest">Aldersgrupper (beboere)</h3>
          <div className="space-y-2">
            {kpi.residentAgeGroups.map((row) => (
              <div key={row.group} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <span className="text-sm font-medium text-gray-900">{row.group}</span>
                <span className="text-sm text-gray-700">
                  {formatInt(row.count)} ({row.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-xl font-bold text-natural-forest">Virksomheter og omsetning (mappet til ønskede kategorier)</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-gray-300 text-left text-sm text-gray-600">
                <th className="px-3 py-3">Kategori</th>
                <th className="px-3 py-3">Antall</th>
                <th className="px-3 py-3">Andel antall</th>
                <th className="px-3 py-3">Omsetning</th>
                <th className="px-3 py-3">Andel omsetning</th>
              </tr>
            </thead>
            <tbody>
              {kpi.businessSummary.categories.map((row) => (
                <tr key={row.key} className="border-b border-gray-200">
                  <td className="px-3 py-3 text-sm font-medium text-gray-900">{row.key}</td>
                  <td className="px-3 py-3 text-sm text-gray-700">{row.count}</td>
                  <td className="px-3 py-3 text-sm text-gray-700">{row.shareCountPct}%</td>
                  <td className="px-3 py-3 text-sm text-gray-700">{row.revenueMNOK} MNOK</td>
                  <td className="px-3 py-3 text-sm text-gray-700">{row.shareRevenuePct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-natural-forest">Sammenligning: Servering</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>Nedre/Løkka: <strong>{kpi.osloComparison.servering.lokkaMNOK} MNOK</strong></p>
            <p>Sentrum: <strong>{kpi.osloComparison.servering.sentrumMNOK} MNOK</strong></p>
            <p>Løkka-andel av Sentrum: <strong>{kpi.osloComparison.servering.lokkaShareOfSentrumPct}%</strong></p>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-natural-forest">Sammenligning: Detaljhandel</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>Nedre/Løkka: <strong>{kpi.osloComparison.detaljhandel.lokkaMNOK} MNOK</strong></p>
            <p>Sentrum: <strong>{kpi.osloComparison.detaljhandel.sentrumMNOK} MNOK</strong></p>
            <p>Løkka-andel av Sentrum: <strong>{kpi.osloComparison.detaljhandel.lokkaShareOfSentrumPct}%</strong></p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-xl font-bold text-natural-forest">Kryssverifisering</h3>
        <div className="space-y-3">
          {crossChecks.map((row) => (
            <div key={row.id} className="rounded-lg border border-gray-200 p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h4 className="text-sm font-semibold text-gray-900">{row.check}</h4>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusPill(row.status)}`}>
                  {row.status}
                </span>
              </div>
              <p className="text-sm text-gray-700"><strong>Konsekvens:</strong> {row.impact}</p>
              <p className="mt-1 text-sm text-gray-700"><strong>Tiltak:</strong> {row.recommendation}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-xl font-bold text-natural-forest">Verifiseringskvalitet</h3>
        <div className="mb-5 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg bg-natural-sand p-3">
            <p className="text-xs uppercase tracking-wide text-gray-600">Dekning</p>
            <p className="mt-1 text-xl font-bold text-natural-forest">{verificationDataset.coveragePct}%</p>
          </div>
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
            Pass: <strong>{verificationDataset.statusCounts.pass}</strong>
          </div>
          <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            Warn: <strong>{verificationDataset.statusCounts.warn}</strong>
          </div>
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
            Fail: <strong>{verificationDataset.statusCounts.fail}</strong>
          </div>
          <div className="rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
            Unknown: <strong>{verificationDataset.statusCounts.unknown}</strong>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Prioriterte datapunkt</h4>
            <div className="space-y-2">
              {prioritizedVerification.map((row) => (
                <div key={row.id} className="rounded-lg border border-gray-200 p-3">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">{row.title}</p>
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusPill(row.status)}`}>
                      {row.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{row.summary}</p>
                  <p className="mt-1 text-xs text-gray-500">Score: {row.score}/100</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">Org-oppløsning (MCP)</h4>
            <div className="space-y-2">
              {unresolvedOrgQueries.length > 0 ? (
                unresolvedOrgQueries.map((row) => (
                  <div key={row.query} className="rounded-lg border border-gray-200 p-3">
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-gray-900">{row.query}</p>
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusPill(row.status === 'unresolved' ? 'fail' : 'warn')}`}>
                        {row.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{row.notes || 'Mangler avklaring'}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                  Alle org-oppslag i datasettet er avklart.
                </div>
              )}
            </div>
          </div>
        </div>

        {verificationDataset.limitations.length > 0 && (
          <div className="mt-4 rounded-lg bg-amber-50 p-4">
            <p className="mb-2 text-sm font-semibold text-amber-900">Begrensninger i verifisering</p>
            <ul className="space-y-1 text-sm text-amber-800">
              {verificationDataset.limitations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-xl font-bold text-natural-forest">Konfidens og kjente gap</h3>
        <div className="mb-4 space-y-2">
          {confidence.map((row) => (
            <div key={row.metric} className="rounded-lg border border-gray-200 p-3">
              <div className="mb-1 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-gray-900">{row.metric}</p>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${confidencePill(row.confidence)}`}>
                  {row.confidence}
                </span>
              </div>
              <p className="text-sm text-gray-700">{row.reason}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-amber-50 p-4">
          <p className="mb-2 text-sm font-semibold text-amber-900">Kjente datagap</p>
          <ul className="space-y-1 text-sm text-amber-800">
            {methodology.knownGaps.map((gap) => (
              <li key={gap}>• {gap}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Sist generert: {new Date(kpi.generatedAt).toLocaleString('nb-NO')}
        </p>
      </section>
    </div>
  );
}
