'use client';

type DataFreshnessProps = {
  lastUpdated: string
  source?: string
}

export default function DataFreshness({ lastUpdated, source }: DataFreshnessProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
      <span>Sist oppdatert: {lastUpdated}</span>
      {source && (
        <>
          <span className="text-gray-300">|</span>
          <span>{source}</span>
        </>
      )}
    </div>
  );
}
