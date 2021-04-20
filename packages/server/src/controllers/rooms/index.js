import Model from '../../models/room'
import { getUserFromReq } from '../../utils/userHandler'

/**
 * Create a new Trivia
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res) => {
    const { body } = req
    const user = getUserFromReq(req)

    try {
        const existingRoom = await Model.findOne({
            triviaId: body.triviaId,
        }).exec()

        if (existingRoom) {
            return res.json(existingRoom)
        }

        const newRoom = await Model.create({
            triviaId: body.triviaId,
            userId: user.sub,
            key: genId(6),
        })
        res.status(201).json(newRoom)
    } catch (createError) {
        console.log(createError)
        res.status(422).json(createError)
    }
}

export default { create }
