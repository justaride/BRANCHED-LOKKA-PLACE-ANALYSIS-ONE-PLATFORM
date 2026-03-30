'use client';

import { useState } from 'react';
import {
  METHODOLOGY_SECTIONS,
  METHODOLOGY_INTRO,
  METHODOLOGY_COMPACT,
} from '@/lib/content/methodology';

type DataMethodologyProps = {
  variant: 'inline' | 'full' | 'compact'
}

function InlineMethodology() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenSection(prev => (prev === id ? null : id));
  };

  return (
    <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-natural-sage/5 shadow-sm">
      <div className="p-5 md:p-6">
        <h4 className="mb-2 text-lg font-bold text-natural-forest">
          Om datagrunnlaget
        </h4>
        <p className="mb-4 text-sm leading-relaxed text-gray-600">
          {METHODOLOGY_INTRO}
        </p>

        <div className="space-y-1">
          {METHODOLOGY_SECTIONS.map(section => (
            <div key={section.id} className="rounded-lg border border-gray-100">
              <button
                onClick={() => toggle(section.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
              >
                <span className="text-base">{section.icon}</span>
                <span className="flex-1 text-sm font-semibold text-gray-800">
                  {section.title}
                </span>
                <svg
                  className={`h-4 w-4 text-gray-400 transition-transform ${
                    openSection === section.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openSection === section.id && (
                <div className="border-t border-gray-100 px-4 py-3">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                    {section.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FullMethodology() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-3xl font-bold text-natural-forest">
          Datametodologi
        </h2>
        <p className="text-lg leading-relaxed text-gray-700">
          {METHODOLOGY_INTRO}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {METHODOLOGY_SECTIONS.map(section => (
          <div
            key={section.id}
            className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="text-2xl">{section.icon}</span>
              <h3 className="text-lg font-bold text-natural-forest">
                {section.title}
              </h3>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompactMethodology() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <svg className="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{METHODOLOGY_COMPACT}</span>
      <button
        onClick={() => setExpanded(!expanded)}
        className="ml-1 font-medium text-teal-600 underline-offset-2 hover:underline"
      >
        {expanded ? 'Skjul' : 'Les mer'}
      </button>

      {expanded && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2">
          <InlineMethodology />
        </div>
      )}
    </div>
  );
}

export default function DataMethodology({ variant }: DataMethodologyProps) {
  if (variant === 'full') return <FullMethodology />;
  if (variant === 'compact') return <CompactMethodology />;
  return <InlineMethodology />;
}
