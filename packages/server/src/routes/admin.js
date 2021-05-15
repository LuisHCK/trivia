import { Router } from 'express'
import triviaController from '../controllers/trivias'
import roomController from '../controllers/rooms'
import photosController from '../controllers/photos'

const adminRoute = Router()

// Trivias
adminRoute.get('/trivias', triviaController.list)
adminRoute.post('/trivias', triviaController.create)
adminRoute.get('/trivias/:id', triviaController.show)
adminRoute.patch('/trivias/:id', triviaController.update)
adminRoute.delete('/trivias/:id', triviaController.destroy)

// Rooms
adminRoute.post('/rooms', roomController.create)

// Photos
adminRoute.post('/photos', photosController.create)

export default adminRoute
