import React, { useState, useEffect, useRef } from 'react'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGetAllNotifications } from './Hook/index'
import AxiosInstance from '@/Helpers/Axios'
import { useAuth } from '@/Context/AuthProvider'

interface Notification {
    _id: number
    title: string
    type: string
    typeId: string
    content: string
    date: string
    isRead: boolean
}

const NotificationDropdown: React.FC = () => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const { notifications, setNotifications } = useGetAllNotifications() ?? {
        notifications: [],
        setNotifications: () => { },
    }
    const [length, setLength] = useState(0)

    useEffect(() => {
        setLength(notifications.filter((n) => !n.isRead).length)
    }, [notifications])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const removeNotification = async (notification: Notification) => {
        try {
            await AxiosInstance.patch(`notification/${notification._id}`)
            const updatedNotifications = notifications.map(n =>
                n._id === notification._id ? { ...n, isRead: true } : n
            )
            setNotifications(updatedNotifications)
            setLength(prev => prev - 1)
        } catch (error) {
            console.error(
                `Error removing notification ${notification._id}:`,
                error,
            )
        }
    }

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.isRead) {
            removeNotification(notification)
        }
        if (notification.type === 'events') {
            navigate(`/events?event=${notification.typeId}`)
            setIsOpen(false)
        } else if (notification.type === 'vacation') {
            navigate(
                `/vacation?vacationType=requests&selectedVacation=${notification.typeId}`,
            )
        } else if (notification.type === 'candidates') {
            navigate(`/view/${notification.typeId}`)
        } else if (notification.type === 'allVacation') {
            navigate(`/vacation?vacationType=requests&page=0&limit=5`)
        } else if (notification.type === 'allCandidates') {
            navigate(`/candidates`)
        }
    }

    const getColorByType = (type: string, isRead: boolean) => {
        if (isRead) {
            return '#6C757D'
        }
        switch (type) {
            case 'events':
                return 'blue'
            case 'vacation':
                return 'green'
            case 'candidates':
                return 'purple'
            case 'allVacation':
                return 'green'
            case 'allApplication':
                return 'purple'
            default:
                return '#6C757D'
        }
    }

    const markAllAsRead = async () => {
        try {
            const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }))
            for (const notification of updatedNotifications) {
                if (!notification.isRead) {
                    await AxiosInstance.patch(`notification/${notification._id}`)
                }
            }
            setNotifications(updatedNotifications)
            setLength(0)
        } catch (error) {
            console.error('Error marking all as read:', error)
        }
    }

    const showAll = async () => {
        try {
            const result = await AxiosInstance.get(
                `notification/user/${currentUser?._id}?period=week`,
            )
            setNotifications(result.data)
        } catch (error) {
            console.error('Error showing all notifications:', error)
        }
    }

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button
                type="button"
                className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                onClick={handleToggleDropdown}
            >
                <Bell size={24} />
                {length > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full">
                        {length}
                    </span>
                )}
            </button>
            {isOpen && (
                <div
                    className="absolute right-0 mt-2 p-2 w-[450px] bg-white shadow-xl rounded-lg overflow-y-auto max-h-[400px] z-[60] scrollbar-hide"
                >
                    {notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`mb-2 bg-white border border-slate-100 rounded-md shadow-sm cursor-pointer hover:bg-slate-50 transition-colors`}
                            style={{ borderBottomWidth: '4px', borderBottomColor: getColorByType(notification.type, notification.isRead) }}
                            onClick={() => handleNotificationClick(notification)}
                        >
                            <div className="p-3 flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-sm text-slate-800">
                                        {notification.title}
                                    </h4>
                                    <p className="text-sm text-slate-600 max-w-[300px] truncate">
                                        {notification.content}
                                    </p>
                                </div>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeNotification(notification)
                                    }}
                                    className={`text-xs font-medium cursor-pointer ${notification.isRead ? 'text-slate-400 font-normal' : 'text-blue-600 hover:text-blue-800'
                                        }`}
                                >
                                    {notification.isRead ? 'Read' : 'Mark as read'}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between mt-2 pt-2 border-t border-slate-100 px-2">
                        {length > 0 && (
                            <button
                                className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                                onClick={markAllAsRead}
                            >
                                Mark all as read
                            </button>
                        )}
                        <button
                            className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                            onClick={showAll}
                        >
                            Show all
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NotificationDropdown