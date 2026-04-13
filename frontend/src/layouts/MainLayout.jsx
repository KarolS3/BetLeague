import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
    return (
        <div>
            <Navbar />
            <main className="p-8">
                <Outlet />
            </main>
        </div>
    )
}