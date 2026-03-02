import React, { useState, useRef, useEffect } from 'react'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'

interface EventsData {
    _id: string
    [key: string]: unknown
}

interface LongMenuProps {
    event: EventsData
    onEdit?: (event: EventsData) => void
    onDelete?: (id: string) => void
}

const LongMenu: React.FC<LongMenuProps> = ({ event, onEdit, onDelete }) => {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
                className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
            >
                <MoreVertical size={18} />
            </button>
            {open && (
                <div className="absolute right-0 top-8 z-30 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[140px]">
                    {onEdit && (
                        <button
                            onClick={() => { setOpen(false); onEdit(event) }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <Pencil size={15} /> Edit
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => { setOpen(false); onDelete(event._id) }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <Trash2 size={15} /> Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default LongMenu
