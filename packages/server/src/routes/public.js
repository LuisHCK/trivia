import { Router } from 'express'
import roomController from '../controllers/rooms'
import authController from '../controllers/auth'

const publicRouter = Router()

publicRouter.get('/room/join/:key', roomController.joinRoom)

// Auth routes
publicRouter.post('/auth/signup', authController.signUp)
publicRouter.post('/auth/login', authController.login)

export default publicRouter
