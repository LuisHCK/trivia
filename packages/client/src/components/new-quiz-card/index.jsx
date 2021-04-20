import React from 'react'
import { Card, Col } from 'react-bootstrap'
import {
    CLEAR_FORM,
    useQuestionForm,
} from '../../context/question-form-context'

const NewQuizCard = ({ onClickStart }) => {
    const { dispatch } = useQuestionForm()

    const handleStart = () => {
        dispatch({ type: CLEAR_FORM })
        onClickStart()
    }

    return (
        <Col className="mb-4" xs="12" md="6" lg="4">
            <Card
                className="text-center h-100 cursor-pointer"
                border="success"
                onClick={handleStart}
            >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title className="text-secondary">
                        Crear una Trivia
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default NewQuizCard
