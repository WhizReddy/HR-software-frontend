import React from 'react'
import { useLocation, Link } from 'react-router-dom'

const routeLabels: Record<string, string> = {
    dashboard: 'Dashboard',
    employees: 'Employees',
    candidates: 'Candidates',
    interview: 'Interview',
    events: 'Events',
    payroll: 'Payroll',
    vacation: 'Vacation',
    holdings: 'Holdings',
    inventory: 'Inventory',
    historic: 'History',
    profile: 'Profile',
    view: 'Candidate Details',
    user: 'User Payroll',
}

export const BreadcrumbComponent: React.FC = () => {
    const { pathname } = useLocation()
    const crumbs = pathname.split('/').filter(Boolean)

    if (crumbs.length === 0) return null

    return (
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <Link to="/dashboard" className="hover:text-[#2457a3] transition-colors">
                Home
            </Link>
            {crumbs.map((crumb, idx) => {
                const path = '/' + crumbs.slice(0, idx + 1).join('/')
                const label = routeLabels[crumb] || crumb
                const isLast = idx === crumbs.length - 1

                return (
                    <React.Fragment key={path}>
                        <span className="text-slate-300">/</span>
                        {isLast ? (
                            <span className="text-slate-700 font-semibold capitalize">{label}</span>
                        ) : (
                            <Link to={path} className="hover:text-[#2457a3] transition-colors capitalize">
                                {label}
                            </Link>
                        )}
                    </React.Fragment>
                )
            })}
        </nav>
    )
}
