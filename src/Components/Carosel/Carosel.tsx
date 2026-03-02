import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
    images?: string[]
    children?: React.ReactNode
}

const Example: React.FC<CarouselProps> = ({ images = [], children }) => {
    const [current, setCurrent] = useState(0)

    if (!images || images.length === 0) {
        return (
            <div className="w-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center min-h-[200px] text-slate-400 text-sm">
                {children || 'No images'}
            </div>
        )
    }

    const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
    const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

    return (
        <div className="relative w-full rounded-xl overflow-hidden bg-slate-900">
            <img
                src={images[current]}
                alt={`slide-${current}`}
                className="w-full object-cover max-h-72"
            />
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                    >
                        <ChevronRight size={18} />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/40'}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Example
