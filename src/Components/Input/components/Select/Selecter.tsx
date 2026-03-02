import React from 'react'

interface SelecterProps {
    label?: string
    name?: string
    value?: string | string[]
    onChange?: (value: string | string[]) => void
    options?: { value: string; label: string }[] | string[]
    multiple?: boolean
    width?: string | number
    required?: boolean
    disabled?: boolean
    placeholder?: string
}

const Selecter: React.FC<SelecterProps> = ({
    label,
    name,
    value,
    onChange,
    options = [],
    multiple = false,
    width,
    required,
    disabled,
    placeholder,
}) => {
    const normalizedOptions = options.map((opt) =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt,
    )

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!onChange) return
        if (multiple) {
            const selected = Array.from(e.target.selectedOptions).map((o) => o.value)
            onChange(selected)
        } else {
            onChange(e.target.value)
        }
    }

    const selectedValue = Array.isArray(value) ? value : value ?? ''

    return (
        <div
            className="flex flex-col gap-1"
            style={{ width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%' }}
        >
            {label && (
                <label htmlFor={name} className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <select
                id={name}
                name={name}
                multiple={multiple}
                required={required}
                disabled={disabled}
                value={selectedValue}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-white text-slate-800 text-sm px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
                    transition-shadow"
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {normalizedOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Selecter
