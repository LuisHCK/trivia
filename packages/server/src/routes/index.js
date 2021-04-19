import { Router } from 'express'

const appRouter = Router()

appRouter.all('/', (req, res, next) => {
    res.send('hola')
})

export default appRouter
