import './utils/environment'
import express from 'express'
import http from 'http'
import chalk from 'chalk'
import socketIO from 'socket.io'
import './database'
import adminRoute from './routes/admin'
import cors from 'cors'
import { checkJwt } from './middlewares/auth0'
import pulbicRouter from './routes/public'
import startSocketServer from './socket'
import fileUpload from 'express-fileupload'

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const port = process.env.PORT || 4000

startSocketServer(io)

// Auth0 Middleware
const corsOptions = {
    origin: '*',
}

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    fileUpload({
        createParentPath: true,
    })
)

// Serve static files
app.use('/uploads', express.static('uploads'))

console.log()

app.use(cors(corsOptions))

// Routing
app.use('/api/admin', checkJwt, adminRoute)
app.use('/api/public', pulbicRouter)

server.listen(port, () => {
    console.log(
        `[${chalk.bold(
            'INFO'
        )}] Server is running on PORT: ${chalk.magenta.bold(port)}`
    )
})
