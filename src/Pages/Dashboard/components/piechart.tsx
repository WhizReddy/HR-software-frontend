const PieChartComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-48 h-48 rounded-full mb-6" style={{
                background: `conic-gradient(
                    #3b82f6 0% 50%,
                    #ef4444 50% 60%,
                    #f59e0b 60% 75%,
                    #10b981 75% 100%
                )`
            }}></div>
            <div className="grid grid-cols-2 gap-4 text-sm font-medium w-full max-w-xs">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full shrink-0"></div><span className="text-slate-700">Present (50%)</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full shrink-0"></div><span className="text-slate-700">Absent (10%)</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full shrink-0"></div><span className="text-slate-700">On Leave (15%)</span></div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full shrink-0"></div><span className="text-slate-700">Remote (20%)</span></div>
            </div>
        </div>
    )
}

export default PieChartComponent
