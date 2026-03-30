import type {
  BibliotekVerificationSummary,
  SourceItem,
} from "@/types/biblioteket";

function getStatusLabel(status: BibliotekVerificationSummary["status"]): string {
  switch (status) {
    case "verified":
      return "Verifisert";
    case "partially_verified":
      return "Delvis verifisert";
    case "disputed":
      return "Omstridt";
    default:
      return "Ikke verifisert";
  }
}

function getStatusClassName(
  status: BibliotekVerificationSummary["status"],
): string {
  switch (status) {
    case "verified":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "partially_verified":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "disputed":
      return "bg-rose-100 text-rose-800 border-rose-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function VerificationBadge({
  summary,
}: {
  summary?: BibliotekVerificationSummary | null;
}) {
  if (!summary) return null;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClassName(summary.status)}`}
    >
      {getStatusLabel(summary.status)}
    </span>
  );
}

export function VerificationPanel({
  summary,
  sources = [],
  title = "Verifisering og kilder",
}: {
  summary?: BibliotekVerificationSummary | null;
  sources?: SourceItem[];
  title?: string;
}) {
  if (!summary) return null;

  const visibleSources = sources.slice(0, 5);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <VerificationBadge summary={summary} />
            <span className="text-sm text-gray-500">
              Sist verifisert {formatDate(summary.lastVerifiedAt)}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {summary.verifiedCount} av {summary.claimCount} påstander er markert som
            verifiserte.
            {summary.unverifiedCount > 0
              ? ` ${summary.unverifiedCount} står fortsatt som ikke verifisert.`
              : ""}
            {" "}Dekningsgrad: {Math.round(summary.coverageScore * 100)} %.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <Metric label="Claims" value={summary.claimCount} />
          <Metric label="Verifisert" value={summary.verifiedCount} />
          <Metric label="Kilder" value={summary.sourceCount} />
          <Metric
            label="Delvis"
            value={summary.partiallyVerifiedCount}
          />
          <Metric label="Uverifisert" value={summary.unverifiedCount} />
        </div>
      </div>

      {visibleSources.length > 0 && (
        <div className="mt-6 border-t border-gray-100 pt-5">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Utvalgte kilder
          </h3>
          <div className="flex flex-wrap gap-3">
            {visibleSources.map((source) => (
              <a
                key={`${source.title}-${source.url}`}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 transition-colors hover:border-gray-300 hover:bg-white"
              >
                <span>{source.title}</span>
                <span className="text-xs uppercase text-gray-400">
                  {source.evidenceLevel === "primary" ? "primær" : "sekundær"}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {summary.limitations.length > 0 && (
        <div className="mt-6 border-t border-gray-100 pt-5">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Åpne gap
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            {summary.limitations.slice(0, 3).map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-center">
      <div className="text-xl font-semibold text-gray-900">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-gray-500">
        {label}
      </div>
    </div>
  );
}
