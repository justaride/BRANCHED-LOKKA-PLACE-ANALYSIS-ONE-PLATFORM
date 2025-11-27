import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';


export const metadata = {
  title: 'Om Prosjektet - Brødrene Evensen',
  description: 'Informasjon om Place Analysis for Brødrene Evensens eiendommer i Oslo',
};

export default function BrodreneEvensenOmProsjektetPage() {
  return (
    <Container>
      <h1 className="mb-8 text-4xl font-bold text-lokka-primary">
        Om Prosjektet
      </h1>

      <div className="grid gap-8">
        {/* Purpose - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle>Formål</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Dette er en dedikert plattform for placeanalyser av Brødrene Evensens eiendommer i Oslo.
              Vi samler Plaace-data og supplerer med historisk informasjon, miljødata og utviklingstrender
              for å gi et helhetlig bilde av hver eiendom.
            </p>
            <p className="text-gray-600">
              Analysene hjelper oss å forstå og dokumentere eiendommenes utvikling, attraktivitet
              og potensial i et dynamisk bylandskap.
            </p>
          </CardContent>
        </Card>

        {/* Two column grid for Data Sources and Contact */}
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Datakilder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Dataene kommer fra flere kilder for å gi et mest mulig helhetlig bilde:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-lokka-primary">•</span>
                  <span>Plaace-rapporter med demografi, handel og bevegelsesmønstre</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-lokka-primary">•</span>
                  <span>Historisk informasjon om bygningene</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-lokka-primary">•</span>
                  <span>Miljødata og bærekraftmetrikker</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-lokka-primary">•</span>
                  <span>Kartdata og geografisk informasjon</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div id="kontakt">
            <Card>
              <CardHeader>
                <CardTitle>Kontakt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600">
                  For spørsmål, tilbakemeldinger eller forslag, kontakt Natural State:
                </p>
                <div className="mb-4 rounded-lg bg-gray-50 p-4">
                  <p className="font-medium text-lokka-primary">Gabriel B Freeman</p>
                  <a
                    href="mailto:gabriel@naturalstate.no"
                    className="text-sm text-lokka-secondary hover:text-lokka-primary"
                  >
                    gabriel@naturalstate.no
                  </a>
                </div>

                {/* Google Forms Embed */}
                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-semibold text-gray-700">Send tilbakemelding</h4>
                  <p className="mb-3 text-xs text-gray-600">
                    Vi setter stor pris på dine tilbakemeldinger, spørsmål, potensielle feil du oppdager,
                    eller innsikter du gjerne skulle kikket nærmere på.
                  </p>
                  <a
                    href="https://forms.gle/btff6meFZSHaYHUE9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-lokka-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lokka-secondary"
                  >
                    Åpne tilbakemeldingsskjema
                    <span className="text-lg">→</span>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </Container>
  );
}
