import Model from '../../models/trivia'
import { getUserFromReq } from '../../utils/userHandler'

/**
 * Show all Trivias create by current user
 * @param {Request} req
 * @param {Response} res
 */
export const list = async (req, res) => {
    const user = getUserFromReq(req)
    const trivias = Model.find({ userId: user.sub }).exec()
    res.json(trivias)
}

/**
 * Create a new Trivia
 * @param {Request} req
 * @param {Response} res
 */
export const create = async (req, res) => {
    const user = getUserFromReq(req)
    const { body } = req
    const trivia = await Model.create({ ...body, userId: user.sub })
    res.json(trivia)
}

/**
 * Show one Trivia by id
 * @param {Request} req
 * @param {Response} res
 */
export const show = async (req, res) => {
    const user = getUserFromReq(req)
    const { id } = req.params
    const trivia = await Model.findOne({ _id: id, userId: user.sub })

    if (trivia) {
        res.json(trivia)
    } else {
        res.status(404).json({ error: 'Trivia not found' })
    }
}

export const update = async (req, res) => {
    const user = getUserFromReq(req)
    const { body } = req
    const { id } = req.params
    const trivia = await Model.findOneAndUpdate(
        { _id: id, userId: user.sub },
        body,
        { new: true }
    )
    res.json(trivia)
}

export const destroy = async (req, res) => {
    const user = getUserFromReq(req)
    const { id } = req.params
    await Model.findOneAndDelete({ _id: id, userId: user.sub })

    res.json({ message: 'Trivia deleted' })
}
