'use client';

import { useState } from 'react';
import { METHODOLOGY_SECTIONS } from '@/lib/content/methodology';

export default function LokkaMethodology() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const toggle = (id: string) => {
    setOpenSection(prev => (prev === id ? null : id));
  };

  return (
    <div className="mb-12 space-y-6">
      <div>
        <div className="mb-1 text-xs font-bold uppercase tracking-widest text-green-600">
          Datagrunnlag
        </div>
        <h2 className="mb-2 text-2xl font-bold text-natural-forest">
          Slik telles Løkka
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Bevegelsesdataene kommer fra Telia via Plaace.ai — slik fungerer det.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-2 text-2xl">📡</div>
          <div className="mb-1 text-sm font-bold text-gray-800">Telias mobilnett</div>
          <p className="text-xs leading-relaxed text-gray-600">
            Hver mobilenhet genererer 200–400 datapunkter daglig. I Norge gir dette
            over <strong className="text-gray-800">600 millioner signaler per dag</strong> som
            viser hvor folk oppholder seg.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-2 text-2xl">📊</div>
          <div className="mb-1 text-sm font-bold text-gray-800">40% markedsdekning</div>
          <p className="text-xs leading-relaxed text-gray-600">
            Telia dekker ca. 40% av norske mobilbrukere. Plaace.ai
            ekstrapolerer fra denne dekningen til et <strong className="text-gray-800">estimat for hele
            befolkningen</strong>.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-2 text-2xl">🔒</div>
          <div className="mb-1 text-sm font-bold text-gray-800">Fullstendig anonymisert</div>
          <p className="text-xs leading-relaxed text-gray-600">
            Data anonymiseres irreversibelt med <strong className="text-gray-800">36 timers forsinkelse</strong>.
            Grupper under 5 personer vises aldri. Ingen individer kan identifiseres (GDPR).
          </p>
        </div>
      </div>

      <div className="rounded-lg border-l-4 border-green-700 bg-green-50 p-5 text-sm">
        <div className="mb-2 font-bold text-green-800">Slik leser du tallene</div>
        <ul className="space-y-2 text-green-900">
          <li>
            <strong>~53 700 daglige besøkende</strong> er gjennomsnittet for hele 2025, beregnet over 1,14 km² av Grünerløkka.
          </li>
          <li>
            <strong>«Besøkende»</strong> betyr folk som verken bor eller jobber i området — de oppsøker Løkka aktivt.
            Beboere og arbeidere telles separat.
          </li>
          <li>
            Lørdag topper med <strong>~64 000</strong>, mandag er lavest med <strong>~47 600</strong>.
          </li>
          <li>
            For kontekst: Grünerløkka bydel har ca. 63 000 innbyggere (SSB) — det daglige besøkstallet tilsvarer altså
            omtrent hele bydelens befolkning.
          </li>
          <li>
            Korte gjennomkjøringer (f.eks. biltrafikk) filtreres bort — kun faktisk opphold registreres.
          </li>
          <li>
            Én mobilenhet = én person. Tallene viser unike enheter, ikke antall passeringer.
          </li>
        </ul>
      </div>

      <div className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-natural-sage/5 shadow-sm">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex w-full items-center justify-between p-5 text-left md:p-6"
        >
          <div>
            <h4 className="text-lg font-bold text-natural-forest">
              Detaljert metodologi
            </h4>
            <p className="text-sm text-gray-500">
              Teknisk forklaring av teledata, kategorier, måleperioder og begrensninger.
            </p>
          </div>
          <svg
            className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
              showDetails ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDetails && (
          <div className="border-t border-gray-100 px-5 pb-5 md:px-6 md:pb-6">
            <div className="space-y-1 pt-4">
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
        )}
      </div>
    </div>
  );
}
