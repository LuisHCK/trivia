import { Router } from 'express'
import roomController from '../controllers/rooms'

const pulbicRouter = Router()

pulbicRouter.get('/room/join/:key', roomController.joinRoom)

export default pulbicRouter
