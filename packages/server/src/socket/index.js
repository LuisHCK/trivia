import { Socket } from 'socket.io'
import { socketEvents } from '../constants/socket-events'
import { removeParticipant } from './roomActions'

// socket.io server
const startSocketServer = (io) => {
    /**
     * Return array of sockets in a room
     * @param {string} room
     * @returns {Socket[]}
     */
    const getParticipants = async (room) => {
        const sockets = await io.in(room).fetchSockets()

        return sockets
            .filter((s) => !s.isAdmin)
            .map((sk) => {
                return {
                    ...sk.participant,
                    socketId: sk.id,
                }
            })
    }

    return io.on(socketEvents.CONNECTION, (socket) => {
        /**
         * Handle user disconnection
         */
        socket.on(socketEvents.DISCONNECT, async () => {
            if (!socket.isAdmin && socket.room) {
                const roomInstance = removeParticipant(socket.room, socket.id)
                socket
                    .in(socket.room)
                    .emit(
                        socketEvents.ROOM_UPDATE,
                        await getParticipants(socket.room)
                    )
            }
        })

        socket.on(socketEvents.LOGIN, async ({ participant, room }) => {
            socket.room = room
            socket.participant = { ...participant, score: 0 }
            socket.join(room)

            // Emit update
            socket
                .in(room)
                .emit(socketEvents.LOGIN, await getParticipants(room))
        })

        socket.on(socketEvents.ADMIN_JOIN, async ({ room }) => {
            socket.join(room)
            socket.room = room
            socket.isAdmin = true
            socket.in(room).emit(socketEvents.ADMIN_JOIN)
            socket
                .in(room)
                .emit(socketEvents.ROOM_UPDATE, await getParticipants(room))
        })

        socket.on(socketEvents.START_TRIVIA, async ({ room }) => {
            io.in(room).emit(socketEvents.START_TRIVIA)
        })

        socket.on(socketEvents.END_TRIVIA, async ({ room }) => {
            const roomInstance = await getRoomInstance(room)
            io.in(payload.room).emit(socketEvents.ROOM_UPDATE, roomInstance)
        })

        socket.on(socketEvents.NEXT_QUESTION, async ({ room }) => {
            const roomInstance = await getRoomInstance(room)
            io.in(room).emit(socketEvents.ROOM_UPDATE, roomInstance)
        })

        socket.on(socketEvents.SEND_MESSAGE, (payload) => {
            io.in(payload.room).emit(socketEvents.MESSAGE, payload)
        })

        socket.on(socketEvents.UPDATE_SCORE, async (score) => {
            if (!socket.isAdmin && socket.participant) {
                socket.participant.score += score
                socket
                    .in(socket.room)
                    .emit(
                        socketEvents.ROOM_UPDATE,
                        await getParticipants(socket.room)
                    )
            }
        })
    })
}

export default startSocketServer
