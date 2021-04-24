import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, ProgressBar } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import { roomContextActions } from '../../constants/context-actions'
import { useRoomContext } from '../../context/room.context'
import percentage from '../../utils/percentage'
import shuffleArray from '../../utils/shuffleArray'
import { socket } from '../../socket'
import { socketEvents } from '../../constants'

const responsesOrder = shuffleArray([1, 2, 3, 4])

const Question = () => {
    const { id, questionId } = useParams()
    const { state, dispatch } = useRoomContext()
    const [currentQuestion, setCurrentQuestion] = useState()
    const [selectedReponse, setSelectedReponse] = useState()
    const [progress, setProgress] = useState(100)
    const [seconds, setSeconds] = useState(state.trivia.timeout)
    const history = useHistory()

    const getResponseState = (responseNumber) => {
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
            history.push(`/room/${id}/questions/${questionIndex + 1}`)
            setSeconds(state.trivia.timeout)
        }
    }

    const calculateScore = (responseNumber) => {
        if (responseNumber === 1) {
            const score = (progress * 100) / 100
            socket.emit(socketEvents.UPDATE_SCORE, score)
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
                goToNextQuestion()
                setSelectedReponse()
            }, 2000)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seconds])

    useEffect(() => {
        if (state.trivia) {
            setCurrentQuestion(state.trivia.questions[questionId])
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionId, state])

    return (
        <Container>
            <div className="question-page">
                <div className="question-area">
                    <h1>{currentQuestion?.title}</h1>
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
