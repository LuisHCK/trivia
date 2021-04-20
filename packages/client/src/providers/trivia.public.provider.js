import httpClient from '../httpClient'

export const joinQuiz = (key) => {
    return httpClient.get(`public/quizzes/join/${key}`)
}
