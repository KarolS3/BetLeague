import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMatches } from "../store/matchesSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.matches);

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  return (
    <div>
      <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">
          Typuj wyniki. <span className="text-emerald-400">Sprawdź się.</span>
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          Pięć największych lig europejskich. Wirtualne saldo. Zero ryzyka.
        </p>
        <Link
          to="/rejestracja"
          className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white px-5 py-2.5 rounded font-medium text-sm transition-colors"
        >
          Zacznij za darmo
        </Link>
      </div>
      <div className="px-6 py-8">
        <h2 className="text-white font-semibold mb-4">Nadchodzące mecze</h2>
        {loading && <p className="text-zinc-500 text-sm">Ładowanie...</p>}
        <div className="flex flex-col gap-3">
          {list.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-emerald-400 font-medium">
                  {m.league}
                </span>
                <span className="text-xs text-zinc-500">{m.startTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white text-sm font-medium">
                  {m.homeTeam}
                </span>
                <span className="text-zinc-500 text-xs px-3">vs</span>
                <span className="text-white text-sm font-medium">
                  {m.awayTeam}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {[
                  ["1", m.odds?.home],
                  ["X", m.odds?.draw],
                  ["2", m.odds?.away],
                ].map(([lbl, odd]) => (
                  <Link
                    to="/mecze"
                    key={lbl}
                    className="bg-zinc-800 hover:bg-emerald-500 text-white rounded py-1.5 text-sm transition-colors flex flex-col items-center"
                  >
                    <span className="text-zinc-400 text-xs">{lbl}</span>
                    <span className="font-semibold">{odd}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        {list.length > 0 && (
          <Link
            to="/mecze"
            className="inline-block mt-4 text-emerald-400 text-sm hover:underline"
          >
            Zobacz wszystkie mecze →
          </Link>
        )}
      </div>
    </div>
  );
}
