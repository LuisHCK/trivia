const LOGIN = 'login'
const CONNECTION = 'connection'
const DISCONNECT = 'disconnect'
const RECONNECT = 'reconnect'
const SEND_MESSAGE = 'send-message'
const MESSAGE = 'message'
const JOIN = 'join'
const ADMIN_JOIN = 'admin-join'
const START_TRIVIA = 'start-trivia'
const END_TRIVIA = 'end-trivia'
const NEXT_QUESTION = 'next-question'
const PARTICIPANT_LEAVE = 'participant-leave'
const ROOM_UPDATE = 'room-update'
const UPDATE_SCORE = 'update-score'
const PARTICIPANT_FINISH = 'participant-finish'

export const socketEvents = {
    LOGIN,
    CONNECTION,
    RECONNECT,
    DISCONNECT,
    SEND_MESSAGE,
    MESSAGE,
    JOIN,
    ADMIN_JOIN,
    START_TRIVIA,
    END_TRIVIA,
    NEXT_QUESTION,
    PARTICIPANT_LEAVE,
    ROOM_UPDATE,
    UPDATE_SCORE,
    PARTICIPANT_FINISH,
}
