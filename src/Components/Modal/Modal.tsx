import React from 'react'
import { X } from 'lucide-react'

interface ModalComponentProps {
    open: boolean
    handleClose: () => void
    children: React.ReactNode
    width?: string
    height?: string
    padding?: string
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
    open,
    handleClose,
    children,
    width = '500px',
    height,
    padding = '24px',
}) => {
    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
                style={{ width, height: height || 'auto', padding }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 p-1.5 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
                >
                    <X size={18} />
                </button>
                {children}
            </div>
        </div>
    )
}
