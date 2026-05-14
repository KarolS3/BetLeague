import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  const links = [
    { to: "/", label: "Strona główna" },
    { to: "/mecze", label: "Mecze" },
    { to: "/zakłady", label: "Moje zakłady" },
  ];
  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 px-6 py-0 flex items-center justify-between h-14">
      <span className="text-white font-bold text-lg tracking-tight">
        Bet<span className="text-emerald-400">League</span>
      </span>
      <div className="flex gap-1">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`px-4 py-4 text-sm transition-colors border-b-2 ${
              pathname === l.to
                ? "text-white border-emerald-400"
                : "text-zinc-400 border-transparent hover:text-white"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        <Link
          to="/logowanie"
          className="text-sm text-zinc-400 hover:text-white px-3 py-1.5 rounded"
        >
          Zaloguj
        </Link>
        <Link
          to="/rejestracja"
          className="text-sm bg-emerald-500 hover:bg-emerald-400 text-white px-3 py-1.5 rounded font-medium transition-colors"
        >
          Zarejestruj się
        </Link>
      </div>
    </nav>
  );
}
