import httpClient from '../httpClient'

export const createRoom = (data) => {
    return httpClient.post(`admin/rooms`, data)
}

export const getRoom = (id) => {
    return httpClient.get(`admin/rooms/${id}`)
}
