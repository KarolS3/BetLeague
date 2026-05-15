import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from "../store/authSlice";
import Toast from "../components/Toast";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [toast, setToast] = useState({ msg: "", type: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirm)
      return setToast({ msg: "Hasła się nie zgadzają", type: "error" });

    const result = await dispatch(
      registerUser({ email: form.email, password: form.password }),
    );

    if (registerUser.fulfilled.match(result)) {
      setToast({ msg: "Konto utworzone!", type: "success" });

      setTimeout(() => navigate("/"), 900);
    } else {
      setToast({ msg: result.payload || "Błąd rejestracji", type: "error" });
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-white text-2xl font-bold mb-1">Zarejestruj się</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Masz już konto?{" "}
          <Link to="/logowanie" className="text-emerald-400 hover:underline">
            Zaloguj się
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
          <input
            type="password"
            placeholder="Powtórz hasło"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-400 text-white rounded py-2.5 text-sm font-medium transition-colors"
          >
            Utwórz konto
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
