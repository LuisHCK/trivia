import mongoose from 'mongoose'

const PhotoSchema = mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        default: '',
    },
})

mongoose.models = {}

export default mongoose.model('Photo', PhotoSchema)
