import fs from 'fs'
import path from 'path'
import PhotoModel from '../../models/photo'
import { getUserFromReq } from '../../utils/userHandler'
import { v1 as UUID } from 'uuid'
import sharp from 'sharp'

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
        const filePath = `uploads/user/${fileName}.jpeg`

        await photo.mv(`./${filePath}`)

        // Compress photo
        await compressPhoto(filePath)

        const photoInstance = await PhotoModel.create({
            path: filePath,
            user: user.id,
        })

        res.status(201).json(photoInstance)
    } catch (error) {
        console.error(error)
        res.status(422).json(error)
    }
}

const compressPhoto = async (dir) => {
    const absolutePath = path.join(__dirname, '..', '..', '..', dir)
    const originalFile = fs.readFileSync(absolutePath)

    await sharp(originalFile)
        .jpeg({ quality: 75 })
        .resize({ height: 300 })
        .toFile(absolutePath)
}

export default { create }
