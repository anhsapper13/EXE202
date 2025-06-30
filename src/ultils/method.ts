import { api } from '@/services/api'

export const getApi = async (url: string, config = {}) => {
    const response = await api.get(url, config)
    return response.data
}

export const postApi = async (url: string, data: any, config = {}) => {
    const response = await api.post(url, data, config)
    return response.data
}

export const putApi = async (url: string, data: any, config = {}) => {
    const response = await api.put(url, data, config)
    return response.data
}

export const deleteApi = async (url: string, config = {}) => {
    const response = await api.delete(url, config)
    return response.data
}

export const patchApi = async (url: string, data: any, config = {}) => {
    const response = await api.patch(url, data, config)
    return response.data
}