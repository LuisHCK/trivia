const colors = [
    'gray',
    'red',
    'pink',
    'grape',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange',
]

export const getRandomColor = () => {
    const color = getRandomItem(colors)
    const variant = Math.floor(Math.random() * 9) + 1

    return `var(--oc-${color}-${variant})`
}

/**
 * Get random item index
 * @param {string[]} arr
 * @returns {string}
 */
const getRandomItem = (arr) => {
    return arr[(arr.length * Math.random()) | 0]
}
