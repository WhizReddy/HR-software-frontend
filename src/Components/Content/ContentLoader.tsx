import React from 'react'

const EventsContentLoader: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 w-full">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm animate-pulse"
                >
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-slate-100 rounded w-full mb-2" />
                    <div className="h-3 bg-slate-100 rounded w-5/6 mb-4" />
                    <div className="flex gap-2">
                        <div className="h-3 bg-slate-100 rounded w-24" />
                        <div className="h-3 bg-slate-100 rounded w-16" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default EventsContentLoader
