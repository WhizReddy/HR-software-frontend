import AxiosInstance from '@/Helpers/Axios'
import { InventoryItem } from '../types'

export const getAllInventoryItems = async (
    page: string = '1',
    limit: string = '10',
): Promise<{ data: InventoryItem[]; totalPages: number }> => {
    const res = await AxiosInstance.get(`/asset?page=${page}&limit=${limit}`)
    return res.data
}

export const getOneInventoryItem = async (
    serial: string,
): Promise<InventoryItem> => {
    const res = await AxiosInstance.get(`/asset/sn/${serial}`)
    return res.data
}

export const createInventoryItem = async (
    type: 'laptop' | 'monitor',
    serialNumber: string,
) => {
    const res = await AxiosInstance.post(`/asset`, { type, serialNumber })
    return res.data
}
