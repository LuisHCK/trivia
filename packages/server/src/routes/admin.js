import { Router } from 'express'
import { create, destroy, list, show, update } from '../controllers/trivias'

const adminRoute = Router()

// Trivias
adminRoute.get('/trivias', list)
adminRoute.post('/trivias', create)
adminRoute.get('/trivias/:id', show)
adminRoute.patch('/trivias/:id', update)
adminRoute.delete('/trivias/:id', destroy)

export default adminRoute
