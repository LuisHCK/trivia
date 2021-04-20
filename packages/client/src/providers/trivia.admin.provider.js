import httpClient from '../httpClient'

export const GET_ALL_TRIVIAS = (token) => {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return httpClient.get('admin/trivias')
}

export const CREATE_TRIVIA = (data, token) => {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return httpClient.post('admin/trivias', data)
}

export const UPDATE_TRIVIA = (id, data, token) => {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return httpClient.patch(`admin/trivias/${id}`, data)
}

export const GET_TRIVIA_BY_ID = (id, token) => {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return httpClient.get(`admin/trivias/${id}`)
}
