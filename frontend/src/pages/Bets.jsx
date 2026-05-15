import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchBets } from "../store/betsSlice";

const S = {
  pending: { label: "W trakcie", cls: "text-zinc-400 bg-zinc-800" },

  won: { label: "Wygrana", cls: "text-emerald-400 bg-emerald-950" },

  lost: { label: "Przegrana", cls: "text-red-400 bg-red-950" },
};

export default function Bets() {
  const dispatch = useDispatch();

  const { list } = useSelector((s) => s.bets);

  const { token, user } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) dispatch(fetchBets());
  }, [token, dispatch]);

  if (!token)
    return (
      <div className="px-6 py-10 text-center">
        <p className="text-zinc-400 text-sm">
          Zaloguj się, żeby zobaczyć swoje zakłady.
        </p>
      </div>
    );

  return (
    <div className="px-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-xl font-semibold">Moje zakłady</h1>

        <span className="text-emerald-400 text-sm font-medium">
          Saldo: {user?.balance?.toFixed(2)} zł
        </span>
      </div>

      {list.length === 0 ? (
        <p className="text-zinc-500 text-sm">
          Nie masz jeszcze żadnych zakładów.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {list.map((bet) => {
            const s = S[bet.status] || S.pending;

            return (
              <div
                key={bet.id}
                className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white text-sm font-medium">
                      {bet.match?.homeTeam} vs {bet.match?.awayTeam}
                    </p>

                    <p className="text-zinc-500 text-xs mt-0.5">
                      Typ: {bet.pick?.toUpperCase()} · Kurs: {bet.odds} ·{" "}
                      {bet.amount} zł
                    </p>
                  </div>

                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${s.cls}`}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
