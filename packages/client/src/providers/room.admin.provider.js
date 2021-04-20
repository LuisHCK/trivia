import httpClient from '../httpClient'

export const CREATE_ROOM = (data, token) => {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return httpClient.post(`admin/rooms`, data)
}

export const GET_ROOM = (id, token) => {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return httpClient.get(`admin/rooms/${id}`)
}
