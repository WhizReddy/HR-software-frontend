import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface DrawerProps {
    open: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
    width?: string
    anchor?: 'left' | 'right'
}

const DrawerComponent: React.FC<DrawerProps> = ({
    open,
    onClose,
    children,
    title,
    width = '420px',
    anchor = 'right',
}) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (open) window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [open, onClose])

    if (!open) return null

    const side = anchor === 'right' ? 'right-0 top-0 h-full' : 'left-0 top-0 h-full'

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            {/* Panel */}
            <aside
                className={`absolute ${side} bg-white shadow-2xl flex flex-col overflow-hidden`}
                style={{ width }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    {title && (
                        <h2 className="font-semibold text-slate-800 text-base">{title}</h2>
                    )}
                    <button
                        onClick={onClose}
                        className="ml-auto p-1.5 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
                {/* Body */}
                <div className="flex-1 overflow-y-auto p-5">{children}</div>
            </aside>
        </div>
    )
}

export default DrawerComponent
