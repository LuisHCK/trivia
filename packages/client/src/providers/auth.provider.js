import httpClient from '../httpClient'
import Cookies from 'js-cookie'

export const CREATE_ACCOUNT = (data) => {
    return httpClient.post(`public/auth/signup`, data)
}

export const LOGIN = (data) => {
    return httpClient.post(`public/auth/login`, data)
}

/**
 * Save auth token on secure storage
 * @param {string} token Authorization token
 */
export const SAVE_TOKEN = (token) => {
    Cookies.set('authorization', token)
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

/**
 * Check if token exists
 * @returns {boolean}
 */
export const IS_AUTHENTICATED = () => {
    return !!Cookies.get('authorization')
}

/**
 * Removes stored JWToken
 */
export const REMOVE_TOKEN = () => {
    Cookies.set('authorization', '')
}
