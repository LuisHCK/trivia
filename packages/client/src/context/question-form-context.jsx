import React, { createContext, useContext, useReducer } from 'react'
import genId from '../utils/gen-id'

const emptyQuestion = {
    title: '',
    response1: '',
    response2: '',
    response3: '',
    response4: '',
    _temp: true,
}

const initialState = {
    id: '',
    title: '',
    description: '',
    category: '',
    timeout: 10,
    activeItem: 0,
    questions: [{ ...emptyQuestion, id: genId() }],
}

const QuestionFormContext = createContext(initialState)

/**
 * Question Form reducer
 * @param {string} state
 * @param {{type: string, payload: any}} action
 */
const reducer = (state, action) => {
    switch (action.type) {
        case SET_FIELD:
            return {
                ...state,
                [action.payload.name]: String(action.payload.value).trim(),
            }

        case ADD_QUESTION:
            return {
                ...state,
                questions: [
                    ...state.questions,
                    { ...emptyQuestion, id: genId() },
                ],
                activeItem: state.questions?.length,
            }

        case REMOVE_QUESTION:
            return {
                ...state,
                questions: [
                    ...state.questions.filter(
                        // return all questions except the questions to delete
                        (q) => q.id !== action.payload.id
                    ),
                ],
            }

        case UPDATE_QUESTION:
            // Generate new array
            const questions = [...state.questions]
            const questionIdx = questions.findIndex(
                (q) => q.id === action.payload.id
            )
            // update the new array
            questions[questionIdx] = action.payload

            return {
                ...state,
                questions,
            }

        case SET_ACTIVE_ITEM:
            return { ...state, activeItem: action.payload }

        case SET_FORM:
            return { ...action.payload }

        case CLEAR_FORM:
            return { ...initialState }

        default:
            return { ...state }
    }
}

const QuestionFormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { ...initialState })

    return (
        <QuestionFormContext.Provider
            children={children}
            value={{ state, dispatch }}
        />
    )
}

const useQuestionForm = () => {
    const context = useContext(QuestionFormContext)

    if (context === undefined) {
        throw new Error(
            'useQuestionForm must be used within a QuestionFormProvider'
        )
    }

    return context
}

export { QuestionFormProvider, useQuestionForm }

/** ACTIONS */
export const SET_FIELD = `SET_FIELD`
export const ADD_QUESTION = `ADD_QUESTION`
export const REMOVE_QUESTION = `REMOVE_QUESTION`
export const UPDATE_QUESTION = `UPDATE_QUESTION`
export const CLEAR_FORM = `CLEAR_FORM`
export const SET_FORM = `SET_FORM`
export const SET_ACTIVE_ITEM = `SET_ACTIVE_ITEM`
