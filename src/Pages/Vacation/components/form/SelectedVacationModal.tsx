import { useContext } from 'react'
import { VacationContext } from '../../VacationContext'
import { useGetVacation } from '../../Hook'
import { UpdateVacationForm } from './UpdateVacationForm'

export const SelectedVacationModal = () => {
    const { searchParams, handleCloseVacationModalOpen: handleClose } =
        useContext(VacationContext)

    const vacation = useGetVacation()
    const isOpen = searchParams.get('selectedVacation') !== null

    if (!isOpen) return null
    if (vacation.isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white p-6 rounded-xl shadow-xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
                </div>
            </div>
        )
    }

    if (vacation.error) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white p-6 rounded-xl shadow-xl text-red-500">
                    Error: {vacation.error.message}
                </div>
            </div>
        )
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <UpdateVacationForm data={vacation} />
            </div>
        </div>
    )
}
