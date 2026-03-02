import { ChangeEvent, useContext } from 'react'
import { HoldingsContext } from '../HoldingsContext'
import { debounce } from '@/Helpers/debounce'
import Input from '@/Components/Input/Index'
import { Search } from 'lucide-react'

export const HoldingsSearchFilter = () => {
    const { searchParams, setSearchParams } = useContext(HoldingsContext)

    const handleChange = (value: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            if (newParams.get('selectedHolding')) {
                newParams.delete('selectedHolding')
            }

            if (value === 'all') {
                newParams.delete('users')
            } else {
                newParams.set('users', value)
            }

            return newParams
        })
    }

    const debouncedSetSearchParams = debounce((value: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            if (newParams.get('selectedHolding')) {
                newParams.delete('selectedHolding')
            }

            if (value) {
                newParams.set('search', value)
            } else {
                newParams.delete('search')
            }
            return newParams
        })
    }, 500)

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSetSearchParams(e.target.value)
    }

    const userFilterChoices = [
        { label: 'ALL', value: 'all' },
        { label: 'W ASSETS', value: 'with' },
        { label: 'W/O ASSETS', value: 'without' }
    ]

    const currentUserFilter = searchParams.get('users') || 'all'

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="w-full sm:w-72">
                <Input
                    type="search"
                    iconPosition="end"
                    icon={<Search size={20} className="text-slate-400" />}
                    IsUsername
                    label="Search Employees"
                    name="search"
                    initialValue={searchParams.get('search') || ''}
                    onChange={onSearchChange}
                />
            </div>

            <div className="flex flex-col gap-1.5 sm:items-end">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Filter by
                </span>
                <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                    {userFilterChoices.map((filter) => {
                        const isActive = currentUserFilter === filter.value
                        return (
                            <button
                                key={filter.value}
                                onClick={() => handleChange(filter.value)}
                                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ease-in-out ${isActive
                                        ? 'bg-white text-primary-blue shadow-sm ring-1 ring-slate-200/50'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
