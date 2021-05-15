import mongoose from 'mongoose'

const PhotoSchema = mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
})

mongoose.models = {}

export default mongoose.model('Photo', PhotoSchema)
