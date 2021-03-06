import mongoose from 'mongoose'
import genId from '../../utils/genId'

const TriviaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    timeout: {
        type: Number,
        required: true,
        default: 15,
    },
    questions: [
        {
            title: {
                type: String,
                required: true,
            },
            response1: {
                type: String,
                required: true,
            },
            response2: {
                type: String,
                required: true,
            },
            response3: {
                type: String,
                required: true,
            },
            response4: {
                type: String,
                required: true,
            },
            photo: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Photo',
            },
        },
    ],
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
    key: {
        type: String,
        default: genId(6),
        unique: true,
    },
    scoreBoard: [{ type: Object }],
})

mongoose.models = {}

export default mongoose.model('Trivia', TriviaSchema)
