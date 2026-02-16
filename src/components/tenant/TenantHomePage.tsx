import Link from 'next/link';
import Image from 'next/image';
import type { TenantConfig } from '@/config/tenants';
import type { TenantHomeContent } from '@/config/tenant-content';
import Container from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import NaturalStateCard from '@/components/ui/NaturalStateCard';

interface TenantHomePageProps {
  tenant: TenantConfig;
  content: TenantHomeContent;
}

export default function TenantHomePage({ tenant, content }: TenantHomePageProps) {
  const propertiesPath = `/${tenant.slug}/eiendommer`;
  const aboutPath = `/${tenant.slug}/om-prosjektet`;

  return (
    <>
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="max-w-3xl">
            {content.heroLogoImage ? (
              <div className="mb-6 flex items-center gap-4">
                <Image
                  src={content.heroLogoImage}
                  alt={`${tenant.name} logo`}
                  width={80}
                  height={80}
                  className="rounded-lg bg-white p-2 shadow-sm"
                />
                <h1 className="text-5xl font-bold leading-tight text-gray-900">
                  {content.heroTitle}
                </h1>
              </div>
            ) : (
              <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900">
                {content.heroTitle}
              </h1>
            )}

            <p className="mb-8 text-xl text-gray-600">{content.heroDescription}</p>

            <div className="flex flex-wrap gap-4">
              <Link href={propertiesPath}>
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800"
                >
                  {content.primaryCtaLabel}
                </Button>
              </Link>

              {content.secondaryCtaLabel && (
                <Link href={aboutPath}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    {content.secondaryCtaLabel}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative w-full overflow-hidden bg-gray-100">
        <div className="relative h-[400px] w-full md:h-[500px] lg:h-[600px]">
          <Image
            src={content.heroImage}
            alt={content.heroImageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
          <div className="absolute inset-0 flex items-end">
            <Container className="pb-12">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
                {content.heroOverlayTitle}
              </h2>
              <p className="mt-2 text-xl text-white/90 drop-shadow-md">
                {content.heroOverlaySubtitle}
              </p>
            </Container>
          </div>
        </div>
      </section>

      {content.stats && content.stats.length > 0 && (
        <Container className="py-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-lokka-primary">
            Nøkkeltall fra analysen
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {content.stats.map((stat) => (
              <Card className="text-center" key={`${stat.label}-${stat.value}`}>
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-lokka-primary">{stat.value}</div>
                  <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      )}

      <Container className="py-8">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-3xl">{content.developmentIcon}</div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-blue-900">{content.developmentTitle}</h3>
              <p className="mb-3 text-sm text-blue-800">{content.developmentDescription}</p>
              <Link
                href={`${aboutPath}#kontakt`}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                Send tilbakemelding →
              </Link>
            </div>
          </div>
        </div>
      </Container>

      <section className="border-y border-gray-200 bg-gray-50 py-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              {content.propertiesCtaTitle}
            </h2>
            <p className="mb-8 text-lg text-gray-600">{content.propertiesCtaDescription}</p>
            <Link href={content.propertiesCtaHref || propertiesPath}>
              <Button
                size="lg"
                className="bg-gray-900 px-8 py-6 text-lg text-white hover:bg-gray-800"
              >
                {content.propertiesCtaLabel}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-lokka-primary">
          {content.featuresHeading}
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {content.features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {content.showNaturalStateCard && (
          <div className="mt-12">
            <NaturalStateCard />
          </div>
        )}
      </Container>

    </>
  );
}
