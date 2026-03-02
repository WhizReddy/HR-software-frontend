import React, { useState, useEffect } from 'react'
import styles from './style/EventsPoll.module.css'
import AxiosInstance from '@/Helpers/Axios'
import { useAuth } from '@/Context/AuthProvider'
import { EventPollProps, Poll, PollOption, Voter } from './Interface/Interface'

const EventPoll: React.FC<EventPollProps> = ({ poll, eventId, userId }) => {
    const { currentUser } = useAuth()
    const [localPoll, setLocalPoll] = useState<Poll>(poll)
    const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'hr'

    useEffect(() => {
        setLocalPoll(poll)
    }, [poll, userId])

    const hasUserVoted = (voters: Voter[]): boolean => {
        return userId
            ? voters.some((voter) => voter._id === userId.toString())
            : false
    }

    const handleVote = async (option: string) => {
        if (!userId) return

        const existingVotedOption = localPoll.options.find((opt) =>
            opt.voters.some((voter) => voter._id === userId.toString()),
        )

        try {
            if (existingVotedOption && existingVotedOption.option !== option) {
                await AxiosInstance.delete(`/event/${eventId}/vote`, {
                    data: { option: existingVotedOption.option, userId },
                })

                setLocalPoll((prevPoll) => ({
                    ...prevPoll,
                    options: prevPoll.options.map((opt) =>
                        opt.option === existingVotedOption.option
                            ? {
                                ...opt,
                                votes: opt.votes - 1,
                                voters: opt.voters.filter(
                                    (voter) =>
                                        voter._id !== userId.toString(),
                                ),
                            }
                            : opt,
                    ),
                }))
            }

            await AxiosInstance.post(`/event/${eventId}/vote`, {
                option,
                userId,
            })

            setLocalPoll((prevPoll) => ({
                ...prevPoll,
                options: prevPoll.options.map((opt) =>
                    opt.option === option
                        ? {
                            ...opt,
                            votes: opt.votes + 1,
                            voters: [
                                ...opt.voters,
                                {
                                    _id: userId.toString(),
                                    firstName: currentUser?.firstName || '',
                                    lastName: currentUser?.lastName || '',
                                },
                            ],
                        }
                        : opt,
                ),
            }))
        } catch (error) {
            console.error('Error updating vote:', error)
            setLocalPoll(poll)
        }
    }

    const renderOptionContent = (option: PollOption) => {
        const userVoted = hasUserVoted(option.voters)

        return (
            <div className={styles.optionContent}>
                <span>{option.option}</span>
                <div className={styles.optionStats}>
                    {renderDevCheckbox(userVoted)}
                    {renderAdminTooltip(option)}
                </div>
            </div>
        )
    }

    const renderDevCheckbox = (userVoted: boolean) => {
        if (isAdmin) return null

        return (
            <span>
                <input
                    type="checkbox"
                    checked={userVoted}
                    readOnly
                    className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                />
            </span>
        )
    }

    const renderAdminTooltip = (option: PollOption) => {
        if (!isAdmin) return null

        const tooltipText = option.voters.map(v => `${v.firstName} ${v.lastName}`).join('\n')

        return (
            <div title={tooltipText}>
                <span className={styles.voteCount}>{option.votes}</span>
            </div>
        )
    }

    return (
        <div className={styles.eventPoll}>
            <div className={styles.border} />
            <div className={styles.title}>{localPoll.question}</div>
            {localPoll.options.map((option, index) => {
                const userVoted = hasUserVoted(option.voters)
                return (
                    <div
                        key={index}
                        className={`${styles.option} ${userVoted ? styles.activeOption : ''}`}
                        onClick={() => handleVote(option.option)}
                    >
                        {renderOptionContent(option)}
                    </div>
                )
            })}
        </div>
    )
}

export default EventPoll