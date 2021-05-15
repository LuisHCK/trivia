import PhotoModel from '../../models/photo'
import { getUserFromReq } from '../../utils/userHandler'
import { v1 as UUID } from 'uuid'

export const create = async (req, res) => {
    try {
        const user = getUserFromReq(req)

        if (!req.files) {
            return res.status(422).json({ message: 'File is required' })
        }

        const photo = req.files.photo
        // generate a random an unique filename
        const fileName = UUID().replaceAll('-', '')
        // extract format of the file
        const fileExt = photo.mimetype.split('/').pop()
        const filePath = `uploads/user/${fileName}.${fileExt}`

        photo.mv(`./${filePath}`)

        const photoInstance = await PhotoModel.create({
            path: filePath,
            userId: user.sub,
        })

        res.status(201).json(photoInstance)
    } catch (error) {
        console.error(error)
        res.status(422).json(error)
    }
}

export default { create }
