import chalk from 'chalk'
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGODB_URI

mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
})

mongoose.connection.on('error', (err) => {
    console.error(
        `[${chalk.red.bold('DATABASE')}] Error white connecting to mongoDB: `,
        err
    )
})
mongoose.connection.on('connected', (err, res) => {
    console.log(`[${chalk.green.bold('DATABASE')}] Connected to mongoDB!`,)
})
