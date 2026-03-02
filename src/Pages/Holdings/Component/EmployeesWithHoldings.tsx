import { useEmployeesWithHoldings } from '../Hook/index.ts'
import { UserWithHoldings } from '../TAsset'
import { useInView } from 'react-intersection-observer'
import { useContext, useEffect } from 'react'
import SimpleCollapsableCard from '@/Components/Vacation_Asset/SimpleCollapsableCard.tsx'
import { HoldingsContext } from '../HoldingsContext.tsx'
import { Button } from '@/Components/ui/button'
import { AssignAssetModal } from './Modals/AssignAssetModal.tsx'
import { ReturnAssetModal } from './Modals/ReturnAssetModal.tsx'
import { RingLoader } from 'react-spinners'

export const EmployeesWithHoldings = () => {
    const {
        isError,
        error,
        data,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
    } = useEmployeesWithHoldings()
    const { searchParams, setSearchParams } =
        useContext(HoldingsContext)

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])

    const setClickedOnHolding = (itemId: string) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('ownedItem', itemId)
            return newParams
        })
    }
    const setClickedOnAssignItem = () => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('assignItem', 'true')
            return newParams
        })
    }

    if (isError) return <div className="p-4 text-red-500">Error: {error.message}</div>

    if (isLoading) return (
        <div className="flex justify-center flex-col items-center min-h-[400px]">
            <RingLoader color="#2457A3" />
        </div>
    )

    return (
        <div className="flex flex-col gap-4 mt-6">
            {data?.pages.map((page) =>
                page.data.map((user: UserWithHoldings) => (
                    <SimpleCollapsableCard
                        key={user._id}
                        user={user}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        items={
                            user.assets
                                ? { type: 'Holding', itemArr: user.assets }
                                : undefined
                        }
                    >
                        <div className="p-4 mt-2 bg-slate-50 border-t border-slate-100 rounded-b-lg">
                            <div className="flex flex-col">
                                <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wider">Occupied items</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {user.assets &&
                                            user.assets.length > 0 ? (
                                            user.assets.map(({ type, _id }) => (
                                                <p
                                                    onClick={() => {
                                                        setClickedOnHolding(_id)
                                                    }}
                                                    key={_id}
                                                    className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-primary-blue/10 text-primary-blue hover:bg-primary-blue hover:text-white transition-colors cursor-pointer border border-primary-blue/20"
                                                >
                                                    {type}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-500 italic">No holdings</p>
                                        )}
                                    </div>
                                    <div>
                                        <Button
                                            onClick={setClickedOnAssignItem}
                                            className="bg-primary-blue hover:bg-primary-blue-dark text-white rounded-lg shadow-sm"
                                        >
                                            Assign asset
                                        </Button>
                                    </div>
                                    {searchParams.get('assignItem') && (
                                        <AssignAssetModal />
                                    )}
                                    {searchParams.get('ownedItem') && (
                                        <ReturnAssetModal />
                                    )}
                                </div>
                            </div>
                        </div>
                    </SimpleCollapsableCard>
                )),
            )}
            <div ref={ref} className="text-center py-4 text-slate-500 text-sm">
                {isFetchingNextPage && 'Loading...'}
            </div>
        </div>
    )
}
