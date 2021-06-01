import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    passwordDigest: { type: String, required: true },
    email: { type: String, required: false },
    avatar: { type: String, required: false },
})

mongoose.models = {}

export default mongoose.model('User', UserSchema)
