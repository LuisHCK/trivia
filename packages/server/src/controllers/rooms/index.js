import Model from '../../models/room'
import Trivia from '../../models/trivia'
import { getUserFromReq } from '../../utils/userHandler'
import genId from '../../utils/genId'

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

const joinRoom = async (req, res) => {
    const { key } = req.params
    const roomInstance = await Model.findOne({ key: key.toLowerCase() }).exec()
    if (roomInstance) {
        const triviaInstance = await Trivia.findById(roomInstance.triviaId)
            .populate({ path: 'questions.photo', model: 'Photo' })
            .exec()
        return res.json({ room: roomInstance, trivia: triviaInstance })
    }

    return res.status(404).json()
}

export default { create, joinRoom }
