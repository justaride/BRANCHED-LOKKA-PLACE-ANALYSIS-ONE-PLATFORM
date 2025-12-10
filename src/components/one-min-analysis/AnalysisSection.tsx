'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface AnalysisSectionProps {
  title: string;
  sectionNumber: number;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function AnalysisSection({
  title,
  sectionNumber,
  icon,
  children,
  defaultExpanded = true,
}: AnalysisSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between bg-gradient-to-r from-lokka-primary/5 to-lokka-primary/10 px-6 py-4 text-left transition-colors hover:from-lokka-primary/10 hover:to-lokka-primary/15"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lokka-primary text-sm font-bold text-white">
            {sectionNumber}
          </span>
          {icon && <span className="text-lokka-primary">{icon}</span>}
          <h2 className="text-lg font-bold text-lokka-primary md:text-xl">{title}</h2>
        </div>
        <span className="text-lokka-primary">
          {isExpanded ? (
            <ChevronUpIcon className="h-6 w-6" />
          ) : (
            <ChevronDownIcon className="h-6 w-6" />
          )}
        </span>
      </button>

      {/* Content - Expandable */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="p-6">{children}</div>
      </div>
    </section>
  );
}
