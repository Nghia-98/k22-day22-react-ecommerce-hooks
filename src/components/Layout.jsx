import { NavLink, Outlet } from 'react-router'

function Layout() {
    const navLinkClass = ({ isActive }) =>
        `rounded px-3 py-2 text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
                    <h1 className="text-lg font-bold text-gray-900">Mini Shop</h1>
                    <nav className="flex gap-2">
                        <NavLink to="/" className={navLinkClass} end>
                            Trang chủ
                        </NavLink>
                        <NavLink to="/products" className={navLinkClass}>
                            Sản phẩm
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-5xl px-4 py-8">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
