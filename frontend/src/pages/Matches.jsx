import { mockMatches } from "../data/mockMatches";

export default function Matches() {
  return (
    <div className="px-6 py-6">
      <h1 className="text-white text-xl font-semibold mb-4">Mecze</h1>
      <div className="flex flex-col gap-3">
        {mockMatches.map((m) => (
          <div
            key={m.id}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-xs text-emerald-400 font-medium">
                {m.league}
              </span>
              <span className="text-xs text-zinc-500">{m.startTime}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-white font-medium text-sm">
                {m.homeTeam}
              </span>
              <span className="text-zinc-500 text-xs px-3">vs</span>
              <span className="text-white font-medium text-sm">
                {m.awayTeam}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["1", m.odds.home],
                ["X", m.odds.draw],
                ["2", m.odds.away],
              ].map(([label, odd]) => (
                <button
                  key={label}
                  className="bg-zinc-800 hover:bg-emerald-500 text-white rounded py-2 text-sm transition-colors flex flex-col items-center"
                >
                  <span className="text-zinc-400 text-xs">{label}</span>
                  <span className="font-semibold">{odd}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
