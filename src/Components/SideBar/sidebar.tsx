import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { SidebarHeaderContext } from '../../Context/SidebarHeaderContext'
import {
    LayoutDashboard,
    Users,
    Briefcase,
    CalendarCheck,
    CreditCard,
    UserCheck,
    Calendar,
    Package,
    BarChart2,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Handshake,
} from 'lucide-react'

const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Employees', path: '/employees', icon: Users },
    { label: 'Candidates', path: '/candidates', icon: UserCheck },
    { label: 'Interview', path: '/interview', icon: Briefcase },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'Payroll', path: '/payroll', icon: CreditCard },
    { label: 'Vacation', path: '/vacation', icon: CalendarCheck },
    { label: 'Holdings', path: '/holdings', icon: Handshake },
    { label: 'Inventory', path: '/inventory', icon: Package },
    { label: 'Stats', path: '/historic', icon: BarChart2 },
]

export const SideBar: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useContext(SidebarHeaderContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/')
    }

    return (
        <aside
            className={`relative flex flex-col bg-white border-r border-slate-100 min-h-screen shrink-0 transition-all duration-300 ease-in-out shadow-sm ${isSidebarOpen ? 'w-60' : 'w-[68px]'
                }`}
        >
            {/* Logo */}
            <div className={`flex items-center h-14 border-b border-slate-100 ${isSidebarOpen ? 'px-5 gap-3' : 'justify-center'}`}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2457a3] to-[#4A7BCD] flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">
                    E
                </div>
                {isSidebarOpen && (
                    <span className="font-bold text-slate-800 text-base tracking-tight">
                        Exypnos <span className="text-[#2457a3]">HR</span>
                    </span>
                )}
            </div>

            {/* Nav items */}
            <nav className="flex-1 py-3 overflow-y-auto space-y-0.5 px-2">
                {navItems.map(({ label, path, icon: Icon }) => (
                    <NavLink
                        key={path}
                        to={path}
                        title={!isSidebarOpen ? label : undefined}
                        className={({ isActive }) =>
                            `flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${isSidebarOpen ? 'px-3' : 'justify-center px-0'
                            } ${isActive
                                ? 'bg-[#2457a3] text-white shadow-sm shadow-[#2457a3]/30'
                                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                            }`
                        }
                    >
                        <Icon size={18} className="flex-shrink-0" />
                        {isSidebarOpen && <span className="truncate">{label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className={`border-t border-slate-100 p-2 ${!isSidebarOpen ? 'flex justify-center' : ''}`}>
                <button
                    onClick={handleLogout}
                    title={!isSidebarOpen ? 'Logout' : undefined}
                    className={`flex items-center gap-2.5 w-full py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150 ${isSidebarOpen ? 'px-3' : 'justify-center px-0'
                        }`}
                >
                    <LogOut size={18} className="flex-shrink-0" />
                    {isSidebarOpen && <span>Logout</span>}
                </button>
            </div>

            {/* Collapse toggle */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-[18px] w-6 h-6 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-500 hover:bg-[#2457a3] hover:text-white hover:border-[#2457a3] transition-all duration-150 z-10"
            >
                {isSidebarOpen ? <ChevronLeft size={13} /> : <ChevronRight size={13} />}
            </button>
        </aside>
    )
}
