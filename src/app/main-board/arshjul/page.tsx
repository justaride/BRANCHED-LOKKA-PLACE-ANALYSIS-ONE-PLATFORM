import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Arshjul from "@/components/arshjul/Arshjul";
import { loadArshjul } from "@/lib/arshjul";

export const metadata = {
  title: "Årshjul 2026 — Grünerløkka",
  description:
    "Sirkulær oversikt over møter, arrangementer, kampanjer og FoU-aktiviteter på Grünerløkka gjennom året.",
};

export default function ArshjulPage() {
  const data = loadArshjul(2026);
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-natural-cream/30 to-white">
      <section className="border-b border-gray-200/40 bg-white py-8 md:py-12">
        <Container>
          <h1 className="text-3xl font-bold text-natural-forest md:text-4xl">
            Årshjul {data.ar}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600 md:text-base">
            Alt som skjer på Grünerløkka samlet i ett bilde: gårdeierforeningens
            møter, Visit Løkka-arrangementer, kampanjer, FoU-aktiviteter og
            rapporter. Klikk en hendelse for detaljer.
          </p>
        </Container>
      </section>

      <section className="py-8 md:py-12">
        <Container>
          <Arshjul data={data} />
        </Container>
      </section>
    </main>
  );
}
