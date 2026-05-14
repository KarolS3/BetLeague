import { useEffect } from "react";

export default function Toast({ message, type = "error", onClose }) {
  useEffect(() => {
    if (!message) return;

    const t = setTimeout(onClose, 3000);

    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  const bg = type === "success" ? "bg-emerald-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-5 right-5 ${bg} text-white text-sm px-4 py-3 rounded-lg z-50`}
    >
      {message}
    </div>
  );
}
