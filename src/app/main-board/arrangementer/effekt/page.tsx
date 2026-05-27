import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import EventImpactGrid from "@/components/analyser/EventImpactGrid";
import { loadAnalysis } from "@/lib/loaders/place-loader";
import {
  generateBankTransactionData,
  generateVisitorData,
} from "@/lib/synthetic-data-generator";

export const metadata = {
  title: "Arrangementseffekt — Grünerløkka",
  description:
    "Tallbasert sammenligning av besøk og omsetning før, under og etter arrangementer på Grünerløkka.",
};

export default async function ArrangementerEffektPage() {
  const analysis = await loadAnalysis("2025-arsrapport");
  if (!analysis) notFound();

  const events = (analysis.events || []).map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    endDate: e.endDate,
  }));

  const besokData = generateVisitorData(2025);
  const omsetningData = generateBankTransactionData(2025);

  return (
    <main className="min-h-screen bg-gradient-to-b from-natural-cream/30 to-white">
      <section className="border-b border-gray-200/40 bg-white py-8 md:py-12">
        <Container>
          <Link
            href="/main-board/analyser/2025-arsrapport"
            className="text-sm text-natural-forest hover:underline"
          >
            ← Tilbake til årsrapport 2025
          </Link>
          <h1 className="mt-3 text-3xl font-bold text-natural-forest md:text-4xl">
            Arrangementseffekt
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600 md:text-base">
            Hva skjer med besøk og omsetning når det arrangeres festivaler,
            juleaktiviteter og nabolagsfester på Grünerløkka? Hvert kort
            sammenligner snittet for arrangementsdagene mot et 14-dagers
            baseline-vindu før — ukedag-justert.
          </p>
        </Container>
      </section>

      <section className="py-8 md:py-12">
        <Container>
          <EventImpactGrid
            events={events}
            besokData={besokData}
            omsetningData={omsetningData}
          />
        </Container>
      </section>

      <section className="border-t border-gray-200/40 bg-natural-cream/30 py-8">
        <Container>
          <h2 className="mb-3 text-lg font-semibold text-natural-forest">
            Slik leses tallene
          </h2>
          <div className="grid gap-4 text-sm text-gray-700 md:grid-cols-2">
            <div>
              <p>
                <strong>Baseline</strong> er gjennomsnittet for de 14 dagene før
                arrangementet, justert slik at en lørdag sammenlignes mot snittet
                av lørdager — ikke mot hverdager.
              </p>
            </div>
            <div>
              <p>
                <strong>Konfidens</strong> er høy når baseline-vinduet har god
                dekning og lav variasjon. Lav konfidens betyr at tallet skal
                tolkes med forsiktighet.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
