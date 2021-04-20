import { Router } from 'express'
import triviaController from '../controllers/trivias'
import roomController from '../controllers/rooms'

const adminRoute = Router()

// Trivias
adminRoute.get('/trivias', triviaController.list)
adminRoute.post('/trivias', triviaController.create)
adminRoute.get('/trivias/:id', triviaController.show)
adminRoute.patch('/trivias/:id', triviaController.update)
adminRoute.delete('/trivias/:id', triviaController.destroy)

// Rooms
adminRoute.post('/rooms', roomController.create)

export default adminRoute
