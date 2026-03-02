import React, { useContext } from 'react'
import { SidebarHeaderContext } from '../../Context/SidebarHeaderContext'
import { Menu } from 'lucide-react'
import NotificationDropdown from '../../Pages/Notification/Notification'
import { useAuth } from '@/Context/AuthProvider'

export const Header: React.FC = () => {
    const { toggleSidebar } = useContext(SidebarHeaderContext)
    const { currentUser } = useAuth()

    const initials = currentUser
        ? `${currentUser.firstName?.charAt(0) ?? ''}${currentUser.lastName?.charAt(0) ?? ''}`
        : 'U'

    return (
        <header className="flex items-center justify-between h-14 px-5 bg-white border-b border-slate-100 sticky top-0 z-20 shadow-[0_1px_6px_rgba(0,0,0,0.04)]">
            {/* Left: hamburger toggle */}
            <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
                <Menu size={20} />
            </button>

            {/* Right: notifications + avatar */}
            <div className="flex items-center gap-3">
                <NotificationDropdown />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2457a3] to-[#4A7BCD] flex items-center justify-center text-white text-xs font-bold shadow-sm cursor-pointer">
                    {initials}
                </div>
            </div>
        </header>
    )
}

export default Header
