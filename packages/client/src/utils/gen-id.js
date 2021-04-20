/**
 * Generates a random string
 * @returns {string}
 */
const genId = (length = 8) => {
    return Math.random().toString(36).substr(2, length)
}

export default genId
