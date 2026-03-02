import React from 'react'

interface ErrorTextProps {
    message?: string
    children?: React.ReactNode
}

export const ErrorText: React.FC<ErrorTextProps> = ({ message, children }) => {
    const content = message || children
    if (!content) return null

    return (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <span>⚠</span>
            <span>{content}</span>
        </p>
    )
}
