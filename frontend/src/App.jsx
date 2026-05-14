import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Matches from "./pages/Matches";
import Bets from "./pages/Bets";
import PrivateRoute from './components/PrivateRoute' 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/mecze" element={<Matches />} />
          <Route path="/zakłady" element={<PrivateRoute><Bets /></PrivateRoute>} /> 
        </Route>
        <Route path="/logowanie" element={<Login />} />
        <Route path="/rejestracja" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
