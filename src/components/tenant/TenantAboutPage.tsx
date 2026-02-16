import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import type { TenantConfig } from '@/config/tenants';
import type { TenantAboutContent } from '@/config/tenant-content';

interface TenantAboutPageProps {
  tenant: TenantConfig;
  content: TenantAboutContent;
}

export default function TenantAboutPage({ tenant, content }: TenantAboutPageProps) {
  const feedbackUrl =
    content.feedbackUrl ||
    process.env.NEXT_PUBLIC_GOOGLE_FORM_URL ||
    'https://forms.gle/btff6meFZSHaYHUE9';

  return (
    <Container>
      <h1 className="mb-8 text-4xl font-bold text-lokka-primary">Om Prosjektet</h1>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Formål</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">{content.purposeLead}</p>
            <p className="text-gray-600">{content.purposeDetails}</p>
          </CardContent>
        </Card>

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
                {content.dataSources.map((source) => (
                  <li className="flex items-start gap-2" key={source}>
                    <span className="mt-1 text-lokka-primary">•</span>
                    <span>{source}</span>
                  </li>
                ))}
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

                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-semibold text-gray-700">Send tilbakemelding</h4>
                  <p className="mb-3 text-xs text-gray-600">
                    {content.feedbackDescription ||
                      'Vi setter stor pris på dine tilbakemeldinger, spørsmål, potensielle feil du oppdager, eller innsikter du gjerne skulle kikket nærmere på.'}
                  </p>
                  <a
                    href={feedbackUrl}
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
