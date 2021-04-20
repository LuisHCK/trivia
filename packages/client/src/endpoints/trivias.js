import './types'

/**
 * @returns {FetchOptions}
 */
export const GET_ALL_TRIVIAS = () => {
    return {
        url: 'admin/trivias',
        method: 'GET',
        headers: {},
    }
}

/**
 * @returns {FetchOptions}
 * @param {string | number} id
 */
export const GET_TRIVIA = (id) => {
    return {
        url: `admin/trivias/${id}`,
        method: 'GET',
        headers: {},
    }
}

/**
 * @returns {FetchOptions}
 * @param {object} body
 */
export const CREATE_TRIVIA = (body) => {
    return {
        url: 'admin/trivias',
        method: 'POST',
        headers: {},
        body,
    }
}

/**
 * @returns {FetchOptions}
 * @param {string | number} id
 * @param {object} body
 */
export const UPDATE_TRIVIA = (id, body) => {
    return {
        url: `admin/trivias/${id}`,
        method: 'PATCH',
        headers: {},
        body,
    }
}

/**
 * @returns {FetchOptions}
 * @param {string | number} id
 */
export const DELETE_TRIVIA = (id) => {
    return {
        url: `admin/trivias/${id}`,
        method: 'DELETE',
        headers: {},
    }
}
