import React from 'react'
import { User, UserX, Clock, Monitor } from 'lucide-react'

type IconType = 'Present' | 'Absent' | 'On Leave' | 'Remote'

interface CardProps {
    title: string
    content: string
    icon: IconType
}

const configs = {
    Present: {
        icon: User,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        ring: 'ring-emerald-100',
        gradient: 'from-emerald-500 to-green-400',
    },
    Absent: {
        icon: UserX,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        ring: 'ring-blue-100',
        gradient: 'from-blue-500 to-indigo-400',
    },
    'On Leave': {
        icon: Clock,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        ring: 'ring-amber-100',
        gradient: 'from-amber-500 to-orange-400',
    },
    Remote: {
        icon: Monitor,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        ring: 'ring-purple-100',
        gradient: 'from-purple-500 to-violet-400',
    },
}

const CardInfo: React.FC<CardProps> = ({ title, content, icon }) => {
    const cfg = configs[icon]
    const Icon = cfg.icon

    return (
        <div className="relative overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
            {/* Icon bubble */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${cfg.gradient} shadow-sm`}>
                <Icon size={22} className="text-white" />
            </div>
            {/* Text */}
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">{title}</p>
                <p className="text-3xl font-bold text-slate-800 leading-none">{content}</p>
            </div>
            {/* Decorative circle */}
            <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-10 bg-gradient-to-br ${cfg.gradient}`} />
        </div>
    )
}

export default CardInfo
