import React from 'react'

interface InputProps {
    label?: string
    name?: string
    type?: string
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    width?: number | string
    icon?: React.ReactNode
    iconPosition?: 'start' | 'end'
    IsUsername?: boolean
    required?: boolean
    disabled?: boolean
    min?: string | number
    max?: string | number
    step?: string | number
    className?: string
    readOnly?: boolean
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    width,
    icon,
    iconPosition = 'end',
    IsUsername,
    required,
    disabled,
    min,
    max,
    step,
    className = '',
    readOnly,
}) => {
    return (
        <div
            className={`flex flex-col gap-1 ${className}`}
            style={{ width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%' }}
        >
            {label && (
                <label htmlFor={name} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                {icon && iconPosition === 'start' && (
                    <div className="absolute left-3 pointer-events-none text-slate-400">{icon}</div>
                )}
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || (IsUsername ? label : placeholder)}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    min={min}
                    max={max}
                    step={step}
                    className={`w-full rounded-lg border border-slate-200 bg-white text-slate-800 text-sm placeholder:text-slate-400 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                        disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
                        transition-shadow
                        ${icon && iconPosition === 'start' ? 'pl-10 pr-3 py-2' : ''}
                        ${icon && iconPosition === 'end' ? 'pl-3 pr-10 py-2' : ''}
                        ${!icon ? 'px-3 py-2' : ''}
                    `}
                />
                {icon && iconPosition === 'end' && (
                    <div className="absolute right-3 pointer-events-none text-slate-400">{icon}</div>
                )}
            </div>
        </div>
    )
}

export default Input
