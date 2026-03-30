'use client';

import Link from 'next/link';

type YearSelectorProps = {
  years: string[];
  currentYear: string;
};

export default function YearSelector({ years, currentYear }: YearSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-500">Velg år:</span>
      <div className="flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
        {years.map((year) => (
          <Link
            key={year}
            href={`/main-board/analyser/sammenligning/${year}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              year === currentYear
                ? 'bg-natural-forest text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {year}
          </Link>
        ))}
      </div>
    </div>
  );
}
