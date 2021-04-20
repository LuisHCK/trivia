import './types'

/**
 * @returns {FetchOptions}
 * @param {object} body
 */
 export const CREATE_ROM = (body) => {
    return {
        url: 'admin/rooms',
        method: 'POST',
        headers: {},
        body,
    }
}