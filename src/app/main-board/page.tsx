export default function MainBoardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-12 rounded-lg border border-gray-200 bg-gradient-to-br from-lokka-primary to-lokka-secondary p-12 text-white">
        <h1 className="mb-4 text-4xl font-bold">
          Natural State Place Analysis
        </h1>
        <p className="text-xl text-white/90">
          Grünerløkka 2025
        </p>
      </section>

      {/* Quick Access */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-lokka-primary">
          Analyser
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="/main-board/analyser"
            className="rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-lokka-primary hover:shadow-lg"
          >
            <h3 className="mb-2 text-lg font-semibold text-lokka-primary">
              Alle analyser
            </h3>
            <p className="text-gray-600">
              Se oversikt over alle områdeanalyser for Grünerløkka
            </p>
          </a>
        </div>
      </section>

      {/* About */}
      <section className="rounded-lg border border-gray-200 bg-white p-8">
        <h2 className="mb-4 text-2xl font-bold text-lokka-primary">
          Om Main Board
        </h2>
        <p className="mb-4 text-gray-700">
          Main Board gir alle medlemmer av Løkka Gårdeierforening tilgang til
          omfattende områdeanalyser for Grünerløkka. Her finner du temporale
          analyser, demografiske data, mediadekning og mer.
        </p>
        <p className="text-gray-700">
          Dette er en felles ressurs for alle eiendomsaktører i området.
        </p>
      </section>
    </div>
  );
}
