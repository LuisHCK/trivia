import React, { createContext, useContext, useReducer } from 'react'
import Cookies from 'js-cookie'
import { roomContextActions } from '../constants/context-actions'

const storedParticipant = JSON.parse(Cookies.get('participant') || null)

/**
 * @typedef {object} State
 * @property {object} trivia
 * @property {object} room
 * @property {object} participant
 * @property {boolean} invalidRoom
 * @property {boolean} started
 * @property {number} score
 */

/**
 * @type {State}
 */
const initialState = {
    trivia: null,
    room: null,
    participant: storedParticipant,
    invalidRoom: false,
    started: false,
    score: 0
}

const RoomContext = createContext(initialState)

/**
 * Question Form reducer
 * @param {string} state
 * @param {{type: string, payload: any}} action
 */
const reducer = (state, action) => {
    switch (action.type) {
        case roomContextActions.SET_ROOM:
            return {
                ...state,
                room: action.payload,
            }
        case roomContextActions.SET_PARTICIPANT:
            Cookies.set('participant', action.payload)
            return {
                ...state,
                participant: action.payload,
            }
        case roomContextActions.SET_TRIVIA:
            return {
                ...state,
                trivia: action.payload,
            }
        case roomContextActions.SET_INVALID_ROOM:
            return {
                ...state,
                invalidRoom: action.payload,
            }
        case roomContextActions.SET_TRIVIA_STARTED:
            return {
                ...state,
                started: true,
            }
        case roomContextActions.UPDATE_SCORE:
            return {
                ...state,
                score: Number(state.score) + Number(action.payload),
            }
        default:
            return { ...state }
    }
}

const RoomContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { ...initialState })

    return (
        <RoomContext.Provider children={children} value={{ state, dispatch }} />
    )
}

/**
 * Create context hook
 * @returns {{state: State, dispatch: Function}}
 */
const useRoomContext = () => {
    const context = useContext(RoomContext)

    if (context === undefined) {
        throw new Error(
            'useRoomContext must be used within a QuestionFormProvider'
        )
    }

    return context || initialState
}

export { RoomContextProvider, useRoomContext }
