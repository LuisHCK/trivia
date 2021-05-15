const colors = [
    '#495057',
    '#f03e3e',
    '#d6336c',
    '#ae3ec9',
    '#7048e8',
    '#4263eb',
    '#1c7ed6',
    '#1098ad',
    '#0ca678',
    '#37b24d',
    '#74b816',
    '#f59f00',
    '#f76707',
]

/**
 * Get random item index
 * @param {string[]} arr
 * @returns {string}
 */
const getRandomItem = (arr) => {
    return arr[(arr.length * Math.random()) | 0]
}

/**
 * Return a random hex color code
 * @returns {string}
 */
export const getRandomColor = () => {
    return getRandomItem(colors)
}
