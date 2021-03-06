import Model from '../../models/trivia'
import PhotoModel from '../../models/photo'
import { getUserFromReq } from '../../utils/userHandler'

/**
 * Show all Trivias create by current user
 * @param {Request} req
 * @param {Response} res
 */
const list = async (req, res) => {
    const user = getUserFromReq(req)
    const trivias = await Model.find({ user: user.id })
        .populate({ path: 'questions.photo', model: PhotoModel })
        .exec()
    res.json(trivias)
}

/**
 * Create a new Trivia
 * @param {Request} req
 * @param {Response} res
 */
const create = async (req, res) => {
    const user = getUserFromReq(req)
    const { body } = req

    try {
        const trivia = await Model.create({ ...body, user: user.id })
        trivia.populate({ path: 'questions.photo', model: PhotoModel })
        res.json(trivia)
    } catch (err) {
        res.status(422).json(err)
    }
}

/**
 * Show one Trivia by id
 * @param {Request} req
 * @param {Response} res
 */
const show = async (req, res) => {
    const user = getUserFromReq(req)
    const { id } = req.params
    const trivia = await (
        await Model.findOne({ _id: id, user: user.id })
    ).populate({ path: 'questions.photo', model: PhotoModel })

    if (trivia) {
        res.json(trivia)
    } else {
        res.status(404).json({ error: 'Trivia not found' })
    }
}

const update = async (req, res) => {
    const user = getUserFromReq(req)
    const { body } = req
    const { id } = req.params
    const trivia = await Model.findOneAndUpdate(
        { _id: id, user: user.id },
        body,
        { new: true }
    )
    trivia.populate({ path: 'questions.photo', model: PhotoModel })
    res.json(trivia)
}

const destroy = async (req, res) => {
    const user = getUserFromReq(req)
    const { id } = req.params
    await Model.findOneAndDelete({ _id: id, user: user.id })

    res.json({ message: 'Trivia deleted' })
}

export default { create, destroy, list, show, update }
