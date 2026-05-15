import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchMatches } from "../store/matchesSlice";

import { placeBet } from "../store/betsSlice";

import Toast from "../components/Toast";

export default function Matches() {
  const dispatch = useDispatch();

  const { list, loading } = useSelector((s) => s.matches);

  const { token } = useSelector((s) => s.auth);

  const [selected, setSelected] = useState(null);

  const [amount, setAmount] = useState("");

  const [toast, setToast] = useState({ msg: "", type: "" });

  useEffect(() => {
    dispatch(fetchMatches());
  }, [dispatch]);

  async function handleBet() {
    if (!token)
      return setToast({ msg: "Zaloguj się, żeby obstawiać", type: "error" });

    if (!amount || Number(amount) <= 0)
      return setToast({ msg: "Podaj poprawną kwotę", type: "error" });

    const result = await dispatch(
      placeBet({
        matchId: selected.matchId,
        pick: selected.pick,
        amount: Number(amount),
      }),
    );

    if (placeBet.fulfilled.match(result)) {
      setToast({ msg: "Zakład przyjęty!", type: "success" });

      setSelected(null);
      setAmount("");
    } else {
      setToast({ msg: result.payload || "Błąd", type: "error" });
    }
  }

  return (
    <div className="px-6 py-6">
      <h1 className="text-white text-xl font-semibold mb-4">Mecze</h1>

      {loading && <p className="text-zinc-400 text-sm mb-4">Ładowanie...</p>}

      <div className="flex flex-col gap-3">
        {list.map((m) => (
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
                ["1", "home", m.odds?.home],
                ["X", "draw", m.odds?.draw],
                ["2", "away", m.odds?.away],
              ].map(([lbl, pick, odd]) => (
                <button
                  key={lbl}
                  onClick={() => setSelected({ matchId: m.id, pick, odd })}
                  className="bg-zinc-800 hover:bg-emerald-500 text-white rounded py-2 text-sm transition-colors flex flex-col items-center"
                >
                  <span className="text-zinc-400 text-xs">{lbl}</span>

                  <span className="font-semibold">{odd}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-end justify-center pb-8 z-40">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-5 w-full max-w-sm mx-4">
            <p className="text-white font-medium mb-1">Obstaw zakład</p>

            <p className="text-zinc-400 text-xs mb-4">
              Wybór: {selected.pick.toUpperCase()} · Kurs: {selected.odd}
            </p>

            <input
              type="number"
              placeholder="Kwota (zł)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-600 text-white rounded px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-emerald-500"
            />

            {amount > 0 && (
              <p className="text-zinc-400 text-xs mb-3">
                Możliwa wygrana: {(amount * selected.odd).toFixed(2)} zł
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelected(null);
                  setAmount("");
                }}
                className="flex-1 border border-zinc-600 text-zinc-300 rounded py-2 text-sm hover:bg-zinc-800"
              >
                Anuluj
              </button>

              <button
                onClick={handleBet}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white rounded py-2 text-sm font-medium"
              >
                Obstaw
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={toast.msg}
        type={toast.type}
        onClose={() => setToast({ msg: "" })}
      />
    </div>
  );
}
