import { useContext, useEffect } from 'react'
import { InventoryContext } from '../InventoryContext'
import { useAllInventoryItems } from '../Hook'
import { SingleInventoryItem } from './SingleInventoryItem'
import { InventoryItem } from '../types'
import { Laptop, Monitor } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table'
import { Card } from '@/Components/ui/card'
import { RingLoader } from 'react-spinners'

export const InventoryTable = () => {
    const { isError, error, data, isPending } = useAllInventoryItems()

    const { handleOpenViewAssetModalOpen, searchParams, setSearchParams } =
        useContext(InventoryContext)

    useEffect(() => {
        if (!searchParams.get('page')) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev)
                newParams.set('page', '0')
                newParams.set('limit', '5')
                return newParams
            })
        }
    }, [searchParams, setSearchParams])

    if (isError) return <div className="p-4 text-red-500">Error: {error.message}</div>

    if (isPending) return (
        <div className="flex justify-center flex-col items-center min-h-[400px]">
            <RingLoader color="#2457A3" />
        </div>
    )

    const rows = data.data.map((asset: InventoryItem, index: number) => ({
        id: asset._id,
        displayId: (Number(searchParams.get('page')) * Number(searchParams.get('limit'))) + index + 1,
        type: asset.type[0].toUpperCase() + asset.type.slice(1),
        occupant: asset.userId,
        status: asset.status,
        serialNumber: asset.serialNumber,
    }))

    const handlePageChange = (newPage: number) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('page', newPage.toString())
            return newParams
        })
    }

    const currentPage = Number(searchParams.get('page')) || 0
    const totalPages = data.totalPages || 1

    return (
        <Card className="bg-white shadow-sm border border-slate-100 rounded-xl overflow-hidden mt-6">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-slate-50 border-b border-slate-100">
                        <TableRow>
                            <TableHead className="w-[80px] font-semibold text-slate-600">No</TableHead>
                            <TableHead className="font-semibold text-slate-600">Type</TableHead>
                            <TableHead className="font-semibold text-slate-600">Occupant</TableHead>
                            <TableHead className="font-semibold text-slate-600">Status</TableHead>
                            <TableHead className="font-semibold text-slate-600">Serial Number</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                    No inventory items available.
                                </TableCell>
                            </TableRow>
                        ) : (
                            rows.map((row: any) => (
                                <TableRow key={row.id} className="hover:bg-slate-50 transition-colors">
                                    <TableCell className="font-medium text-slate-600">{row.displayId}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-slate-700">
                                            {row.type === 'Monitor' ? <Monitor size={18} className="text-slate-400" /> : <Laptop size={18} className="text-slate-400" />}
                                            {row.type}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {row.occupant === null ? (
                                            <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                                                N/A
                                            </span>
                                        ) : (
                                            <span className="font-medium text-slate-700">
                                                {row.occupant.firstName} {row.occupant.lastName}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${row.status === 'available' ? 'bg-emerald-100 text-emerald-800' :
                                            row.status === 'assigned' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-800'
                                            }`}>
                                            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => {
                                                handleOpenViewAssetModalOpen()
                                                setSearchParams((prev) => {
                                                    const newParams = new URLSearchParams(prev)
                                                    newParams.set('selectedInventoryItem', row.serialNumber)
                                                    return newParams
                                                })
                                            }}
                                            className="text-primary-blue hover:text-blue-800 font-medium transition-colors hover:underline outline-none"
                                        >
                                            {row.serialNumber}
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Custom Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
                <div className="text-sm text-slate-500">
                    Showing Page {currentPage + 1} of {totalPages}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                        className="px-3 py-1.5 rounded-md border border-slate-200 text-sm font-medium bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                        disabled={currentPage >= totalPages - 1}
                        className="px-3 py-1.5 rounded-md border border-slate-200 text-sm font-medium bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>

            {searchParams.get('selectedInventoryItem') && (
                <SingleInventoryItem />
            )}
        </Card>
    )
}
