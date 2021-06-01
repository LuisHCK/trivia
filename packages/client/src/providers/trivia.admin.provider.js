import httpClient from '../httpClient'

export const GET_ALL_TRIVIAS = () => {
    return httpClient.get('admin/trivias')
}

export const CREATE_TRIVIA = (data) => {
    return httpClient.post('admin/trivias', data)
}

export const UPDATE_TRIVIA = (id, data) => {
    return httpClient.patch(`admin/trivias/${id}`, data)
}

export const GET_TRIVIA_BY_ID = (id) => {
    return httpClient.get(`admin/trivias/${id}`)
}

export const DELETE_TRIVIA = (id) => {
    return httpClient.delete(`admin/trivias/${id}`)
}
