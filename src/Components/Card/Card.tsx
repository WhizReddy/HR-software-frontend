import React from 'react'

interface CardProps {
    children: React.ReactNode
    backgroundColor?: string
    borderRadius?: string
    border?: string
    padding?: string
    className?: string
    onClick?: () => void
}

const Card: React.FC<CardProps> = ({
    children,
    backgroundColor,
    borderRadius,
    border,
    padding,
    className = '',
    onClick,
}) => {
    return (
        <div
            className={`bg-white shadow-sm overflow-hidden ${className}`}
            style={{
                backgroundColor: backgroundColor || undefined,
                borderRadius: borderRadius || '12px',
                border: border || '1px solid #e2e8f0',
                padding: padding || '16px',
            }}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Card
