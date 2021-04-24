import roomModel from '../models/room'

/**
 * Find the room and append the participant
 * @param {string} roomKey Room key
 * @param {Object} participant Participant object
 */
export const addParticipant = async (room, participant) => {
    const roomKey = room.split('.').pop().toLowerCase()
    // Store participant in room
    const roomInstance = await roomModel.findOne({ key: roomKey }).exec()

    return roomInstance.toJSON()
}

export const removeParticipant = async (room, socketId) => {
    const roomKey = room.split('.').pop().toLowerCase()
    const roomInstance = await roomModel.findOne({ key: roomKey }).exec()

    return roomInstance.toJSON()
}

export const startTrivia = async (room) => {
    const roomKey = room.split('.').pop().toLowerCase()
    const roomInstance = await roomModel.findOne({ key: roomKey }).exec()
    await roomInstance
        .updateOne({ $set: { started: true } }, { new: true })
        .exec()

    return await roomModel.findById(roomInstance._id)
}

export const nextQuestion = async (room) => {
    const roomKey = room.split('.').pop().toLowerCase()
    const roomInstance = await roomModel
        .findOneAndUpdate(
            { key: roomKey },
            { $set: { currentQuestion: roomInstance.currentQuestion + 1 } },
            { new: true }
        )
        .exec()
    return roomInstance.toJSON()
}

export const getRoomInstance = async (room) => {
    const roomKey = room.split('.').pop().toLowerCase()
    const roomInstance = await roomModel.findOne({ key: roomKey }).exec()
    return roomInstance.toJSON()
}
