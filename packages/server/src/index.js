import './utils/environment'
import express from 'express'
import http from 'http'
import chalk from 'chalk'
import socketIO from 'socket.io'
import './database'
import adminRoute from './routes/admin'
import cors from 'cors'
import { checkJwt } from './middlewares/auth0'

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 4000

io.on('connection', (socket) => {
    console.log(`[${chalk.green.bold('SOCKET')}] Socket.io Connected`)
})

// Auth0 Middleware
const corsOptions = {
    origin: '*',
}

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors(corsOptions))

// Routing
app.use('/api/admin', checkJwt, adminRoute)

server.listen(port, () => {
    console.log(
        `[${chalk.bold(
            'INFO'
        )}] Server is running on PORT: ${chalk.magenta.bold(port)}`
    )
})
