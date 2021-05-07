const colors = [
    '#49505',
    '#f03e',
    '#d6336',
    '#ae3ec9',
    '#7048e8',
    '#4263eb',
    '#1c7ed',
    '#1098a',
    '#0ca67',
    '#37b24d',
    '#74b81',
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
