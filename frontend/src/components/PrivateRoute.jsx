import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { token } = useSelector((s) => s.auth);

  return token ? children : <Navigate to="/logowanie" replace />;
}
