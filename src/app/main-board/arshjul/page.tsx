import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Arshjul from "@/components/arshjul/Arshjul";
import { getArshjulYears } from "@/lib/arshjul-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Årshjul — Grünerløkka",
  description:
    "Sirkulær oversikt over arrangementer, markeder, kampanjer, kultur og sesongaktiviteter på Grünerløkka gjennom året.",
};

export default async function ArshjulPage() {
  const years = await getArshjulYears();

  if (years.length === 0) notFound();

  return (
    <main className="min-h-screen bg-gradient-to-b from-natural-cream/30 to-white">
      <section className="border-b border-gray-200/40 bg-white py-8 md:py-12">
        <Container>
          <h1 className="text-3xl font-bold text-natural-forest md:text-4xl">
            Årshjul
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-gray-600 md:text-base">
            Alt som skjer på Grünerløkka samlet i ett bilde: arrangementer,
            markeder, kampanjer, Visit Løkka, kultur og sesongaktiviteter. Velg
            en hendelse for detaljer, bytt mellom hjul og agenda, eller filtrer
            på kategori.
          </p>
        </Container>
      </section>

      <section className="py-8 md:py-12">
        <Container>
          <Arshjul years={years} />
        </Container>
      </section>
    </main>
  );
}
