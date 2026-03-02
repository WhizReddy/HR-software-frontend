import React from 'react'
import { ColDef, PaginationModel, RowParams } from '@/types/table'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DataTableProps<TRow extends Record<string, unknown>> {
    rows: TRow[]
    columns: ColDef<TRow>[]
    getRowId: (row: TRow) => number | string
    handleRowClick?: (params: RowParams<TRow>) => void
    totalPages: number
    page: number
    pageSize: number
    onPaginationModelChange: (model: PaginationModel) => void
    title?: string
    actions?: React.ReactNode
}

function DataTable<TRow extends Record<string, unknown>>({
    rows,
    columns,
    getRowId,
    handleRowClick,
    totalPages,
    page,
    pageSize,
    onPaginationModelChange,
    title,
    actions,
}: DataTableProps<TRow>) {
    const canPrev = page > 0
    const canNext = page < totalPages - 1

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Optional header row */}
            {(title || actions) && (
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    {title && <h2 className="font-semibold text-slate-800 text-base">{title}</h2>}
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            )}

            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            {columns.map((col) => (
                                <th
                                    key={col.field}
                                    className="px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-slate-500 whitespace-nowrap"
                                    style={col.width ? { width: col.width } : undefined}
                                >
                                    {col.headerName}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-16 text-slate-400 text-sm"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <span className="text-2xl">📭</span>
                                        <span>No data to display</span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row, idx) => (
                                <tr
                                    key={getRowId(row)}
                                    onClick={() =>
                                        handleRowClick && handleRowClick({ row })
                                    }
                                    className={`border-b border-slate-50 transition-colors last:border-0 ${idx % 2 === 0 ? '' : 'bg-slate-50/50'
                                        } ${handleRowClick
                                            ? 'hover:bg-blue-50 cursor-pointer'
                                            : 'hover:bg-slate-50'
                                        }`}
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.field}
                                            className="px-5 py-3.5 text-slate-700 whitespace-nowrap text-sm"
                                        >
                                            {col.renderCell
                                                ? col.renderCell({
                                                    value: row[col.field],
                                                    row,
                                                    field: col.field,
                                                })
                                                : String(row[col.field] ?? '')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                    Page{' '}
                    <span className="font-semibold text-slate-700">{page + 1}</span>
                    {' '}of{' '}
                    <span className="font-semibold text-slate-700">{totalPages || 1}</span>
                </p>
                <div className="flex items-center gap-1.5">
                    <button
                        disabled={!canPrev}
                        onClick={() =>
                            onPaginationModelChange({ page: page - 1, pageSize })
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={14} />
                        Prev
                    </button>
                    <button
                        disabled={!canNext}
                        onClick={() =>
                            onPaginationModelChange({ page: page + 1, pageSize })
                        }
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Next
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DataTable
