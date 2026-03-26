export const metadata = {
  title: 'Under vedlikehold — Løkka Gårdeierforening',
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F3F6F4] to-white px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 text-6xl">🔧</div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Under vedlikehold
        </h1>
        <p className="mb-2 text-lg text-gray-600">
          Vi gjør noen forbedringer og er snart tilbake.
        </p>
        <p className="text-sm text-gray-400">
          Løkka Gårdeierforening & Natural State
        </p>
      </div>
    </div>
  );
}
