import httpClient from '../httpClient'

/**
 * Join participant to room
 * @param {string} key Room key
 * @param {String} token Accesstoken
 * @returns {Promise<{room, trivia}>} Room and trivia instance
 */
export const JOIN_ROOM = (key) => {
    return httpClient.get(`public/room/join/${key}`)
}
