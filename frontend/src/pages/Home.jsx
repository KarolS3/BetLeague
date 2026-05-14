export default function Home() {
  return (
    <div>
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">
          Typuj wyniki. <span className="text-emerald-400">Sprawdź się.</span>
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          Pięć największych lig europejskich. Wirtualne saldo. Zero ryzyka.
        </p>
        <a
          href="/rejestracja"
          className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded font-medium text-sm transition-colors"
        >
          Zacznij za darmo
        </a>
      </div>
      <div className="px-6 py-8">
        <h2 className="text-white font-semibold mb-4">Nadchodzące mecze</h2>
        <div className="text-zinc-500 text-sm">
          Ładowanie meczów... (dane pojawią się po integracji z backendem)
        </div>
      </div>
    </div>
  );
}
