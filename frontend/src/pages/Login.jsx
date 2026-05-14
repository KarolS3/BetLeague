import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("login:", form);
    // TODO: podłączyć do Redux action → API
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-white text-2xl font-bold mb-1">Zaloguj się</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Nie masz konta?{" "}
          <Link to="/rejestracja" className="text-emerald-400 hover:underline">
            Zarejestruj się
          </Link>
        </p>
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
          />
          <input
            type="password"
            placeholder="Hasło"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-400 text-white rounded py-2.5 text-sm font-medium transition-colors"
          >
            Zaloguj się
          </button>
        </div>
      </div>
    </div>
  );
}
