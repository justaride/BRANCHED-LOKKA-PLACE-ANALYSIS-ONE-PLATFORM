import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import NedreLokkaSvarutDashboard from "@/components/analyser/NedreLokkaSvarutDashboard";
import { loadAnalysis } from "@/lib/loaders/place-loader";

export const metadata = {
  title: "Nedre Løkka - Samlet Svarut",
  description:
    "Samlet oppstilling av kravpunkter, KPI-er og kryssverifisering for Nedre Løkka.",
};

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("nb-NO");
}

export default async function NedreLokkaSvarutPage() {
  const analysis = await loadAnalysis("nedre-lokka-svarut");

  if (!analysis) {
    notFound();
  }

  return (
    <>
      <section className="border-b border-gray-200 bg-gradient-to-br from-natural-forest to-natural-sage py-12 text-white">
        <Container>
          <Link
            href="/main-board/analyser"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/90 transition-colors hover:text-white"
          >
            <span>←</span> Tilbake til analyser
          </Link>

          <div className="mb-3">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              Samlet svarut
            </span>
          </div>

          <h1 className="mb-3 text-4xl font-bold">{analysis.title}</h1>
          <p className="max-w-3xl text-lg text-white/90">
            {analysis.description || analysis.area.displayName}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/85">
            <span>
              <strong>Periode:</strong> {analysis.period.label}
            </span>
            <span>
              <strong>Sist oppdatert:</strong>{" "}
              {formatDate(analysis.metadata.sistOppdatert)}
            </span>
            <span>
              <strong>Område:</strong> {analysis.area.displayName}
            </span>
          </div>
        </Container>
      </section>

      <Container className="py-10 md:py-12">
        <NedreLokkaSvarutDashboard />

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-600">
          Datakilder: {analysis.plaaceData.datakilder.join(", ")}
        </div>
      </Container>
    </>
  );
}
