import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../store/authSlice";

import Toast from "../components/Toast";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(
      loginUser({ email: form.email, password: form.password }),
    );

    if (loginUser.fulfilled.match(result)) {
      setToast({ msg: "Zalogowano pomyślnie!", type: "success" });

      setTimeout(() => navigate("/"), 900);
    } else {
      setToast({ msg: result.payload || "Błąd logowania", type: "error" });
    }
  }
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading } = useSelector((s) => s.auth);

  const [toast, setToast] = useState({ msg: "", type: "" });

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
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white rounded py-2.5 text-sm font-medium transition-colors"
          >
            {loading ? "Logowanie..." : "Zaloguj się"}
          </button>
        </div>
      </div>
      <Toast
        message={toast.msg}
        type={toast.type}
        onClose={() => setToast({ msg: "" })}
      />
    </div>
  );
}
