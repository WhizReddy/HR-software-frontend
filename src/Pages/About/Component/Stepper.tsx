const steps = [
    'Determine clients needs',
    'Team selecetion',
    'Development',
    'Daily meetings',
    'Deployment',
    'Ongoing & Maintenance',
]

export default function HorizontalLinearAlternativeLabelStepper() {
    return (
        <div className="w-full mt-4">
            <div className="flex items-center w-full relative pt-2 pb-8">
                {steps.map((label, index) => (
                    <div key={label} className="flex-1 text-center relative flex flex-col items-center">
                        <div className="z-10 w-6 h-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
                            {index + 1}
                        </div>
                        {index !== steps.length - 1 && (
                            <div className="absolute top-3 left-1/2 w-full h-[2px] bg-blue-600" />
                        )}
                        <span className="mt-2 text-sm text-slate-700 font-medium absolute top-8 whitespace-nowrap text-center break-words max-w-[80px] md:max-w-none">
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
