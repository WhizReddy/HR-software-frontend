import React, { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

type Severity = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
    open: boolean
    onClose: () => void
    message: string
    severity?: Severity
}

const icons: Record<Severity, React.ReactNode> = {
    success: <CheckCircle size={18} className="text-green-600" />,
    error: <XCircle size={18} className="text-red-600" />,
    warning: <AlertCircle size={18} className="text-yellow-600" />,
    info: <Info size={18} className="text-blue-600" />,
}

const colors: Record<Severity, string> = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
}

const Toast: React.FC<ToastProps> = ({ open, onClose, message, severity = 'info' }) => {
    useEffect(() => {
        if (open) {
            const timer = setTimeout(onClose, 4000)
            return () => clearTimeout(timer)
        }
    }, [open, onClose])

    if (!open) return null

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm text-sm font-medium transition-all ${colors[severity]}`}
            >
                {icons[severity]}
                <span className="flex-1">{message}</span>
                <button
                    onClick={onClose}
                    className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    )
}

export default Toast
