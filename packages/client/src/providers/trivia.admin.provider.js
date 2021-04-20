import httpClient from '../httpClient'

export const getAllQuizzes = () => {
    return httpClient.get('admin/quizzes')
}

export const createQuiz = (data) => {
    return httpClient.post('admin/quizzes', data)
}

export const updateQuiz = (id, data) => {
    return httpClient.patch(`admin/quizzes/${id}`, data)
}

export const getQuizById = (id) => {
    return httpClient.get(`admin/quizzes/${id}`)
}
