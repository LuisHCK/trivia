import chalk from 'chalk'
/**
 * Print message to console
 * @param {'ERROR' | 'WARNING' | 'LOG' | 'DEBUG'} level
 * @param  {...string} text Message to print
 */
export const logMessage = (level, ...text) => {
    let prefix = ''

    switch (level) {
        case 'ERROR':
            prefix = chalk.red(level)
            break

        case 'WARNING':
            prefix = chalk.yellow(level)
            break

        case 'LOG':
            prefix = chalk.blue(level)
            break

        case 'DEBUG':
            prefix = chalk.white(level)
            break

        default:
            prefix = '[]'
            break
    }

    prefix = chalk.bold(`[${prefix}]`).toUpperCase()

    console.log(`${prefix} ${text}`)
}
