/**
 * @typedef {Object} User
 * @property {string} nickname User nickname
 * @property {string} email User email
 * @property {string} sub User unique id
 */

/**
 * Get user info from express request
 * @param {Express.Request} req
 * @returns {User} User object
 */
export const getUserFromReq = (req) => {
    return req.oidc.user
}
