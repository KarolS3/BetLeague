import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white px-8 py-4 flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/matches">Matches</Link>
            <Link to="/bets">Bets</Link>
            <Link to="/login">Login</Link>
        </nav>
    )
}