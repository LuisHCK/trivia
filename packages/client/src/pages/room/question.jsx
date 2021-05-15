import React, { useEffect, useState } from 'react'
import {
    Button,
    Col,
    Container,
    Row,
    ProgressBar,
    Image,
} from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { useRoomContext } from '../../context/room.context'
import percentage from '../../utils/percentage'
import shuffleArray from '../../utils/shuffleArray'
import { loginToRoom, socket } from '../../socket'
import { socketEvents } from '../../constants'
import { roomContextActions } from '../../constants/context-actions'
import { sfxFourSeconds, sfxError, sfxSuccess } from '../../utils/sound-effects'
import getPhotoPath from '../../utils/getPhotoPath'

const Question = () => {
    const { id, questionId } = useParams()
    const { state, dispatch } = useRoomContext()
    const [currentQuestion, setCurrentQuestion] = useState()
    const [selectedReponse, setSelectedReponse] = useState()
    const [progress, setProgress] = useState(100)
    const [seconds, setSeconds] = useState(state.trivia.timeout)
    const history = useHistory()
    const [responsesOrder, setresponsesOrder] = useState(
        shuffleArray([1, 2, 3, 4])
    )

    const getResponseState = (responseNumber) => {
        if (selectedReponse === -1 && responseNumber !== 1) {
            return 'danger'
        }

        if (selectedReponse === responseNumber && responseNumber === 1) {
            return 'success'
        }

        if (selectedReponse === responseNumber && responseNumber !== 1) {
            return 'danger'
        }

        if (
            selectedReponse &&
            selectedReponse !== responseNumber &&
            responseNumber === 1
        ) {
            return 'success'
        }

        if (selectedReponse !== responseNumber) {
            return 'light'
        }

        return 'secondary'
    }

    const handleResponse = (responseNumber) => {
        if (!selectedReponse) {
            setSelectedReponse(responseNumber)
            calculateScore(responseNumber)
        }
    }

    const goToNextQuestion = () => {
        const questionIndex = Number(questionId)

        if (questionIndex < state.trivia.questions.length - 1) {
            // Update order
            setresponsesOrder(shuffleArray([1, 2, 3, 4]))

            history.push(`/room/${id}/questions/${questionIndex + 1}`)
            setSeconds(state.trivia.timeout)
        } else {
            history.push(`/room/${id}/results`)
        }
    }

    const calculateScore = (responseNumber) => {
        if (responseNumber === 1) {
            const score = (progress * 100) / 100
            socket.emit(socketEvents.UPDATE_SCORE, score)

            // Update participant score
            dispatch({
                type: roomContextActions.SET_PARTICIPANT,
                payload: { ...state.participant, score },
            })

            sfxSuccess.play()
        } else {
            sfxError.play()
        }
    }

    const renderQuestions = () => {
        return responsesOrder.map((responseNumber) => (
            <Col xs={12} md={6} key={`response-btn-${responseNumber}`}>
                <Button
                    as="a"
                    variant={getResponseState(responseNumber)}
                    onClick={() => handleResponse(responseNumber)}
                    className="mb-3 response-button"
                    size="lg"
                    block
                    disabled={!!selectedReponse}
                >
                    {currentQuestion[`response${responseNumber}`]}
                </Button>
            </Col>
        ))
    }

    const updateTimer = () => {
        if (seconds > 0) {
            setSeconds((prev) => prev - 1)
        }
    }
    useEffect(() => {
        let interval = setTimeout(updateTimer, 1000)

        return () => {
            clearTimeout(interval)
        }
    })

    useEffect(() => {
        setProgress(percentage(seconds, state.trivia.timeout))

        if (seconds <= 0) {
            setTimeout(() => {
                if (!selectedReponse) handleResponse(-1)
            }, 1000)

            setTimeout(() => {
                goToNextQuestion()
                setSelectedReponse()
            }, 3000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds])

    useEffect(() => {
        if (state.trivia) {
            setCurrentQuestion(state.trivia.questions[questionId])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionId, state])

    useEffect(() => {
        if (seconds === 4) {
            sfxFourSeconds.play()
        }
    }, [seconds])

    useEffect(() => {
        socket.on(socketEvents.ROOM_UPDATE, (data) => {
            dispatch({
                type: roomContextActions.SET_PARTICIPANTS,
                payload: data,
            })
        })

        socket.on(socketEvents.RECONNECT, () => {
            loginToRoom(id, state.participant)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    return (
        <Container>
            <div className="question-page">
                <div className="question-area text-center">
                    <h5>{currentQuestion?.title}</h5>
                </div>

                <div className="question-photo pb-4">
                    {currentQuestion?.photo?.path && (
                        <Image
                            src={getPhotoPath(currentQuestion.photo.path)}
                            alt={currentQuestion?.title}
                        />
                    )}
                </div>

                <div className="w-100 mb-4">
                    <ProgressBar animated variant="primary" now={progress} />
                </div>

                <div className="responses-container w-100">
                    <Row>{!!currentQuestion && renderQuestions()}</Row>
                </div>
            </div>
        </Container>
    )
}

export default Question
