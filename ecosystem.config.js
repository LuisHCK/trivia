module.exports = {
    apps: [
        {
            name: 'trivia-api',
            script: 'yarn server',
            interpreter: 'bash',
            // Delay between restart
            watch_delay: 1000,
            ignore_watch: ['node_modules'],
            watch_options: {
                followSymlinks: false,
            },
        },
    ],
}
