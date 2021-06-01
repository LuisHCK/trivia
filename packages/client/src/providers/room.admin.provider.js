import httpClient from '../httpClient'

export const CREATE_ROOM = (data) => {
    return httpClient.post(`admin/rooms`, data)
}

export const GET_ROOM = (id) => {
    return httpClient.get(`admin/rooms/${id}`)
}

export const UPLOAD_PHOTO = (photo) => {
    return httpClient.post('admin/photos', photo)
}
