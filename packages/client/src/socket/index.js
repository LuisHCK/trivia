// eslint-disable-next-line no-unused-vars
import { io, Socket } from 'socket.io-client'
import { socketEvents } from '../constants'

/**
 * @type {Socket}
 */
export const socket = io(process.env.REACT_APP_SERVER_URL, {
    transports: ['websocket'],
})
/**
 * Login to room socket
 * @param {string} roomKey Room Key
 * @param {object} participant Participant object
 */
export const loginToRoom = (roomKey, participant) => {
    const room = `room.${roomKey}`.toLowerCase()
    if (socket && roomKey)
        socket.emit(socketEvents.LOGIN, { room, participant })
}

export const subscribeToRoom = (callback) => {
    socket.on(socketEvents.ROOM_UPDATE, (roomInstance) => {
        return callback(null, roomInstance)
    })
}

export const adminLoginToRoom = (roomKey) => {
    const room = `room.${roomKey}`.toLowerCase()
    if (socket && roomKey) socket.emit(socketEvents.ADMIN_JOIN, { room })
}

export const leaveRoom = (roomKey, participant) => {
    const room = `room.${roomKey}`.toLowerCase()
    if (socket && roomKey)
        socket.emit(socketEvents.PARTICIPANT_LEAVE, { room, participant })
}

export const startTrivia = (roomKey) => {
    const room = `room.${roomKey}`.toLowerCase()
    if (socket && roomKey) socket.emit(socketEvents.START_TRIVIA, { room })
}
