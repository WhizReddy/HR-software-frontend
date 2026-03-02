import React from 'react'

interface StatusBadgeProps {
    status: string
    color?: string
}

const colorMap: Record<string, string> = {
    green: 'bg-green-100 text-green-800 border-green-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    orange: 'bg-orange-100 text-orange-800 border-orange-200',
    yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    gray: 'bg-slate-100 text-slate-600 border-slate-200',
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, color }) => {
    const classes = color && colorMap[color] ? colorMap[color] : 'bg-slate-100 text-slate-600 border-slate-200'

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${classes}`}
        >
            {status}
        </span>
    )
}
