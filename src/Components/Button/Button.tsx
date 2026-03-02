import React from 'react'
import { ButtonTypes } from './ButtonTypes'

interface ButtonProps {
    btnText?: string
    type?: ButtonTypes
    onClick?: () => void
    width?: string
    padding?: string
    color?: string
    backgroundColor?: string
    borderColor?: string
    cursor?: string
    disabled?: boolean
    className?: string
    htmlType?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
    btnText = 'Button',
    type = ButtonTypes.PRIMARY,
    onClick,
    width,
    padding,
    color,
    backgroundColor,
    borderColor,
    disabled = false,
    className = '',
    htmlType = 'button',
}) => {
    const base =
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm'

    const variants = {
        [ButtonTypes.PRIMARY]:
            'bg-[#2457a3] hover:bg-[#1b4285] text-white border border-[#2457a3] focus:ring-[#2457a3]',
        [ButtonTypes.SECONDARY]:
            'bg-white hover:bg-slate-50 text-[#2457a3] border border-[#2457a3] focus:ring-[#2457a3]',
        [ButtonTypes.DANGER]:
            'bg-red-600 hover:bg-red-700 text-white border border-red-600 focus:ring-red-500',
    }

    const inlineStyle: React.CSSProperties = {
        width: width || undefined,
        padding: padding || '8px 16px',
        color: color || undefined,
        backgroundColor: backgroundColor || undefined,
        borderColor: borderColor || undefined,
    }

    return (
        <button
            type={htmlType}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[type]} ${className}`}
            style={inlineStyle}
        >
            {btnText}
        </button>
    )
}

export default Button
