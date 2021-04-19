import mongoose from 'mongoose'

const RoomSchema = mongoose.Schema({
    quizId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Quiz',
        default: '',
    },
    key: {
        type: String,
        unique: true,
    },
    participants: [
        {
            id: String,
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
