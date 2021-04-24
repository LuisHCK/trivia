import mongoose from 'mongoose'

const RoomSchema = mongoose.Schema({
    triviaId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Trivia',
        default: '',
    },
    key: {
        type: String,
        unique: true,
    },
    started: {
        type: Boolean,
        default: false,
    },
    currentQuestion: {
        type: Number,
        default: 0,
    },
    participants: [
        {
            id: String,
            socketId: String,
            name: String,
            score: {
                type: Number,
                default: 0,
            },
            hits: {
                type: Number,
                default: 0,
            },
            miss: {
                type: Number,
                default: 0,
            },
        },
    ],
    userId: {
        type: String,
        required: true,
    },
})

mongoose.models = {}

export default mongoose.model('Room', RoomSchema)
